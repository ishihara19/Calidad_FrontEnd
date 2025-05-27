// src/pages/UsuarioMisSistemas/index.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  Code, 
  Search, 
  Filter, 
  Calendar,
  Globe,
  Database,
  Cpu,
  Smartphone,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  Plus,
  Settings,
  Activity,
  Users,
  TrendingUp,
  Shield,
  RefreshCw,
  FileCheck,
  Star
} from 'lucide-react';

const UsuarioMisSistemas = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [sistemas, setSistemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroEvaluacion, setFiltroEvaluacion] = useState('');

  // Datos simulados de sistemas de la empresa del usuario
  useEffect(() => {
    const fetchMisSistemas = async () => {
      try {
        setTimeout(() => {
          const sistemasData = [
            {
              id: 1,
              nombre: 'Sistema ERP Corporativo',
              descripcion: 'Sistema integral de planificación de recursos empresariales que gestiona todos los procesos de negocio incluyendo contabilidad, RRHH, inventario y ventas.',
              tipo: 'Web Application',
              tecnologia: 'React, Node.js, PostgreSQL, Redis',
              version: '2.1.5',
              fecha_creacion: '2023-01-15',
              fecha_actualizacion: '2024-05-20',
              estado: 'Producción',
              url_produccion: 'https://erp.miempresa.com',
              url_desarrollo: 'https://dev-erp.miempresa.com',
              responsable_tecnico: 'Juan Pérez',
              responsable_negocio: 'María González',
              usuarios_activos: 250,
              evaluaciones_count: 3,
              ultima_evaluacion: '2024-05-22',
              promedio_calificacion: 87.2,
              estado_evaluacion: 'Evaluado',
              criticidad: 'Alta',
              uptime: '99.8%',
              modulos: ['Contabilidad', 'RRHH', 'Inventario', 'Ventas', 'Compras', 'Reportes'],
              issues_abiertas: 2,
              issues_criticas: 0,
              proxima_evaluacion: '2024-08-15',
              certificaciones: ['ISO 27001', 'SOC 2'],
              backup_frecuencia: 'Diario'
            },
            {
              id: 2,
              nombre: 'Portal Web Corporativo',
              descripcion: 'Sitio web institucional con información corporativa, noticias, productos y servicios. Incluye área de clientes y portal de proveedores.',
              tipo: 'Web Portal',
              tecnologia: 'Vue.js, Laravel, MySQL, Nginx',
              version: '1.8.2',
              fecha_creacion: '2023-03-20',
              fecha_actualizacion: '2024-05-15',
              estado: 'Producción',
              url_produccion: 'https://www.miempresa.com',
              url_desarrollo: 'https://dev.miempresa.com',
              responsable_tecnico: 'Carlos Méndez',
              responsable_negocio: 'Ana López',
              usuarios_activos: 1200,
              evaluaciones_count: 2,
              ultima_evaluacion: '2024-05-24',
              promedio_calificacion: null,
              estado_evaluacion: 'En Evaluación',
              criticidad: 'Media',
              uptime: '99.5%',
              modulos: ['Portal Público', 'Área Clientes', 'Portal Proveedores', 'Noticias', 'Contacto'],
              issues_abiertas: 1,
              issues_criticas: 0,
              proxima_evaluacion: null,
              certificaciones: ['SSL/TLS'],
              backup_frecuencia: 'Diario'
            },
            {
              id: 3,
              nombre: 'App Móvil de Ventas',
              descripcion: 'Aplicación móvil para el equipo de ventas que permite gestionar clientes, productos, cotizaciones y pedidos desde dispositivos móviles.',
              tipo: 'Mobile App',
              tecnologia: 'React Native, Firebase, Node.js API',
              version: '2.0.3',
              fecha_creacion: '2023-06-05',
              fecha_actualizacion: '2024-05-18',
              estado: 'Testing',
              url_produccion: null,
              url_desarrollo: 'App Store/Google Play (Beta)',
              responsable_tecnico: 'Luis Torres',
              responsable_negocio: 'Roberto Silva',
              usuarios_activos: 75,
              evaluaciones_count: 1,
              ultima_evaluacion: '2024-05-14',
              promedio_calificacion: 82.5,
              estado_evaluacion: 'Evaluado',
              criticidad: 'Media',
              uptime: '98.2%',
              modulos: ['Gestión Clientes', 'Catálogo Productos', 'Cotizaciones', 'Pedidos', 'Reportes'],
              issues_abiertas: 5,
              issues_criticas: 1,
              proxima_evaluacion: '2024-07-30',
              certificaciones: [],
              backup_frecuencia: 'Automático'
            },
            {
              id: 4,
              nombre: 'Dashboard de Reportes',
              descripcion: 'Plataforma de business intelligence para visualizar KPIs, generar reportes ejecutivos y análisis de datos empresariales.',
              tipo: 'BI Platform',
              tecnologia: 'Python, Django, PostgreSQL, D3.js',
              version: '4.1.0',
              fecha_creacion: '2023-04-12',
              fecha_actualizacion: '2024-05-22',
              estado: 'Producción',
              url_produccion: 'https://analytics.miempresa.com',
              url_desarrollo: 'https://dev-analytics.miempresa.com',
              responsable_tecnico: 'Sofia Mendoza',
              responsable_negocio: 'Fernando Castro',
              usuarios_activos: 180,
              evaluaciones_count: 2,
              ultima_evaluacion: '2024-04-19',
              promedio_calificacion: 89.1,
              estado_evaluacion: 'Evaluado',
              criticidad: 'Alta',
              uptime: '99.6%',
              modulos: ['Dashboards', 'Reportes', 'Analytics', 'Data Export', 'Alertas'],
              issues_abiertas: 0,
              issues_criticas: 0,
              proxima_evaluacion: '2024-10-15',
              certificaciones: ['ISO 27001'],
              backup_frecuencia: 'Diario'
            },
            {
              id: 5,
              nombre: 'Sistema de Inventario',
              descripcion: 'Sistema especializado para el control y gestión de inventarios, almacenes, stock, compras y proveedores.',
              tipo: 'Web Application',
              tecnologia: 'Angular, .NET Core, SQL Server',
              version: '1.5.8',
              fecha_creacion: '2024-01-08',
              fecha_actualizacion: '2024-05-12',
              estado: 'Desarrollo',
              url_produccion: null,
              url_desarrollo: 'https://dev-inventory.miempresa.com',
              responsable_tecnico: 'Sandra López',
              responsable_negocio: 'Diego Ramírez',
              usuarios_activos: 25,
              evaluaciones_count: 0,
              ultima_evaluacion: null,
              promedio_calificacion: null,
              estado_evaluacion: 'Pendiente',
              criticidad: 'Baja',
              uptime: '95.1%',
              modulos: ['Inventario', 'Almacenes', 'Compras', 'Proveedores', 'Reportes'],
              issues_abiertas: 12,
              issues_criticas: 2,
              proxima_evaluacion: '2024-06-30',
              certificaciones: [],
              backup_frecuencia: 'Semanal'
            },
            {
              id: 6,
              nombre: 'API Gateway Principal',
              descripcion: 'Gateway central que gestiona todas las comunicaciones entre microservicios y aplicaciones externas de la empresa.',
              tipo: 'API',
              tecnologia: 'Node.js, Express, Redis, Docker',
              version: '3.2.1',
              fecha_creacion: '2023-02-10',
              fecha_actualizacion: '2024-05-25',
              estado: 'Producción',
              url_produccion: 'https://api.miempresa.com',
              url_desarrollo: 'https://dev-api.miempresa.com',
              responsable_tecnico: 'Miguel Herrera',
              responsable_negocio: 'Patricia Vega',
              usuarios_activos: 50,
              evaluaciones_count: 1,
              ultima_evaluacion: '2024-03-15',
              promedio_calificacion: 92.1,
              estado_evaluacion: 'Evaluado',
              criticidad: 'Alta',
              uptime: '99.9%',
              modulos: ['Authentication', 'Rate Limiting', 'Logging', 'Monitoring', 'Security'],
              issues_abiertas: 1,
              issues_criticas: 0,
              proxima_evaluacion: '2024-09-15',
              certificaciones: ['SOC 2', 'ISO 27001'],
              backup_frecuencia: 'Continuo'
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

    fetchMisSistemas();
  }, []);

  // Filtrar sistemas
  const sistemasFiltrados = sistemas.filter(sistema => {
    const cumpleSearch = sistema.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        sistema.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        sistema.tecnologia.toLowerCase().includes(searchTerm.toLowerCase());
    const cumpleTipo = !filtroTipo || sistema.tipo === filtroTipo;
    const cumpleEstado = !filtroEstado || sistema.estado === filtroEstado;
    const cumpleEvaluacion = !filtroEvaluacion || sistema.estado_evaluacion === filtroEvaluacion;
    
    return cumpleSearch && cumpleTipo && cumpleEstado && cumpleEvaluacion;
  });

  const tiposUnicos = [...new Set(sistemas.map(s => s.tipo))];
  const estadosUnicos = [...new Set(sistemas.map(s => s.estado))];
  const estadosEvaluacionUnicos = [...new Set(sistemas.map(s => s.estado_evaluacion))];

  const getTipoIcon = (tipo) => {
    switch (tipo) {
      case 'Web Application':
      case 'Web Portal':
        return <Globe className="h-5 w-5" />;
      case 'API':
        return <Database className="h-5 w-5" />;
      case 'Mobile App':
        return <Smartphone className="h-5 w-5" />;
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
    if (!calificacion) return 'text-gray-400';
    if (calificacion >= 90) return 'text-green-600';
    if (calificacion >= 80) return 'text-blue-600';
    if (calificacion >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEvaluacionColor = (estado) => {
    switch (estado) {
      case 'Evaluado':
        return 'bg-green-100 text-green-800';
      case 'En Evaluación':
        return 'bg-blue-100 text-blue-800';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleVerDetalle = (sistemaId) => {
    navigate(`/sistema/${sistemaId}/detalle`);
  };

  const handleSolicitarEvaluacion = (sistemaId) => {
    navigate(`/sistema/${sistemaId}/solicitar-evaluacion`);
  };

  const calcularStats = () => {
    const enProduccion = sistemas.filter(s => s.estado === 'Producción').length;
    const evaluados = sistemas.filter(s => s.estado_evaluacion === 'Evaluado').length;
    const pendientesEvaluacion = sistemas.filter(s => s.estado_evaluacion === 'Pendiente').length;
    const promedioCalificacion = sistemas
      .filter(s => s.promedio_calificacion)
      .reduce((sum, s) => sum + s.promedio_calificacion, 0) / sistemas.filter(s => s.promedio_calificacion).length || 0;

    return { enProduccion, evaluados, pendientesEvaluacion, promedioCalificacion };
  };

  const stats = calcularStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando mis sistemas...</p>
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
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Mis Sistemas
              </h1>
              <p className="text-xl text-gray-600">
                Gestiona y monitorea todos los sistemas de software de tu empresa
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Actualizar</span>
              </button>
              <button
                onClick={() => navigate('/sistema/registrar')}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Registrar Sistema</span>
              </button>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sistemas</p>
                <p className="text-3xl font-bold text-gray-900">{sistemas.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Code className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En Producción</p>
                <p className="text-3xl font-bold text-gray-900">{stats.enProduccion}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Por Evaluar</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendientesEvaluacion}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <FileCheck className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Promedio Calidad</p>
                <p className="text-3xl font-bold text-gray-900">{stats.promedioCalificacion.toFixed(1)}%</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar sistemas..."
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
                value={filtroEvaluacion}
                onChange={(e) => setFiltroEvaluacion(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Estado de evaluación</option>
                {estadosEvaluacionUnicos.map(estado => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lista de sistemas */}
        <div className="space-y-6">
          {sistemasFiltrados.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Code className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron sistemas
              </h3>
              <p className="text-gray-600 mb-4">
                Intenta ajustar los filtros de búsqueda o registra un nuevo sistema
              </p>
              <button
                onClick={() => navigate('/sistema/registrar')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Registrar Sistema
              </button>
            </div>
          ) : (
            sistemasFiltrados.map((sistema) => (
              <div
                key={sistema.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-blue-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`p-2 rounded-lg ${getTipoColor(sistema.tipo)}`}>
                        {getTipoIcon(sistema.tipo)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {sistema.nombre}
                        </h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(sistema.estado)}`}>
                            {getEstadoIcon(sistema.estado)}
                            <span>{sistema.estado}</span>
                          </span>
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getCriticidadColor(sistema.criticidad)}`}>
                            {sistema.criticidad}
                          </span>
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getEvaluacionColor(sistema.estado_evaluacion)}`}>
                            {sistema.estado_evaluacion}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 max-w-4xl">
                      {sistema.descripcion}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Versión:</span> {sistema.version}
                      </div>
                      <div>
                        <span className="font-medium">Usuarios:</span> {sistema.usuarios_activos}
                      </div>
                      <div>
                        <span className="font-medium">Uptime:</span> {sistema.uptime}
                      </div>
                      <div>
                        <span className="font-medium">Evaluaciones:</span> {sistema.evaluaciones_count}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 ml-4">
                    {sistema.promedio_calificacion && (
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getColorCalificacion(sistema.promedio_calificacion)}`}>
                          {sistema.promedio_calificacion}%
                        </div>
                        <div className="text-xs text-gray-500">Calidad</div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleVerDetalle(sistema.id)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Ver detalle"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      
                      {sistema.estado_evaluacion === 'Pendiente' && (
                        <button
                          onClick={() => handleSolicitarEvaluacion(sistema.id)}
                          className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <FileCheck className="h-4 w-4" />
                          <span>Solicitar Evaluación</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                                {/* Información técnica */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Información Técnica</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li><span className="font-semibold">Tecnologías:</span> {sistema.tecnologia}</li>
                      <li><span className="font-semibold">Módulos:</span> {sistema.modulos.join(', ')}</li>
                      <li><span className="font-semibold">Certificaciones:</span> {sistema.certificaciones.length > 0 ? sistema.certificaciones.join(', ') : 'Ninguna'}</li>
                      <li><span className="font-semibold">Backup:</span> {sistema.backup_frecuencia}</li>
                      <li><span className="font-semibold">Issues abiertas:</span> {sistema.issues_abiertas}</li>
                      <li><span className="font-semibold">Issues críticas:</span> {sistema.issues_criticas}</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Responsables</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li><span className="font-semibold">Técnico:</span> {sistema.responsable_tecnico}</li>
                      <li><span className="font-semibold">Negocio:</span> {sistema.responsable_negocio}</li>
                    </ul>

                    {sistema.url_produccion && (
                      <div className="mt-4">
                        <a
                          href={sistema.url_produccion}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          URL Producción
                        </a>
                      </div>
                    )}

                    {sistema.url_desarrollo && (
                      <div className="mt-2">
                        <a
                          href={sistema.url_desarrollo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          URL Desarrollo
                        </a>
                      </div>
                    )}

                    {sistema.proxima_evaluacion && (
                      <div className="mt-4 text-sm text-gray-600">
                        Próxima Evaluación: {new Date(sistema.proxima_evaluacion).toLocaleDateString('es-ES')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Mostrar resultados */}
        <div className="mt-8 text-center text-gray-600">
          Mostrando {sistemasFiltrados.length} de {sistemas.length} sistemas
        </div>
      </div>
    </div>
  );
};

export default UsuarioMisSistemas;
