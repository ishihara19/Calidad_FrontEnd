import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import api from "../../api/axios"
import PhoneInputCustom from "../../components/PhoneInputCustom";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  FileText,
  Lock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

const Register = () => {
  const navigate = useNavigate()
  const { register, loading } = useAuth()

  const [formData, setFormData] = useState({
    document: "",
    first_name: "",
    last_name: "",
    email: "",
    document_type: "",
    person_type: "",
    phone: "",
    address: "",
    empresa: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formError, setFormError] = useState("")
  const [filteredDocumentTypes, setFilteredDocumentTypes] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([])
  const [personTypes, setPersonTypes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Obtener tipos de documentos y tipos de personas desde la API
  useEffect(() => {
    const fetchOptions = async () => {
      setIsLoading(true)
      try {
        // Realizar ambas peticiones en paralelo
        const [documentTypesRes, personTypesRes] = await Promise.all([
          api.get("users/list-document-type"),
          api.get("users/list-person-type"),
        ]);
        console.log("Document Types:", documentTypesRes.data.results);
        setDocumentTypes(documentTypesRes.data.results)
        setPersonTypes(personTypesRes.data.results)
      } catch (error) {
        console.error("Error al cargar opciones:", error)
        setFormError("No se pudieron cargar algunas opciones. Intente nuevamente.")

        // Fallback to default values if API fails
        setDocumentTypes([
          { documentTypeId: 1, typeName: "Cédula de Ciudadanía" },
          { documentTypeId: 2, typeName: "NIT" },
          { documentTypeId: 3, typeName: "Cédula de Extranjería" },
        ])
        setPersonTypes([
          { personTypeId: 1, typeName: "Persona Natural" },
          { personTypeId: 2, typeName: "Persona Jurídica" },
        ])
      } finally {
        setIsLoading(false)
      }
    }
    fetchOptions()
  }, [])

  // Filtrar los tipos de documento según el tipo de persona seleccionado
  useEffect(() => {
    if (formData.person_type === "1") {
      // Si es "Natural", excluir el tipo de documento 2 (NIT)
      setFilteredDocumentTypes(
        documentTypes.filter((type) => type.documentTypeId !== 2)
      );
    } else if (formData.person_type === "2") {
      // Si es "Jurídica", solo permitir el tipo de documento 2 (NIT)
      setFilteredDocumentTypes(
        documentTypes.filter((type) => type.documentTypeId === 2)
      );
    } else {
      // Si no se ha seleccionado un tipo de persona, mostrar todos los tipos de documento
      setFilteredDocumentTypes(documentTypes);
    }
  }, [formData.person_type, documentTypes]);

  // Validation functions
  const validateField = (name, value) => {
    const errors = {}

    switch (name) {
      case "first_name":
      case "last_name":
        if (!value.trim()) {
          errors[name] = `${name === "first_name" ? "Nombre" : "Apellido"} es obligatorio`
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
          errors[name] = `${name === "first_name" ? "Nombre" : "Apellido"} solo puede contener letras`
        } else if (value.trim().length < 2) {
          errors[name] = `${name === "first_name" ? "Nombre" : "Apellido"} debe tener al menos 2 caracteres`
        }
        break

      case "email":
        if (!value.trim()) {
          errors[name] = "Correo electrónico es obligatorio"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors[name] = "Correo electrónico no válido"
        }
        break

      case "phone":
        if (!value.trim()) {
          errors[name] = "Teléfono es obligatorio"
        } else if (!/^\d{7,15}$/.test(value)) {
          errors[name] = "Número de teléfono no válido"
        }
        break;


      /*case "document":
        if (!value.trim()) {
          errors[name] = "Número de documento es obligatorio"
        } else if (!/^\d+$/.test(value)) {
          errors[name] = "Número de documento solo puede contener números"
        } else if (value.length < 6 || value.length > 15) {
          errors[name] = "Número de documento debe tener entre 9 y 10 dígitos"
        }
        break*/

      case "document":
      if (!value.trim()) {
        errors[name] = "Número de documento es obligatorio"
      } else if (!/^\d+$/.test(value)) {
        errors[name] = "Número de documento solo puede contener números"
      } else {
        const docType = formData.document_type
        if (docType === "2" && value.length !== 9) {
          errors[name] = "NIT debe tener exactamente 9 dígitos"
        } else if ((docType === "1" || docType === "3") && value.length !== 10) {
          errors[name] = "Cédula debe tener exactamente 10 dígitos"
        }
      }
      break

      case "address":
        if (!value.trim()) {
          errors[name] = "Dirección es obligatoria"
        } else if (value.trim().length < 10) {
          errors[name] = "Dirección debe tener al menos 10 caracteres"
        }
        break

      case "password":
        if (!value) {
          errors[name] = "Contraseña es obligatoria"
        } else if (value.length < 8) {
          errors[name] = "Contraseña debe tener al menos 8 caracteres"
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          errors[name] = "Contraseña debe contener al menos una mayúscula, una minúscula y un número"
        }
        break

      case "confirmPassword":
        if (!value) {
          errors[name] = "Confirmar contraseña es obligatorio"
        } else if (value !== formData.password) {
          errors[name] = "Las contraseñas no coinciden"
        }
        break

      case "document_type":
        if (!value) {
          errors[name] = "Tipo de documento es obligatorio"
        }
        break

      case "person_type":
        if (!value) {
          errors[name] = "Tipo de persona es obligatorio"
        }
        break

      default:
        break
    }

    return errors
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    let filteredValue = value;

    // Aplicar filtro solo a nombre y apellido (solo letras)
    if (name === "first_name" || name === "last_name") {
      filteredValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    }

    // Solo alfanumérico (sin espacios ni caracteres especiales) para código de empresa
    if (name === "empresa") {
      filteredValue = value.replace(/[^a-zA-Z0-9]/g, "");
    }

    // Solo números para número de documento y teléfono
    if (name === "document" || name === "phone") {
    filteredValue = value.replace(/[^0-9]/g, "");
    }

    // Actualiza el estado con el valor filtrado
    setFormData((prev) => ({ ...prev, [name]: filteredValue }));

    // Elimina errores previos
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Validación en tiempo real
    const errors = validateField(name, filteredValue);
    if (Object.keys(errors).length > 0) {
      setFieldErrors((prev) => ({ ...prev, ...errors }));
    }
  };

  const validateForm = () => {
    const errors = {}
    const requiredFields = [
      "document",
      "first_name",
      "last_name",
      "email",
      "document_type",
      "person_type",
      "phone",
      "address",
      "password",
      "confirmPassword",
    ]

    requiredFields.forEach((field) => {
      const fieldErrors = validateField(field, formData[field])
      Object.assign(errors, fieldErrors)
    })

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError("")

    // Validate entire form
    const errors = validateForm()

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setFormError("Por favor, corrige los errores en el formulario")
      return
    }

    const userData = {
      document: formData.document,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      document_type: Number.parseInt(formData.document_type),
      person_type: Number.parseInt(formData.person_type),
      phone: formData.phone,
      address: formData.address,
      codigo_empresa: formData.empresa,
      password: formData.password,
    }

    try {
      await register(userData)
      setShowSuccessModal(true)
      setTimeout(() => {
        setShowSuccessModal(false)
        navigate("/login")
      }, 3000)
    } catch (error) {
      const backendErrors = error.response?.data?.errors
      if (backendErrors) {
        setFieldErrors(backendErrors)
        setFormError("Por favor, corrige los errores indicados.")
      } else {
        setFormError(error.message || "Error al registrarse. Por favor, intente nuevamente.")
      }
    }
  }

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: "", color: "" }

    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++

    const levels = [
      { text: "Muy débil", color: "bg-red-500" },
      { text: "Débil", color: "bg-orange-500" },
      { text: "Regular", color: "bg-yellow-500" },
      { text: "Fuerte", color: "bg-blue-500" },
      { text: "Muy fuerte", color: "bg-green-500" },
    ]

    return { strength, ...(levels[Math.min(strength - 1, 4)] || levels[0]) }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 p-8 text-center transform transition-all duration-300 scale-100">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 text-green-600 rounded-full p-4">
                <CheckCircle className="h-12 w-12" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">¡Registro exitoso!</h3>
            <p className="text-gray-600 mb-6">
              Tu cuenta ha sido creada correctamente. Serás redirigido al inicio de sesión.
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Crear cuenta</h2>
            <p className="text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Inicia sesión
              </Link>
            </p>
          </div>

          {/* Form Error */}
          {formError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center">
              <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Información Personal
              </h3>

              {/* Name and Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Nombre *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      name="first_name"
                      type="text"
                      value={formData.first_name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        fieldErrors.first_name ? "border-red-300 bg-red-50" : "border-gray-300"
                      }`}
                      placeholder="Ingresa tu nombre"
                      maxLength={20}
                    />
                  </div>
                  {fieldErrors.first_name && (
                    <p className="text-red-600 text-sm flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {fieldErrors.first_name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Apellido *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      name="last_name"
                      type="text"
                      value={formData.last_name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        fieldErrors.last_name ? "border-red-300 bg-red-50" : "border-gray-300"
                      }`}
                      placeholder="Ingresa tu apellido"
                      maxLength={20}
                    />
                  </div>
                  {fieldErrors.last_name && (
                    <p className="text-red-600 text-sm flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {fieldErrors.last_name}
                    </p>
                  )}
                </div>
              </div>

              {/* Person Type */}
              <div className="space-y-2 relative">
                <label className="block text-sm font-medium text-gray-700">Tipo de Persona *</label>
                <select
                  name="person_type"
                  value={formData.person_type}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-6 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  fieldErrors.person_type ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                  disabled={isLoading || personTypes.length === 0}
                  
                >
                  <option value="">Selecciona el tipo de persona</option>
                  {personTypes.map((type) => (
                    <option key={type.personTypeId} value={type.personTypeId}>
                      {type.typeName}
                    </option>
                  ))}
                </select>
                {fieldErrors.person_type && (
                  <p className="text-red-600 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {fieldErrors.person_type}
                  </p>
                )}
              </div>

              {/* Document Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 relative">
                  <label className="block text-sm font-medium text-gray-700">Tipo de Documento *</label>
                  <select
                    name="document_type"
                    value={formData.document_type}
                    onChange={handleChange}
                    disabled={!formData.person_type}
                    className={`w-full px-4 py-3 border rounded-xl transition-all
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${
                        fieldErrors.document_type 
                          ? "border-red-300 bg-red-50"
                          : !formData.person_type
                            ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "border-gray-300 bg-white text-black cursor-pointer"
                      }
                    `}
                  >
                    <option value="">Selecciona el tipo</option>
                    {filteredDocumentTypes.map((type, index) => (
                      <option key={index} value={type.documentTypeId}>
                        {type.typeName}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.document_type && (
                    <p className="text-red-600 text-sm flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {fieldErrors.document_type}
                    </p>
                  )}
                </div>

                {/*<div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Número de Documento *</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      name="document"
                      type="text"
                      value={formData.document}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        fieldErrors.document ? "border-red-300 bg-red-50" : "border-gray-300"
                      }`}
                      placeholder="Número de documento"
                      maxLength={10}
                    />
                  </div>
                  {fieldErrors.document && (
                    <p className="text-red-600 text-sm flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {fieldErrors.document}
                    </p>
                  )}
                </div>*/}

                <div className="space-y-2 relative">
                  <label className="block text-sm font-medium text-gray-700">Número de Documento *</label>
                  <input
                    type="text"
                    name="document"
                    value={formData.document}
                    onChange={handleChange}
                    disabled={!formData.person_type}
                    maxLength={10}
                    placeholder="Número de documento"
                    className={`w-full px-4 py-3 border rounded-xl transition-all
                      ${
                        fieldErrors.document
                          ? "border-red-300 bg-red-50"
                          : !formData.person_type
                            ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "border-gray-300 bg-white text-black cursor-text"
                      }
                      focus:outline-none
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    `}
                  />
                  {fieldErrors.document && (
                    <p className="text-red-600 text-sm flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {fieldErrors.document}
                    </p>
                  )}
                </div>

              </div>

              {/* Company Code */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Código de Empresa <span className="text-gray-500">(opcional)</span>
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    name="empresa"
                    type="text"
                    value={formData.empresa}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Código de empresa"
                    maxLength={8}
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Información de Contacto
              </h3>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Correo Electrónico *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      fieldErrors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder="tu@email.com"
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-red-600 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {typeof fieldErrors.email === "string"
                      ? fieldErrors.email
                      : Array.isArray(fieldErrors.email)
                        ? fieldErrors.email[0]
                        : "Correo electrónico no válido"}
                  </p>
                )}
              </div>

              {/* Phone and Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 relative">
                  <label className="block text-sm font-medium text-gray-700">Teléfono *</label>
                  <PhoneInputCustom
                    value={formData.phone}
                    onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
                    error={fieldErrors.phone}
                    placeholder="Dirección completa"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Dirección *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        fieldErrors.address ? "border-red-300 bg-red-50" : "border-gray-300"
                      }`}
                      placeholder="Dirección completa"
                    />
                  </div>
                  {fieldErrors.address && (
                    <p className="text-red-600 text-sm flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {fieldErrors.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Security Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Información de Seguridad
              </h3>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Contraseña *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      fieldErrors.password ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder="Contraseña segura"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{passwordStrength.text}</span>
                    </div>
                  </div>
                )}

                {fieldErrors.password && (
                  <p className="text-red-600 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {typeof fieldErrors.password === "string"
                      ? fieldErrors.password
                      : Array.isArray(fieldErrors.password)
                        ? fieldErrors.password[0]
                        : "Contraseña no válida"}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      fieldErrors.confirmPassword ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder="Confirma tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="text-red-600 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {fieldErrors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Registrando...
                </>
              ) : (
                "Crear Cuenta"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Al registrarte, aceptas nuestros{" "}
            <button className="text-blue-600 hover:text-blue-700">términos de servicio</button> y{" "}
            <button className="text-blue-600 hover:text-blue-700">política de privacidad</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
