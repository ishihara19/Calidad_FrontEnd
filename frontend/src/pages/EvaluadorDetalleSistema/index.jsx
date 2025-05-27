// src/pages/EvaluadorDetalleSistema/index.jsx
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
  Play,
  BarChart3,
  CheckCircle,
  Clock,
  AlertCircle,
  Building,
  User,
  ExternalLink,
  Tag,
  Activity,
  History
} from 'lucide-react';

const EvaluadorDetalleSistema = () => {
  const { sistemaId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { empresaId, empresaNombre, sistema: sistemaInicial } = location.state || {};
  
  const [sistema, setSistema] = useState(null);
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetalleSistema = async () => {
      try {
        // Simular llamada a API
        setTimeout(() => {
          const sistemaDetalle = {
            id: parseInt(sistemaId),
            nombre: 'Sistema ERP Corporativo',
            descripcion: 'Sistema de planificación de recursos empresariales que integra todos los procesos de negocio de la empresa, incluyendo contabilidad, recursos humanos, inventario, ventas y compras.',
            tipo: 'Web Application',
            tecnologia: 'React, Node.js, PostgreSQL, Redis',
            version: '2.1.5',
            fecha_creacion: '2023-01-15',
            fecha_actualizacion: '2024-05-20',
            estado: 'Producción',
            url: 'https://erp.techcorp.com',
            responsable: 'Juan Pérez',
            responsable_email: 'juan.perez@techcorp.com',
            responsable_telefono: '+57 1 234 5678',
            evaluaciones_count: 5,
            ultima_evaluacion: '2024-05-20',
            promedio_calificacion: 85.5,
            estado_evaluacion: 'completada',
            criticidad: 'Alta',
            usuarios_activos: 250,
            modulos: ['Contabilidad', 'RRHH', 'Inventario', 'Ventas', 'Compras', 'Reportes'],
            arquitectura: 'Microservicios',
            base_datos: 'PostgreSQL 14.2',
            servidor: 'AWS EC2',
            licencias: 'MIT, Apache 2.0',
            documentacion_url: 'https://docs.techcorp.com/erp',
            repositorio_url: 'https://github.com/techcorp/erp',
            ambiente_desarrollo: 'https://dev-erp.techcorp.com',
            ambiente_testing: 'https://test-erp.techcorp.com',
            backup_frecuencia: 'Diario',
            uptime: '99.8%',
            performance_score: 92
          };

          const evaluacionesData = [
            {
              id: 1,
              fecha: '2024-05-20',
              evaluador: 'Ana García',
              norma: 'ISO 25000',
              estado: 'Completada',
              calificacion: 87.2,
              caracteristicas_evaluadas: 8,
              observaciones: 'Sistema bien estructurado, necesita mejoras en seguridad',
              tiempo_evaluacion: '4 horas'
            },
            {
              id: 2,
              fecha: '2024-04-15',
              evaluador: 'Carlos Méndez',
              norma: 'ISO 25000',
              estado: 'Completada',
              calificacion: 84.1,
              caracteristicas_evaluadas: 6,
              observaciones: 'Buen rendimiento, interfaz intuitiva',
              tiempo_evaluacion: '3.5 horas'
            },
            {
              id: 3,
              fecha: '2024-03-10',
              evaluador: 'María Rodríguez',
              norma: 'IEEE 730',
              estado: 'Completada',
              calificacion: 89.3,
              caracteristicas_evaluadas: 7,
              observaciones: 'Excelente documentación y mantenibilidad',
              tiempo_evaluacion: '5 horas'
            },
            {
              id: 4,
              fecha: '2024-02-20',
              evaluador: 'Luis Torres',
              norma: 'ISO 25000',
              estado: 'Completada',
              calificacion: 82.8,
              caracteristicas_evaluadas: 5,
              observaciones: 'Funcionalidad completa, optimizar performance',
              tiempo_evaluacion: '3 horas'
            },
            {
              id: 5,
              fecha: '2024-01-18',
              evaluador: 'Ana García',
              norma: 'ISO 25000',
              estado: 'Completada',
              calificacion: 83.1,
              caracteristicas_evaluadas: 8,
              observaciones: 'Primera evaluación, base sólida para mejoras',
              tiempo_evaluacion: '4.5 horas'
            }
          ];

          setSistema(sistemaDetalle);
          setEvaluaciones(evaluacionesData);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error cargando detalle del sistema:', error);
        setLoading(false);
      }
    };

    fetchDetalleSistema();
  }, [sistemaId]);

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

  const getColorCalificacion = (calificacion) => {
    if (calificacion >= 90) return 'text-green-600';
    if (calificacion >= 80) return 'text-blue-600';
    if (calificacion >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleEvaluarSistema = () => {
    navigate(`/evaluador/sistema/${sistemaId}/evaluar`, {
      state: { 
        empresaId, 
        empresaNombre,
        sistema
      }
    });
  };

  const handleVerEvaluacion = (evaluacionId) => {
    navigate(`/evaluador/evaluacion/${evaluacionId}/detalle`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando detalle del sistema...</p>
        </div>
      </div>
    );
  }

  if (!sistema) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sistema no encontrado</h2>
          <p className="text-gray-600 mb-4">No se pudo cargar la información del sistema</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Volver
          </button>
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
            onClick={() => navigate(`/evaluador/empresa/${empresaId}/sistemas`, { 
              state: { empresaNombre } 
            })}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a Sistemas de {empresaNombre}</span>
          </button>
        </div>

        {/* Header del sistema */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-4 rounded-full ${getTipoColor(sistema.tipo)}`}>
                {getTipoIcon(sistema.tipo)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {sistema.nombre}
                </h1>
                <p className="text-gray-600 mb-4 max-w-2xl">
                  {sistema.descripcion}
                </p>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCriticidadColor(sistema.criticidad)}`}>
                    Criticidad: {sistema.criticidad}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">Versión {sistema.version}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">{sistema.tipo}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleEvaluarSistema}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Play className="h-5 w-5" />
              <span>Evaluar Sistema</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Información técnica */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Detalles generales */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Code className="h-6 w-6 mr-2 text-blue-600" />
                Información General
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Tecnologías
                  </label>
                  <p className="text-gray-900 mt-1">{sistema.tecnologia}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Arquitectura
                  </label>
                  <p className="text-gray-900 mt-1">{sistema.arquitectura}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Base de Datos
                  </label>
                  <p className="text-gray-900 mt-1">{sistema.base_datos}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Servidor
                  </label>
                  <p className="text-gray-900 mt-1">{sistema.servidor}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </label>
                  <p className="text-gray-900 mt-1">{sistema.estado}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Usuarios Activos
                  </label>
                  <p className="text-gray-900 mt-1">{sistema.usuarios_activos}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Uptime
                  </label>
                  <p className="text-green-600 font-semibold mt-1">{sistema.uptime}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Performance Score
                  </label>
                  <p className="text-blue-600 font-semibold mt-1">{sistema.performance_score}/100</p>
                </div>
              </div>
            </div>

            {/* Módulos */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Tag className="h-6 w-6 mr-2 text-green-600" />
                Módulos del Sistema
              </h2>
              
              <div className="flex flex-wrap gap-2">
                {sistema.modulos.map((modulo, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {modulo}
                  </span>
                ))}
              </div>
            </div>

            {/* Enlaces útiles */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ExternalLink className="h-6 w-6 mr-2 text-purple-600" />
                Enlaces y Recursos
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Aplicación en Producción</p>
                    <p className="text-sm text-gray-600">{sistema.url}</p>
                  </div>
                  <a
                    href={`https://${sistema.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Documentación</p>
                    <p className="text-sm text-gray-600">{sistema.documentacion_url}</p>
                  </div>
                  <a
                    href={sistema.documentacion_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Repositorio</p>
                    <p className="text-sm text-gray-600">{sistema.repositorio_url}</p>
                  </div>
                  <a
                    href={sistema.repositorio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Historial de evaluaciones */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <History className="h-6 w-6 mr-2 text-orange-600" />
                Historial de Evaluaciones
              </h2>
              
              <div className="space-y-4">
                {evaluaciones.map((evaluacion) => (
                  <div
                    key={evaluacion.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer"
                    onClick={() => handleVerEvaluacion(evaluacion.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="font-medium text-gray-900">
                          {evaluacion.norma} - {evaluacion.evaluador}
                        </span>
                      </div>
                      <span className={`font-bold ${getColorCalificacion(evaluacion.calificacion)}`}>
                        {evaluacion.calificacion}%
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Fecha:</span> {new Date(evaluacion.fecha).toLocaleDateString('es-ES')}
                      </div>
                      <div>
                        <span className="font-medium">Características:</span> {evaluacion.caracteristicas_evaluadas}
                      </div>
                      <div>
                        <span className="font-medium">Duración:</span> {evaluacion.tiempo_evaluacion}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-2">{evaluacion.observaciones}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar con información adicional */}
          <div className="space-y-6">
            
            {/* Responsable */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Responsable
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nombre</label>
                  <p className="text-gray-900">{sistema.responsable}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{sistema.responsable_email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Teléfono</label>
                  <p className="text-gray-900">{sistema.responsable_telefono}</p>
                </div>
              </div>
            </div>

            {/* Fechas importantes */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-600" />
                Fechas Importantes
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Creación</label>
                  <p className="text-gray-900">
                    {new Date(sistema.fecha_creacion).toLocaleDateString('es-ES')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Última Actualización</label>
                  <p className="text-gray-900">
                    {new Date(sistema.fecha_actualizacion).toLocaleDateString('es-ES')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Última Evaluación</label>
                  <p className="text-gray-900">
                    {new Date(sistema.ultima_evaluacion).toLocaleDateString('es-ES')}
                  </p>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                Estadísticas
              </h3>
              
              <div className="space-y-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {sistema.evaluaciones_count}
                  </div>
                  <div className="text-sm text-gray-600">Evaluaciones</div>
                </div>
                
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {sistema.promedio_calificacion}%
                  </div>
                  <div className="text-sm text-gray-600">Promedio</div>
                </div>
                
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {sistema.modulos.length}
                  </div>
                  <div className="text-sm text-gray-600">Módulos</div>
                </div>
              </div>
            </div>

            {/* Información técnica adicional */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-orange-600" />
                Información Técnica
              </h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <label className="font-medium text-gray-500">Licencias</label>
                  <p className="text-gray-900">{sistema.licencias}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-500">Backup</label>
                  <p className="text-gray-900">{sistema.backup_frecuencia}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-500">Ambiente Dev</label>
                  <a 
                    href={`https://${sistema.ambiente_desarrollo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 truncate block"
                  >
                    {sistema.ambiente_desarrollo}
                  </a>
                </div>
                <div>
                  <label className="font-medium text-gray-500">Ambiente Test</label>
                  <a 
                    href={`https://${sistema.ambiente_testing}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 truncate block"
                  >
                    {sistema.ambiente_testing}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluadorDetalleSistema;