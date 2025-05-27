// src/pages/AdminSistemas/index.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code, 
  Search, 
  Filter, 
  Plus,
  Edit3,
  Trash2,
  Eye,
  Globe,
  Database,
  Cpu,
  BarChart3,
  Building,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Play,
  Download,
  FileText,
  Settings,
  Activity,
  Users
} from 'lucide-react';

const AdminSistemas = () => {
  const navigate = useNavigate();
  const [sistemas, setSistemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroEmpresa, setFiltroEmpresa] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sistemaToDelete, setSistemaToDelete] = useState(null);
  const [selectedSistemas, setSelectedSistemas] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Datos simulados de sistemas
  useEffect(() => {
    const fetchSistemas = async () => {
      try {
        setTimeout(() => {
          const sistemasData = [
            {
              id: 1,
              nombre: 'Sistema ERP Corporativo',
              descripcion: 'Sistema de planificación de recursos empresariales',
              tipo: 'Web Application',
              empresa: 'TechCorp S.A.S',
              empresa_id: 1,
              version: '2.1.5',
              estado: 'Producción',
              tecnologia: 'React, Node.js, PostgreSQL',
              fecha_creacion: '2023-01-15',
              fecha_actualizacion: '2024-05-20',
              responsable: 'Juan Pérez',
              usuarios_activos: 250,
              evaluaciones_count: 5,
              ultima_evaluacion: '2024-05-20',
              promedio_calificacion: 85.5,
              uptime: '99.8%',
              criticidad: 'Alta',
              url: 'https://erp.techcorp.com'
            },
            {
              id: 2,
              nombre: 'Portal Cliente Web',
              descripcion: 'Portal de autoservicio para clientes',
              tipo: 'Web Portal',
              empresa: 'TechCorp S.A.S',
              empresa_id: 1,
              version: '1.8.2',
              estado: 'Producción',
              tecnologia: 'Vue.js, Laravel, MySQL',
              fecha_creacion: '2023-03-20',
              fecha_actualizacion: '2024-05-15',
              responsable: 'María García',
              usuarios_activos: 1200,
              evaluaciones_count: 3,
              ultima_evaluacion: '2024-05-15',
              promedio_calificacion: 78.2,
              uptime: '99.5%',
              criticidad: 'Media',
              url: 'https://portal.techcorp.com'
            },
            {
              id: 3,
              nombre: 'API Gateway Principal',
              descripcion: 'Gateway central para servicios de la empresa',
              tipo: 'API',
              empresa: 'InnovaSoft Ltda',
              empresa_id: 2,
              version: '3.2.1',
              estado: 'Producción',
              tecnologia: 'Node.js, Express, Redis',
              fecha_creacion: '2023-02-10',
              fecha_actualizacion: '2024-05-25',
              responsable: 'Carlos Méndez',
              usuarios_activos: 50,
              evaluaciones_count: 4,
              ultima_evaluacion: '2024-05-25',
              promedio_calificacion: 92.1,
              uptime: '99.9%',
              criticidad: 'Alta',
              url: 'https://api.innovasoft.co'
            },
            {
              id: 4,
              nombre: 'App Móvil Ventas',
              descripción: 'Aplicación móvil para equipo de ventas',
              tipo: 'Mobile App',
              empresa: 'DataSolutions Corp',
              empresa_id: 3,
              version: '2.0.3',
              estado: 'Testing',
              tecnologia: 'React Native, Firebase',
              fecha_creacion: '2023-06-05',
              fecha_actualizacion: '2024-05-18',
              responsable: 'Ana Rodríguez',
              usuarios_activos: 75,
              evaluaciones_count: 2,
              ultima_evaluacion: '2024-05-18',
              promedio_calificacion: 73.8,
              uptime: '98.2%',
              criticidad: 'Media',
              url: 'https://play.google.com/store/apps/details?id=com.datasolutions.sales'
            },
            {
              id: 5,
              nombre: 'Dashboard Analytics',
              descripción: 'Plataforma de análisis y reportes',
              tipo: 'BI Platform',
              empresa: 'DataSolutions Corp',
              empresa_id: 3,
              version: '4.1.0',
              estado: 'Producción',
              tecnologia: 'Python, Django, PostgreSQL, D3.js',
              fecha_creacion: '2023-04-12',
              fecha_actualizacion: '2024-05-22',
              responsable: 'Luis Torres',
              usuarios_activos: 180,
              evaluaciones_count: 6,
              ultima_evaluacion: '2024-05-22',
              promedio_calificacion: 88.7,
              uptime: '99.6%',
              criticidad: 'Alta',
              url: 'https://analytics.datasolutions.co'
            },
            {
              id: 6,
              nombre: 'Sistema Inventario',
              descripción: 'Control de inventarios y almacén',
              tipo: 'Web Application',
              empresa: 'CloudTech Solutions',
              empresa_id: 4,
              version: '1.5.8',
              estado: 'Desarrollo',
              tecnología: 'Angular, .NET Core, SQL Server',
              fecha_creacion: '2024-01-08',
              fecha_actualizacion: '2024-05-12',
              responsable: 'Sandra López',
              usuarios_activos: 25,
              evaluaciones_count: 1,
              ultima_evaluacion: '2024-05-12',
              promedio_calificacion: 65.3,
              uptime: '95.1%',
              criticidad: 'Baja',
              url: 'https://dev-inventory.cloudtech.co'
            }
          ];
          setSistemas(sistemasData);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error cargando sistemas:', error);
        setLoading(false);
      }
    };

    fetchSistemas();
  }, []);

  // Filtrar sistemas
  const sistemasFiltrados = sistemas.filter(sistema => {
    const cumpleSearch = sistema.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        sistema.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        sistema.tecnologia.toLowerCase().includes(searchTerm.toLowerCase());
    const cumpleTipo = !filtroTipo || sistema.tipo === filtroTipo;
    const cumpleEstado = !filtroEstado || sistema.estado === filtroEstado;
    const cumpleEmpresa = !filtroEmpresa || sistema.empresa === filtroEmpresa;
    
    return cumpleSearch && cumpleTipo && cumpleEstado && cumpleEmpresa;
  });

  const tiposUnicos = [...new Set(sistemas.map(s => s.tipo))];
  const estadosUnicos = [...new Set(sistemas.map(s => s.estado))];
  const empresasUnicas = [...new Set(sistemas.map(s => s.empresa))];

  const getTipoIcon = (tipo) => {
    switch (tipo) {
      case 'Web Application':
      case 'Web Portal':
        return <Globe className="h-5 w-5" />;
      case 'API':
        return <Database className="h-5 w-5" />;
      case 'Mobile App':
        return <Cpu className="h-5 w-5" />;
      case 'BI Platform':
        return <BarChart3 className="h-5 w-5" />;
      default:
        return <Code className="h-5 w-5" />;
    }
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'Web Application':
      case 'Web Portal':
        return 'bg-blue-100 text-blue-600';
      case 'API':
        return 'bg-green-100 text-green-600';
      case 'Mobile App':
        return 'bg-purple-100 text-purple-600';
      case 'BI Platform':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Producción':
        return 'bg-green-100 text-green-800';
      case 'Testing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Desarrollo':
        return 'bg-blue-100 text-blue-800';
      case 'Mantenimiento':
        return 'bg-orange-100 text-orange-800';
      case 'Inactivo':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'Producción':
        return <CheckCircle className="h-4 w-4" />;
      case 'Testing':
        return <Clock className="h-4 w-4" />;
      case 'Desarrollo':
        return <Code className="h-4 w-4" />;
      case 'Mantenimiento':
        return <Settings className="h-4 w-4" />;
      case 'Inactivo':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getCriticidadColor = (criticidad) => {
    switch (criticidad) {
      case 'Alta':
        return 'bg-red-100 text-red-800';
      case 'Media':
        return 'bg-yellow-100 text-yellow-800';
      case 'Baja':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getColorCalificacion = (calificacion) => {
    if (calificacion >= 90) return 'text-green-600';
    if (calificacion >= 80) return 'text-blue-600';
    if (calificacion >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleVerDetalle = (sistemaId) => {
    navigate(`/admin/sistema/${sistemaId}/detalle`);
  };

  const handleEditarSistema = (sistemaId) => {
    navigate(`/admin/sistema/${sistemaId}/editar`);
  };

  const handleEliminarSistema = (sistema) => {
    setSistemaToDelete(sistema);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setSistemas(sistemas.filter(s => s.id !== sistemaToDelete.id));
    setShowDeleteModal(false);
    setSistemaToDelete(null);
  };

  const handleCrearSistema = () => {
    navigate('/admin/sistema/crear');
  };

  const handleSelectSistema = (sistemaId) => {
    setSelectedSistemas(prev => {
      const newSelected = prev.includes(sistemaId) 
        ? prev.filter(id => id !== sistemaId)
        : [...prev, sistemaId];
      setShowBulkActions(newSelected.length > 0);
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectedSistemas.length === sistemasFiltrados.length) {
      setSelectedSistemas([]);
      setShowBulkActions(false);
    } else {
      setSelectedSistemas(sistemasFiltrados.map(s => s.id));
      setShowBulkActions(true);
    }
  };

  const handleBulkDelete = () => {
    setSistemas(sistemas.filter(s => !selectedSistemas.includes(s.id)));
    setSelectedSistemas([]);
    setShowBulkActions(false);
  };

  const handleExportarDatos = () => {
    // Simular exportación
    const data = sistemasFiltrados.map(sistema => ({
      nombre: sistema.nombre,
      empresa: sistema.empresa,
      tipo: sistema.tipo,
      estado: sistema.estado,
      version: sistema.version,
      calificacion: sistema.promedio_calificacion,
      evaluaciones: sistema.evaluaciones_count
    }));
    
    console.log('Exportar datos:', data);
    // Aquí iría la lógica real de exportación
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando sistemas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Gestión de Sistemas
              </h1>
              <p className="text-xl text-gray-600">
                Administra todos los sistemas de software registrados en la plataforma
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleExportarDatos}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Exportar</span>
              </button>
              <button
                onClick={handleCrearSistema}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Nuevo Sistema</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Búsqueda */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar sistemas, empresas o tecnologías..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filtros */}
            <div>
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos los tipos</option>
                {tiposUnicos.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos los estados</option>
                {estadosUnicos.map(estado => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={filtroEmpresa}
                onChange={(e) => setFiltroEmpresa(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todas las empresas</option>
                {empresasUnicas.map(empresa => (
                  <option key={empresa} value={empresa}>{empresa}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{sistemas.length}</div>
            <div className="text-sm text-gray-600">Total Sistemas</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {sistemas.filter(s => s.estado === 'Producción').length}
            </div>
            <div className="text-sm text-gray-600">En Producción</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {sistemas.reduce((sum, s) => sum + s.evaluaciones_count, 0)}
            </div>
            <div className="text-sm text-gray-600">Evaluaciones</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {sistemas.reduce((sum, s) => sum + s.usuarios_activos, 0)}
            </div>
            <div className="text-sm text-gray-600">Usuarios Activos</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {(sistemas.reduce((sum, s) => sum + s.promedio_calificacion, 0) / sistemas.length).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Promedio General</div>
          </div>
        </div>

        {/* Acciones en lote */}
        {showBulkActions && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-blue-800">
                {selectedSistemas.length} sistema(s) seleccionado(s)
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Eliminar seleccionados
                </button>
                <button
                  onClick={() => {
                    setSelectedSistemas([]);
                    setShowBulkActions(false);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabla de sistemas */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedSistemas.length === sistemasFiltrados.length && sistemasFiltrados.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sistema
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Empresa
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Evaluaciones
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Calificación
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuarios
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sistemasFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <Code className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No se encontraron sistemas
                      </h3>
                      <p className="text-gray-600">
                        Intenta ajustar los filtros de búsqueda
                      </p>
                    </td>
                  </tr>
                ) : (
                  sistemasFiltrados.map((sistema) => (
                    <tr key={sistema.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedSistemas.includes(sistema.id)}
                          onChange={() => handleSelectSistema(sistema.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${getTipoColor(sistema.tipo)}`}>
                            {getTipoIcon(sistema.tipo)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {sistema.nombre}
                            </div>
                            <div className="text-sm text-gray-500">
                              {sistema.tipo} • v{sistema.version}
                            </div>
                            <div className="text-xs text-gray-400">
                              {sistema.tecnologia}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{sistema.empresa}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {sistema.responsable}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(sistema.estado)}`}>
                            {getEstadoIcon(sistema.estado)}
                            <span>{sistema.estado}</span>
                          </span>
                        </div>
                        <div className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block ${getCriticidadColor(sistema.criticidad)}`}>
                          {sistema.criticidad}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {sistema.evaluaciones_count} evaluaciones
                        </div>
                        <div className="text-xs text-gray-500">
                          Última: {new Date(sistema.ultima_evaluacion).toLocaleDateString('es-ES')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`text-lg font-bold ${getColorCalificacion(sistema.promedio_calificacion)}`}>
                          {sistema.promedio_calificacion}%
                        </div>
                        <div className="text-xs text-gray-500">
                          Uptime: {sistema.uptime}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {sistema.usuarios_activos}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleVerDetalle(sistema.id)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Ver detalle"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEditarSistema(sistema.id)}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEliminarSistema(sistema)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mostrar resultados */}
        <div className="mt-8 text-center text-gray-600">
          Mostrando {sistemasFiltrados.length} de {sistemas.length} sistemas
        </div>

        {/* Modal de confirmación de eliminación */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Confirmar eliminación
                  </h3>
                                    <p className="text-sm text-gray-600">
                    Esta acción no se puede deshacer. ¿Deseas eliminar el sistema "{sistemaToDelete?.nombre}"?
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSistemas;
