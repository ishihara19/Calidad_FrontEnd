import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import api from "../../api/axios";

const Register = () => {
  const [formData, setFormData] = useState({
    document: "",
    first_name: "",
    last_name: "",
    email: "",
    document_type: "",
    person_type: "",
    phone: "",
    address: "",
    empresa: "", // 👈 nuevo campo
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [documentTypes, setDocumentTypes] = useState([]);
  const [personTypes, setPersonTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  // Cargar los tipos de documento y tipos de persona al montar el componente
  useEffect(() => {
    const fetchOptions = async () => {
      setIsLoading(true);
      try {
        // Realizar ambas peticiones en paralelo
        const [documentTypesRes, personTypesRes] = await Promise.all([
          api.get("users/list-document-type"), // Ajusta la URL según tu API
          api.get("users/list-person-type"), // Ajusta la URL según tu API
        ]);
        console.log("Document Types:", documentTypesRes.data.results);
        setDocumentTypes(documentTypesRes.data.results);
        setPersonTypes(personTypesRes.data.results);
      } catch (error) {
        console.error("Error al cargar opciones:", error);
        setFormError(
          "No se pudieron cargar algunas opciones. Intente nuevamente."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (
      !formData.document ||
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.document_type ||
      !formData.person_type ||
      !formData.phone ||
      !formData.address ||
      !formData.empresa ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setFormError("Todos los campos son obligatorios");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      setFormError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const userData = {
      document: formData.document,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      document_type: parseInt(formData.document_type),
      person_type: parseInt(formData.person_type),
      phone: formData.phone,
      address: formData.address,
      codigo_empresa: formData.empresa, // 👈 se incluye
      password: formData.password,
    };

    try {
      await register(userData);
      navigate("/dashboard");
    } catch (error) {
      const backendErrors = error.response?.data?.errors;
      if (backendErrors) {
        setFieldErrors(backendErrors);
      } else {
        setFormError(error.message || "Error al registrarse.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
          Crear una cuenta
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Inicia sesión
          </Link>
        </p>

        {formError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre y apellido */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                name="first_name"
                type="text"
                placeholder=""
                value={formData.first_name}
                onChange={handleChange}
                className="input-style peer"
                required
              />
              <label className="floating-label">Nombre</label>
            </div>
            <div className="relative">
              <input
                name="last_name"
                type="text"
                placeholder=""
                value={formData.last_name}
                onChange={handleChange}
                className="input-style peer"
                required
              />
              <label className="floating-label">Apellido</label>
            </div>
          </div>

          {/* Tipo persona */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <select
              name="person_type"
              value={formData.person_type}
              onChange={handleChange}
              className="input-style"
              required
              disabled={isLoading || personTypes.length === 0}
            >
              <option value="">Tipo de persona</option>
              {personTypes.map((type) => (
                <option key={type.personTypeId} value={type.personTypeId}>
                  {type.typeName}
                </option>
              ))}
            </select>
          </div>

          {/* Documento tipo y número */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="document_type"
              value={formData.document_type}
              onChange={handleChange}
              className="input-style"
              required
              disabled={isLoading || documentTypes.length === 0}
            >
              <option value="">Tipo de documento</option>
              {documentTypes.map((type) => (
                <option key={type.documentTypeId} value={type.documentTypeId}>
                  {type.typeName}
                </option>
              ))}
            </select>
            <div className="relative">
              <input
                name="document"
                type="text"
                placeholder=""
                value={formData.document}
                onChange={handleChange}
                className="input-style peer"
                required
              />
              <label className="floating-label">Número de documento</label>
            </div>
          </div>

          {/* Codigo empresa */}
          <div className="relative">
            <input
              name="empresa"
              type="text"
              placeholder=""
              value={formData.empresa}
              onChange={handleChange}
              className="input-style peer"
              required
            />
            <label className="floating-label">Codigo de empresa</label>
          </div>
          {/* Correo */}
          <div className="relative">
            <input
              name="email"
              type="email"
              placeholder=""
              value={formData.email}
              onChange={handleChange}
              className="input-style peer"
              required
            />
            <label className="floating-label">Codigo de empresa</label>
            {fieldErrors.email && (
              <p className="text-red-600 text-sm">{fieldErrors.email[0]}</p>
            )}
          </div>
          {/* Teléfono y dirección */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                name="phone"
                type="text"
                placeholder=""
                value={formData.phone}
                onChange={handleChange}
                className="input-style peer"
                required
              />
              <label className="floating-label">Teléfono</label>
            </div>
            <div className="relative">
              <input
                name="address"
                type="text"
                placeholder=""
                value={formData.address}
                onChange={handleChange}
                className="input-style peer"
                required
              />
              <label className="floating-label">Dirección</label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password */}
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder=" "
                value={formData.password}
                onChange={handleChange}
                className="input-style peer"
                required
              />
              <label className="floating-label">Contraseña</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-4 text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder=" "
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-style peer"
                required
              />
              <label className="floating-label">Confirmar contraseña</label>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-4 text-gray-500"
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow transition duration-200"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
