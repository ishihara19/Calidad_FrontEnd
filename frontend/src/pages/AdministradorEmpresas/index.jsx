import { useState, useEffect } from 'react';
import { 
  Building, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Code,
  BarChart3,
  X,
  Check,
  AlertCircle,
  Users
} from 'lucide-react';

const AdminEmpresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroSector, setFiltroSector] = useState('');
  const [filtroTamaño, setFiltroTamaño] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create', 'edit', 'view', 'delete'
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    nit: '',
    sector: '',
    tamaño: '',
    direccion: '',
    telefono: '',
    email: '',
    descripcion: '',
    sitio_web: '',
    representante_legal: '',
    telefono_representante: '',
    email_representante: ''
  });

  // Datos simulados de empresas
  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        setTimeout(() => {
          const empresasData = [
            {
              id: 1,
              codigo_empresa: 'TC001',
              nombre: 'TechCorp S.A.S',
              nit: '900123456-7',
              sector: 'Tecnología',
              tamaño: 'Grande',
              direccion: 'Calle 100 #15-30, Bogotá',
              telefono: '+57 1 234 5678',
              email: 'contacto@techcorp.com',
              descripcion: 'Empresa líder en desarrollo de software empresarial',
              sitio_web: 'https://www.techcorp.com',
              representante_legal: 'Carlos Rodríguez',
              telefono_representante: '+57 1 234 5679',
              email_representante: 'carlos.rodriguez@techcorp.com',
              fecha_registro: '2023-06-15',
              sistemas_count: 5,
              evaluaciones_count: 12,
              estado: 'Activa'
            },
            {
              id: 2,
              codigo_empresa: 'IS002',
              nombre: 'InnovaSoft Ltda',
              nit: '800987654-3',
              sector: 'Software',
              tamaño: 'Mediana',
              direccion: 'Carrera 50 #25-10, Medellín',
              telefono: '+57 4 567 8901',
              email: 'info@innovasoft.co',
              descripcion: 'Especialistas en soluciones de software a medida',
              sitio_web: 'https://www.innovasoft.co',
              representante_legal: 'Ana María González',
              telefono_representante: '+57 4 567 8902',
              email_representante: 'ana.gonzalez@innovasoft.co',
              fecha_registro: '2023-08-22',
              sistemas_count: 3,
              evaluaciones_count: 7,
              estado: 'Activa'
            },
            {
              id: 3,
              codigo_empresa: 'DS003',
              nombre: 'DataSolutions Corp',
              nit: '901234567-1',
              sector: 'Análisis de Datos',
              tamaño: 'Grande',
              direccion: 'Av. Las Americas #45-20, Cali',
              telefono: '+57 2 345 6789',
              email: 'contact@datasolutions.co',
              descripcion: 'Empresa especializada en análisis de big data y BI',
              sitio_web: 'https://www.datasolutions.co',
              representante_legal: 'Roberto Silva',
              telefono_representante: '+57 2 345 6790',
              email_representante: 'roberto.silva@datasolutions.co',
              fecha_registro: '2023-03-10',
              sistemas_count: 8,
              evaluaciones_count: 20,
              estado: 'Activa'
            }
          ];
          setEmpresas(empresasData);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error cargando empresas:', error);
        setLoading(false);
      }
    };

    fetchEmpresas();
  }, []);

  // Filtrar empresas
  const empresasFiltradas = empresas.filter(empresa => {
    const cumpleSearch = empresa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        empresa.nit.includes(searchTerm) ||
                        empresa.codigo_empresa.toLowerCase().includes(searchTerm.toLowerCase());
    const cumpleSector = !filtroSector || empresa.sector === filtroSector;
    const cumpleTamaño = !filtroTamaño || empresa.tamaño === filtroTamaño;
    
    return cumpleSearch && cumpleSector && cumpleTamaño;
  });

  const sectoresUnicos = [...new Set(empresas.map(e => e.sector))];
  const tamañosUnicos = [...new Set(empresas.map(e => e.tamaño))];

  const resetForm = () => {
    setFormData({
      nombre: '',
      nit: '',
      sector: '',
      tamaño: '',
      direccion: '',
      telefono: '',
      email: '',
      descripcion: '',
      sitio_web: '',
      representante_legal: '',
      telefono_representante: '',
      email_representante: ''
    });
  };

  const handleOpenModal = (type, empresa = null) => {
    setModalType(type);
    setSelectedEmpresa(empresa);
    
    if (type === 'create') {
      resetForm();
    } else if (empresa) {
      setFormData({
        nombre: empresa.nombre || '',
        nit: empresa.nit || '',
        sector: empresa.sector || '',
        tamaño: empresa.tamaño || '',
        direccion: empresa.direccion || '',
        telefono: empresa.telefono || '',
        email: empresa.email || '',
        descripcion: empresa.descripcion || '',
        sitio_web: empresa.sitio_web || '',
        representante_legal: empresa.representante_legal || '',
        telefono_representante: empresa.telefono_representante || '',
        email_representante: empresa.email_representante || ''
      });
    }
    
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEmpresa(null);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (modalType === 'create') {
        // Simular creación
        const nuevaEmpresa = {
          id: Date.now(),
          codigo_empresa: `EMP${Date.now().toString().slice(-3)}`,
          ...formData,
          fecha_registro: new Date().toISOString().split('T')[0],
          sistemas_count: 0,
          evaluaciones_count: 0,
          estado: 'Activa'
        };
        setEmpresas([...empresas, nuevaEmpresa]);
      } else if (modalType === 'edit') {
        // Simular edición
        setEmpresas(empresas.map(emp => 
          emp.id === selectedEmpresa.id 
            ? { ...emp, ...formData }
            : emp
        ));
      }
      
      handleCloseModal();
    } catch (error) {
      console.error('Error guardando empresa:', error);
    }
  };

  const handleDelete = async () => {
    try {
      // Simular eliminación
      setEmpresas(empresas.filter(emp => emp.id !== selectedEmpresa.id));
      handleCloseModal();
    } catch (error) {
      console.error('Error eliminando empresa:', error);
    }
  };

  const getTamañoColor = (tamaño) => {
    switch (tamaño) {
      case 'Grande': return 'bg-purple-100 text-purple-800';
      case 'Mediana': return 'bg-blue-100 text-blue-800';
      case 'Pequeña': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Activa': return 'bg-green-100 text-green-800';
      case 'Inactiva': return 'bg-red-100 text-red-800';
      case 'Suspendida': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando empresas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Gestión de Empresas
            </h1>
            <p className="text-xl text-gray-600">
              Administra las empresas registradas en el sistema
            </p>
          </div>
          <button
            onClick={() => handleOpenModal('create')}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Nueva Empresa</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Empresas</p>
                <p className="text-3xl font-bold text-blue-600">{empresas.length}</p>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sistemas Totales</p>
                <p className="text-3xl font-bold text-green-600">
                  {empresas.reduce((sum, emp) => sum + emp.sistemas_count, 0)}
                </p>
              </div>
              <Code className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Evaluaciones</p>
                <p className="text-3xl font-bold text-purple-600">
                  {empresas.reduce((sum, emp) => sum + emp.evaluaciones_count, 0)}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Empresas Activas</p>
                <p className="text-3xl font-bold text-orange-600">
                  {empresas.filter(emp => emp.estado === 'Activa').length}
                </p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, NIT o código..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <select
                value={filtroSector}
                onChange={(e) => setFiltroSector(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos los sectores</option>
                {sectoresUnicos.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={filtroTamaño}
                onChange={(e) => setFiltroTamaño(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos los tamaños</option>
                {tamañosUnicos.map(tamaño => (
                  <option key={tamaño} value={tamaño}>{tamaño}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tabla de empresas */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Empresa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sector
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sistemas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {empresasFiltradas.map((empresa) => (
                  <tr key={empresa.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <Building className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {empresa.nombre}
                          </div>
                          <div className="text-sm text-gray-500">
                            {empresa.codigo_empresa} • NIT: {empresa.nit}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{empresa.sector}</div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTamañoColor(empresa.tamaño)}`}>
                        {empresa.tamaño}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{empresa.email}</div>
                      <div className="text-sm text-gray-500">{empresa.telefono}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {empresa.sistemas_count} sistemas
                      </div>
                      <div className="text-sm text-gray-500">
                        {empresa.evaluaciones_count} evaluaciones
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(empresa.estado)}`}>
                        {empresa.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleOpenModal('view', empresa)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Ver detalles"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleOpenModal('edit', empresa)}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleOpenModal('delete', empresa)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mostrar resultados */}
        <div className="mt-6 text-center text-gray-600">
          Mostrando {empresasFiltradas.length} de {empresas.length} empresas
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header del Modal */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">
                {modalType === 'create' && 'Nueva Empresa'}
                {modalType === 'edit' && 'Editar Empresa'}
                {modalType === 'view' && 'Detalles de la Empresa'}
                {modalType === 'delete' && 'Confirmar Eliminación'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6">
              {modalType === 'delete' ? (
                <div className="text-center">
                  <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    ¿Estás seguro de eliminar esta empresa?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Esta acción no se puede deshacer. Se eliminará la empresa "{selectedEmpresa?.nombre}" 
                    y todos sus datos asociados.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={handleCloseModal}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ) : modalType === 'view' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre de la Empresa
                      </label>
                      <p className="text-gray-900">{selectedEmpresa?.nombre}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        NIT
                      </label>
                      <p className="text-gray-900">{selectedEmpresa?.nit}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sector
                      </label>
                      <p className="text-gray-900">{selectedEmpresa?.sector}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tamaño
                      </label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTamañoColor(selectedEmpresa?.tamaño)}`}>
                        {selectedEmpresa?.tamaño}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dirección
                      </label>
                      <p className="text-gray-900">{selectedEmpresa?.direccion}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono
                      </label>
                      <p className="text-gray-900">{selectedEmpresa?.telefono}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <p className="text-gray-900">{selectedEmpresa?.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Representante Legal
                      </label>
                      <p className="text-gray-900">{selectedEmpresa?.representante_legal}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sitio Web
                      </label>
                      <p className="text-gray-900">{selectedEmpresa?.sitio_web}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de Registro
                      </label>
                      <p className="text-gray-900">
                        {new Date(selectedEmpresa?.fecha_registro).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estadísticas
                      </label>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          Sistemas: {selectedEmpresa?.sistemas_count}
                        </p>
                        <p className="text-sm text-gray-600">
                          Evaluaciones: {selectedEmpresa?.evaluaciones_count}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Información básica */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Información Básica</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre de la Empresa *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.nombre}
                          onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          NIT *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.nit}
                          onChange={(e) => setFormData({...formData, nit: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sector *
                        </label>
                        <select
                          required
                          value={formData.sector}
                          onChange={(e) => setFormData({...formData, sector: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Seleccionar sector</option>
                          <option value="Tecnología">Tecnología</option>
                          <option value="Software">Software</option>
                          <option value="Análisis de Datos">Análisis de Datos</option>
                          <option value="Cloud Computing">Cloud Computing</option>
                          <option value="Ciberseguridad">Ciberseguridad</option>
                          <option value="Telecomunicaciones">Telecomunicaciones</option>
                          <option value="Fintech">Fintech</option>
                          <option value="E-commerce">E-commerce</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tamaño de la Empresa *
                        </label>
                        <select
                          required
                          value={formData.tamaño}
                          onChange={(e) => setFormData({...formData, tamaño: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Seleccionar tamaño</option>
                          <option value="Pequeña">Pequeña (1-50 empleados)</option>
                          <option value="Mediana">Mediana (51-200 empleados)</option>
                          <option value="Grande">Grande (200+ empleados)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Dirección *
                        </label>
                        <textarea
                          required
                                                    value={formData.direccion}
                          onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Dirección completa"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.telefono}
                          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+57 123 4567890"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="correo@empresa.com"
                        />
                      </div>
                    </div>

                    {/* Información adicional */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Información Adicional</h3>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Descripción
                        </label>
                        <textarea
                          value={formData.descripcion}
                          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Descripción breve de la empresa"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sitio Web
                        </label>
                        <input
                          type="url"
                          value={formData.sitio_web}
                          onChange={(e) => setFormData({ ...formData, sitio_web: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://www.empresa.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Representante Legal
                        </label>
                        <input
                          type="text"
                          value={formData.representante_legal}
                          onChange={(e) => setFormData({ ...formData, representante_legal: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Nombre del representante"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Teléfono Representante
                        </label>
                        <input
                          type="tel"
                          value={formData.telefono_representante}
                          onChange={(e) => setFormData({ ...formData, telefono_representante: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+57 123 4567890"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Representante
                        </label>
                        <input
                          type="email"
                          value={formData.email_representante}
                          onChange={(e) => setFormData({ ...formData, email_representante: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="correo@representante.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      {modalType === 'create' ? 'Crear Empresa' : 'Guardar Cambios'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEmpresas;
