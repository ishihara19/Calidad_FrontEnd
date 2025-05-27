// src/pages/EvaluadorSistemasEmpresa/index.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft,
  Code,
  Calendar,
  Globe,
  Database,
  Shield,
  Cpu,
  FileCheck,
  Eye,
  Play,
  BarChart3,
  CheckCircle,
  Clock,
  AlertCircle,
  Building
} from 'lucide-react';

const EvaluadorSistemasEmpresa = () => {
  const { empresaId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const empresaNombre = location.state?.empresaNombre || 'Empresa';
  
  const [sistemas, setSistemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empresaInfo, setEmpresaInfo] = useState(null);

  useEffect(() => {
    const fetchSistemas = async () => {
      try {
        // Simular llamada a API
        setTimeout(() => {
          const sistemasData = [
            {
              id: 1,
              nombre: 'Sistema ERP Corporativo',
              descripcion: 'Sistema de planificación de recursos empresariales integrado',
              tipo: 'Web Application',
              tecnologia: 'React, Node.js, PostgreSQL',
              version: '2.1.5',
              fecha_creacion: '2023-01-15',
              fecha_actualizacion: '2024-05-20',
              estado: 'Producción',
              url: 'https://erp.techcorp.com',
              responsable: 'Juan Pérez',
              evaluaciones_count: 5,
              ultima_evaluacion: '2024-05-20',
              promedio_calificacion: 85.5,
              estado_evaluacion: 'completada',
              criticidad: 'Alta'
            },
            {
              id: 2,
              nombre: 'Portal de Clientes',
              descripcion: 'Portal web para gestión de clientes y servicios',
              tipo: 'Web Portal',
              tecnologia: 'Angular, .NET Core, SQL Server',
              version: '1.8.2',
              fecha_creacion: '2023-03-22',
              fecha_actualizacion: '2024-05-18',
              estado: 'Producción',
              url: 'https://portal.techcorp.com',
              responsable: 'María González',
              evaluaciones_count: 3,
              ultima_evaluacion: '2024-04-15',
              promedio_calificacion: 78.3,
              estado_evaluacion: 'pendiente',
              criticidad: 'Media'
            },
            {
              id: 3,
              nombre: 'API Gateway',
              descripcion: 'Puerta de enlace para microservicios',
              tipo: 'API',
              tecnologia: 'Spring Boot, Redis, Docker',
              version: '3.0.1',
              fecha_creacion: '2023-06-10',
              fecha_actualizacion: '2024-05-25',
              estado: 'Producción',
              url: 'https://api.techcorp.com',
              responsable: 'Carlos Rodríguez',
              evaluaciones_count: 2,
              ultima_evaluacion: '2024-03-10',
              promedio_calificacion: 92.1,
              estado_evaluacion: 'en_progreso',
              criticidad: 'Alta'
            },
            {
              id: 4,
              nombre: 'App Mobile Ventas',
              descripcion: 'Aplicación móvil para gestión de ventas',
              tipo: 'Mobile App',
              tecnologia: 'React Native, Firebase',
              version: '1.5.0',
              fecha_creacion: '2023-08-05',
              fecha_actualizacion: '2024-05-15',
              estado: 'Producción',
              url: 'play.google.com/store/apps/details?id=com.techcorp.sales',
              responsable: 'Ana López',
              evaluaciones_count: 4,
              ultima_evaluacion: '2024-05-10',
              promedio_calificacion: 82.7,
              estado_evaluacion: 'completada',
              criticidad: 'Media'
            },
            {
              id: 5,
              nombre: 'Sistema de Reportes',
              descripcion: 'Plataforma de Business Intelligence y reportes',
              tipo: 'BI Platform',
              tecnologia: 'Power BI, Python, Azure',
              version: '2.3.1',
              fecha_creacion: '2023-09-12',
              fecha_actualizacion: '2024-05-22',
              estado: 'Desarrollo',
              url: 'https://bi.techcorp.com',
              responsable: 'Luis Martínez',
              evaluaciones_count: 1,
              ultima_evaluacion: '2024-02-20',
              promedio_calificacion: 68.9,
              estado_evaluacion: 'sin_evaluar',
              criticidad: 'Baja'
            }
          ];

          const empresaData = {
            id: empresaId,
            nombre: empresaNombre,
            codigo: 'TC001',
            sistemas_total: sistemasData.length,
            evaluaciones_total: sistemasData.reduce((sum, s) => sum + s.evaluaciones_count, 0)
          };

          setSistemas(sistemasData);
          setEmpresaInfo(empresaData);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error cargando sistemas:', error);
        setLoading(false);
      }
    };

    fetchSistemas();
  }, [empresaId, empresaNombre]);

  const getTipoIcon = (tipo) => {
    switch (tipo) {
      case 'Web Application':
      case 'Web Portal':
        return <Globe className="h-6 w-6" />;
      case 'API':
        return <Database className="h-6 w-6" />;
      case 'Mobile App':
        return <Cpu className="h-6 w-6" />;
      case 'BI Platform':
        return <BarChart3 className="h-6 w-6" />;
      default:
        return <Code className="h-6 w-6" />;
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

  const getEstadoEvaluacionIcon = (estado) => {
    switch (estado) {
      case 'completada':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'en_progreso':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'pendiente':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'sin_evaluar':
        return <FileCheck className="h-4 w-4 text-gray-500" />;
      default:
        return <FileCheck className="h-4 w-4 text-gray-500" />;
    }
  };

  const getEstadoEvaluacionText = (estado) => {
    switch (estado) {
      case 'completada':
        return 'Evaluación Completada';
      case 'en_progreso':
        return 'Evaluación en Progreso';
      case 'pendiente':
        return 'Evaluación Pendiente';
      case 'sin_evaluar':
        return 'Sin Evaluar';
      default:
        return 'Sin Evaluar';
    }
  };

  const getColorCalificacion = (promedio) => {
    if (promedio >= 90) return 'text-green-600 bg-green-100';
    if (promedio >= 80) return 'text-blue-600 bg-blue-100';
    if (promedio >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const handleVerDetalle = (sistemaId) => {
    navigate(`/evaluador/sistema/${sistemaId}/detalle`, {
      state: { 
        empresaId, 
        empresaNombre,
        sistema: sistemas.find(s => s.id === sistemaId)
      }
    });
  };

  const handleEvaluarSistema = (sistemaId) => {
    navigate(`/evaluador/sistema/${sistemaId}/evaluar`, {
      state: { 
        empresaId, 
        empresaNombre,
        sistema: sistemas.find(s => s.id === sistemaId)
      }
    });
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
        
        {/* Navegación */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/evaluador/empresas')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a Empresas</span>
          </button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Building className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {empresaNombre}
              </h1>
              <p className="text-xl text-gray-600">
                Sistemas de software registrados
              </p>
            </div>
          </div>
        </div>

        {/* Estadísticas de la empresa */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{empresaInfo?.sistemas_total}</div>
            <div className="text-sm text-gray-600">Sistemas Registrados</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{empresaInfo?.evaluaciones_total}</div>
            <div className="text-sm text-gray-600">Evaluaciones Realizadas</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {sistemas.length > 0 ? (sistemas.reduce((sum, s) => sum + s.promedio_calificacion, 0) / sistemas.length).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-600">Promedio General</div>
          </div>
        </div>

        {/* Lista de sistemas */}
        <div className="space-y-6">
          {sistemas.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Code className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No hay sistemas registrados
              </h3>
              <p className="text-gray-600">
                Esta empresa aún no tiene sistemas de software registrados
              </p>
            </div>
          ) : (
            sistemas.map((sistema) => (
              <div
                key={sistema.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-blue-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`p-3 rounded-full ${getTipoColor(sistema.tipo)}`}>
                        {getTipoIcon(sistema.tipo)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {sistema.nombre}
                        </h3>
                        <p className="text-gray-600 mb-2">{sistema.descripcion}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCriticidadColor(sistema.criticidad)}`}>
                            Criticidad: {sistema.criticidad}
                          </span>
                          <span className="text-gray-500">Versión {sistema.version}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-500">{sistema.tipo}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tecnologías
                        </label>
                        <p className="text-sm text-gray-900">{sistema.tecnologia}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Responsable
                        </label>
                        <p className="text-sm text-gray-900">{sistema.responsable}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </label>
                        <p className="text-sm text-gray-900">{sistema.estado}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Última Actualización
                        </label>
                        <p className="text-sm text-gray-900">
                          {new Date(sistema.fecha_actualizacion).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Evaluaciones
                        </label>
                        <p className="text-sm text-gray-900">{sistema.evaluaciones_count} realizadas</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          URL/Enlace
                        </label>
                        <a 
                          href={`https://${sistema.url}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-700 truncate block"
                        >
                          {sistema.url}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        {getEstadoEvaluacionIcon(sistema.estado_evaluacion)}
                        <span className="text-sm text-gray-600">
                          {getEstadoEvaluacionText(sistema.estado_evaluacion)}
                        </span>
                      </div>
                      {sistema.estado_evaluacion !== 'sin_evaluar' && (
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getColorCalificacion(sistema.promedio_calificacion)}`}>
                          Promedio: {sistema.promedio_calificacion}%
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="ml-6 flex flex-col space-y-3">
                    <button
                      onClick={() => handleVerDetalle(sistema.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Ver Detalle</span>
                    </button>
                    
                    <button
                      onClick={() => handleEvaluarSistema(sistema.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Play className="h-4 w-4" />
                      <span>Evaluar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EvaluadorSistemasEmpresa;