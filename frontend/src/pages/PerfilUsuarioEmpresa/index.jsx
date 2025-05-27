// src/pages/PerfilUsuarioEmpresa/index.jsx
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { 
  User, 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  FileText,
  Edit,
  Save,
  X
} from 'lucide-react';

const PerfilUsuarioEmpresa = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    first_name: currentUser?.user?.nombre?.split(' ')[0] || '',
    last_name: currentUser?.user?.nombre?.split(' ').slice(1).join(' ') || '',
    email: currentUser?.user?.email || '',
    phone: '', // Este dato habría que obtenerlo de la API
    address: '', // Este dato habría que obtenerlo de la API
  });

  // Datos de la empresa (simulados por ahora)
  const empresaData = {
    nombre: 'Empresa Ejemplo S.A.S',
    nit: '900123456-7',
    direccion: 'Calle 123 #45-67, Bogotá, Colombia',
    telefono: '+57 1 234 5678',
    email: 'contacto@empresaejemplo.com',
    codigo_empresa: 'EMP001',
    fecha_registro: '2024-01-15',
    sistemas_registrados: 3,
    evaluaciones_realizadas: 5
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Restaurar datos originales
    setEditedData({
      first_name: currentUser?.user?.nombre?.split(' ')[0] || '',
      last_name: currentUser?.user?.nombre?.split(' ').slice(1).join(' ') || '',
      email: currentUser?.user?.email || '',
      phone: '',
      address: '',
    });
  };

  const handleSave = async () => {
    try {
      // Aquí iría la llamada a la API para actualizar los datos
      console.log('Guardando datos:', editedData);
      setIsEditing(false);
      // Mostrar mensaje de éxito
    } catch (error) {
      console.error('Error al guardar:', error);
      // Mostrar mensaje de error
    }
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mi Perfil</h1>
          <p className="text-xl text-gray-600">
            Gestiona tu información personal y de empresa
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Información Personal */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <User className="h-6 w-6 mr-2 text-blue-600" />
                Información Personal
              </h2>
              
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Editar</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Guardar</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancelar</span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.first_name}
                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <User className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900">{editedData.first_name}</span>
                  </div>
                )}
              </div>

              {/* Apellido */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <User className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900">{editedData.last_name}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">{editedData.email}</span>
                  <span className="text-xs text-gray-500">(No editable)</span>
                </div>
              </div>

              {/* Documento */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Documento
                </label>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">{currentUser?.user?.id}</span>
                </div>
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Ingresa tu teléfono"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900">{editedData.phone || 'No registrado'}</span>
                  </div>
                )}
              </div>

              {/* Dirección */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Ingresa tu dirección"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900">{editedData.address || 'No registrada'}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Información de la Empresa */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Building className="h-6 w-6 mr-2 text-green-600" />
              Información de la Empresa
            </h2>

            <div className="space-y-6">
              {/* Nombre de la empresa */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la Empresa
                </label>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Building className="h-5 w-5 text-green-600" />
                  <span className="text-gray-900 font-medium">{empresaData.nombre}</span>
                </div>
              </div>

              {/* NIT */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NIT
                </label>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">{empresaData.nit}</span>
                </div>
              </div>

              {/* Código de Empresa */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código de Empresa
                </label>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-mono">
                    {empresaData.codigo_empresa}
                  </span>
                </div>
              </div>

              {/* Contacto de la empresa */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contacto
                </label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{empresaData.telefono}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{empresaData.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{empresaData.direccion}</span>
                  </div>
                </div>
              </div>

              {/* Fecha de registro */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Registro
                </label>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">
                    {new Date(empresaData.fecha_registro).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {/* Estadísticas */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Estadísticas</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {empresaData.sistemas_registrados}
                    </div>
                    <div className="text-sm text-gray-600">Sistemas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {empresaData.evaluaciones_realizadas}
                    </div>
                    <div className="text-sm text-gray-600">Evaluaciones</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuarioEmpresa;