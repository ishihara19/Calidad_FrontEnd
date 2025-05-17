import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import api from '../../api/axios';

const Register = () => {
  const [formData, setFormData] = useState({
    document: '',
    first_name: '',
    last_name: '',
    email: '',
    document_type: '',
    person_type: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  
  const [formError, setFormError] = useState('');
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
          api.get('users/list-document-type'), // Ajusta la URL según tu API
          api.get('users/list-person-type')    // Ajusta la URL según tu API
        ]);
        console.log('Document Types:', documentTypesRes.data.results);
        setDocumentTypes(documentTypesRes.data.results);
        setPersonTypes(personTypesRes.data.results);
      } catch (error) {
        console.error('Error al cargar opciones:', error);
        setFormError('No se pudieron cargar algunas opciones. Intente nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    try {
      // Validaciones básicas
      if (
        !formData.document || 
        !formData.first_name || 
        !formData.last_name || 
        !formData.email || 
        !formData.document_type || 
        !formData.person_type || 
        !formData.phone || 
        !formData.address || 
        !formData.password || 
        !formData.confirmPassword
      ) {
        setFormError('Todos los campos son obligatorios');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setFormError('Las contraseñas no coinciden');
        return;
      }
      
      if (formData.password.length < 6) {
        setFormError('La contraseña debe tener al menos 6 caracteres');
        return;
      }
      
      // Crear el objeto de datos a enviar a la API
      const userData = {
        document: formData.document,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        document_type: parseInt(formData.document_type),
        person_type: parseInt(formData.person_type),
        phone: formData.phone,
        address: formData.address,
        password: formData.password
      };
      
      // Intentar registrar al usuario
      await register(userData);
      
      // Redirigir al usuario después de registrarse
      navigate('/dashboard');
    } catch (error) {
      const backendErrors = error.response?.data?.errors;

  if (backendErrors) {
    setFieldErrors(backendErrors); // Asigna directamente los errores por campo
    setFormError(''); // Oculta mensaje global si hay errores específicos
  } else {
    setFormError(error.message || 'Error al registrarse.');
  }

  console.error('Error al registrarse:', error);
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear una cuenta
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Inicia sesión
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {formError && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <p className="text-red-700">{formError}</p>
            </div>
          )}
          
          <div className="rounded-md shadow-sm space-y-4">
            {/* Datos personales */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={formData.first_name}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Nombre"
                />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Apellido</label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={formData.last_name}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Apellido"
                />
              </div>
            </div>
            
            {/* Documento y tipo */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="document_type" className="block text-sm font-medium text-gray-700">Tipo de documento</label>
                <select
                  id="document_type"
                  name="document_type"
                  required
                  value={formData.document_type}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  disabled={isLoading || documentTypes.length === 0}
                >
                  <option value="">Seleccionar</option>
                  {documentTypes.map((type) => (
                    <option key={type.documentTypeId} value={type.documentTypeId}>
                      {type.typeName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="document" className="block text-sm font-medium text-gray-700">Número de documento</label>
                <input
                  id="document"
                  name="document"
                  type="text"
                  required
                  value={formData.document}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Documento"
                />
                {fieldErrors.document && (
                  <p className="text-red-600 text-sm mt-1">{fieldErrors.document[0]}</p>
                )}
              </div>
            </div>
            
            {/* Tipo persona */}
            <div>
              <label htmlFor="person_type" className="block text-sm font-medium text-gray-700">Tipo de persona</label>
              <select
                id="person_type"
                name="person_type"
                required
                value={formData.person_type}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                disabled={isLoading || personTypes.length === 0}
              >
                <option value="">Seleccionar</option>
                {personTypes.map((type) => (
                  <option key={type.personTypeId} value={type.personTypeId}>
                    {type.typeName}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="correo@ejemplo.com"
              />
              {fieldErrors.email && (
                  <p className="text-red-600 text-sm mt-1">{fieldErrors.email[0]}</p>
                )}
            </div>
            
            {/* Teléfono y dirección */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  autoComplete="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Teléfono"
                />
                {fieldErrors.phone && (
                  <p className="text-red-600 text-sm mt-1">{fieldErrors.phone[0]}</p>
                )}
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="street-address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Dirección"
                />
              </div>
            </div>
            
            {/* Contraseñas */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Contraseña"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Confirmar contraseña"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {loading ? 'Cargando...' : 'Registrarse'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;