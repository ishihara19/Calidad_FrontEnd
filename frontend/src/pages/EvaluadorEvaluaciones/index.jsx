// src/pages/EvaluadorEvaluaciones/index.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileCheck, 
  Search, 
  Filter, 
  Calendar,
  Building,
  Code,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Eye,
  Edit,
  BarChart3,
  Download,
  Plus,
  Star,
  User,
  Target
} from 'lucide-react';

const EvaluadorEvaluaciones = () => {
  const navigate = useNavigate();
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroNorma, setFiltroNorma] = useState('');
  const [filtroEmpresa, setFiltroEmpresa] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  // Datos simulados de evaluaciones
  useEffect(() => {
    const fetchEvaluaciones = async () => {
      try {
        setTimeout(() => {
          const evaluacionesData = [
            {
              id: 1,
              proyecto: 'Sistema ERP Corporativo',
              empresa: 'TechCorp S.A.S',
              empresa_id: 1,
              sistema_id: 1,
              norma: 'ISO 25000',
              estado: 'Completada',
              fecha_inicio: '2024-05-20',
              fecha_fin: '2024-05-22',
              duracion: '2 días',
              calificacion: 87.2,
              caracteristicas_evaluadas: 8,
              subcaracteristicas_evaluadas: 24,
              observaciones: 'Sistema bien estructurado con buena funcionalidad. Necesita mejoras en seguridad y documentación.',
              puntos_fuertes: ['Excelente rendimiento', 'Interfaz intuitiva', 'Arquitectura sólida'],
              areas_mejora: ['Seguridad de datos', 'Documentación técnica', 'Pruebas automatizadas'],
              prioridad: 'Alta',
              nivel_cumplimiento: 'Satisfactorio'
            },
            {
              id: 2,
              proyecto: 'App Móvil de Ventas',
              empresa: 'InnovaSoft Ltda',
              empresa_id: 2,
              sistema_id: 4,
              norma: 'ISO 25000',
              estado: 'En Progreso',
              fecha_inicio: '2024-05-24',
              fecha_fin: null,
              duracion: null,
              calificacion: null,
              caracteristicas_evaluadas: 5,
              subcaracteristicas_evaluadas: 15,
              observaciones: 'Evaluación en curso. Se han identificado algunos problemas de usabilidad.',
              puntos_fuertes: ['Diseño atractivo', 'Funcionalidad básica completa'],
              areas_mejora: ['Tiempo de respuesta', 'Validación de datos'],
              prioridad: 'Media',
              nivel_cumplimiento: 'En evaluación'
            },
            {
              id: 3,
              proyecto: 'Portal Web Corporativo',
              empresa: 'DataSolutions Corp',
              empresa_id: 3,
              sistema_id: 2,
              norma: 'IEEE 730',
              estado: 'Completada',
              fecha_inicio: '2024-05-15',
              fecha_fin: '2024-05-18',
              duracion: '3 días',
              calificacion: 92.1,
              caracteristicas_evaluadas: 6,
              subcaracteristicas_evaluadas: 18,
              observaciones: 'Excelente implementación con altos estándares de calidad. Cumple con la mayoría de criterios.',
              puntos_fuertes: ['Seguridad robusta', 'Documentación completa', 'Mantenibilidad excelente'],
              areas_mejora: ['Optimización de imágenes', 'Cache del navegador'],
              prioridad: 'Alta',
              nivel_cumplimiento: 'Excelente'
            },
            {
              id: 4,
              proyecto: 'API Gateway Principal',
              empresa: 'CloudTech Solutions',
              empresa_id: 4,
              sistema_id: 3,
              norma: 'ISO 25000',
              estado: 'Pendiente',
              fecha_inicio: '2024-05-28',
              fecha_fin: null,
              duracion: null,
              calificacion: null,
              caracteristicas_evaluadas: 0,
              subcaracteristicas_evaluadas: 0,
              observaciones: 'Evaluación programada para iniciar próximamente.',
              puntos_fuertes: [],
              areas_mejora: [],
              prioridad: 'Alta',
              nivel_cumplimiento: 'Pendiente'
            },
            {
              id: 5,
              proyecto: 'Dashboard Analytics',
              empresa: 'DataSolutions Corp',
              empresa_id: 3,
              sistema_id: 5,
              norma: 'ISO 25000',
              estado: 'Completada',
              fecha_inicio: '2024-05-10',
              fecha_fin: '2024-05-14',
              duracion: '4 días',
              calificacion: 84.8,
              caracteristicas_evaluadas: 7,
              subcaracteristicas_evaluadas: 21,
              observaciones: 'Plataforma con buen potencial. Requiere optimizaciones en performance y usabilidad.',
              puntos_fuertes: ['Funcionalidad completa', 'Buena visualización de datos', 'Escalabilidad'],
              areas_mejora: ['Tiempo de carga', 'Experiencia de usuario', 'Validación de entrada'],
              prioridad: 'Media',
              nivel_cumplimiento: 'Satisfactorio'
            },
            {
              id: 6,
              proyecto: 'Sistema de Inventario',
              empresa: 'TechCorp S.A.S',
              empresa_id: 1,
              sistema_id: 6,
              norma: 'CMMI',
              estado: 'Pausada',
              fecha_inicio: '2024-05-12',
              fecha_fin: null,
              duracion: null,
              calificacion: null,
              caracteristicas_evaluadas: 3,
              subcaracteristicas_evaluadas: 9,
              observaciones: 'Evaluación pausada por solicitud del cliente para realizar ajustes al sistema.',
              puntos_fuertes: ['Estructura modular'],
              areas_mejora: ['Documentación incompleta', 'Faltan pruebas unitarias'],
              prioridad: 'Baja',
              nivel_cumplimiento: 'Interrumpido'
            }
          ];
          setEvaluaciones(evaluacionesData);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error cargando evaluaciones:', error);
        setLoading(false);
      }
    };

    fetchEvaluaciones();
  }, []);

  // Filtrar evaluaciones
  const evaluacionesFiltradas = evaluaciones.filter(evaluacion => {
    const cumpleSearch = evaluacion.proyecto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        evaluacion.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        evaluacion.norma.toLowerCase().includes(searchTerm.toLowerCase());
    const cumpleEstado = !filtroEstado || evaluacion.estado === filtroEstado;
    const cumpleNorma = !filtroNorma || evaluacion.norma === filtroNorma;
    const cumpleEmpresa = !filtroEmpresa || evaluacion.empresa === filtroEmpresa;
    
    return cumpleSearch && cumpleEstado && cumpleNorma && cumpleEmpresa;
  });

  const estadosUnicos = [...new Set(evaluaciones.map(e => e.estado))];
  const normasUnicas = [...new Set(evaluaciones.map(e => e.norma))];
  const empresasUnicas = [...new Set(evaluaciones.map(e => e.empresa))];

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Completada':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'En Progreso':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Pausada':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Cancelada':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'Completada':
        return <CheckCircle className="h-4 w-4" />;
      case 'En Progreso':
        return <Play className="h-4 w-4" />;
      case 'Pendiente':
        return <Clock className="h-4 w-4" />;
      case 'Pausada':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <FileCheck className="h-4 w-4" />;
    }
  };

  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
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

  const handleVerDetalle = (evaluacionId) => {
    navigate(`/evaluador/evaluacion/${evaluacionId}/detalle`);
  };

  const handleEditarEvaluacion = (evaluacionId) => {
    navigate(`/evaluador/evaluacion/${evaluacionId}/editar`);
  };

  const handleContinuarEvaluacion = (evaluacionId) => {
    navigate(`/evaluador/evaluacion/${evaluacionId}/continuar`);
  };

  const handleNuevaEvaluacion = () => {
    navigate('/evaluador/nueva-evaluacion');
  };

  const calcularStats = () => {
    const completadas = evaluaciones.filter(e => e.estado === 'Completada').length;
    const enProgreso = evaluaciones.filter(e => e.estado === 'En Progreso').length;
    const pendientes = evaluaciones.filter(e => e.estado === 'Pendiente').length;
    const promedioCalificacion = evaluaciones
      .filter(e => e.calificacion)
      .reduce((sum, e) => sum + e.calificacion, 0) / evaluaciones.filter(e => e.calificacion).length || 0;

    return { completadas, enProgreso, pendientes, promedioCalificacion };
  };

  const stats = calcularStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando evaluaciones...</p>
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
                Mis Evaluaciones
              </h1>
              <p className="text-xl text-gray-600">
                Gestiona y revisa todas tus evaluaciones de software
              </p>
            </div>
            <button
              onClick={handleNuevaEvaluacion}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Nueva Evaluación</span>
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Evaluaciones</p>
                <p className="text-3xl font-bold text-gray-900">{evaluaciones.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FileCheck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completadas</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completadas}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En Progreso</p>
                <p className="text-3xl font-bold text-gray-900">{stats.enProgreso + stats.pendientes}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Promedio</p>
                <p className="text-3xl font-bold text-gray-900">{stats.promedioCalificacion.toFixed(1)}%</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
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
                  placeholder="Buscar por proyecto, empresa o norma..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filtros */}
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
                value={filtroNorma}
                onChange={(e) => setFiltroNorma(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todas las normas</option>
                {normasUnicas.map(norma => (
                  <option key={norma} value={norma}>{norma}</option>
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

        {/* Lista de evaluaciones */}
        <div className="space-y-6">
          {evaluacionesFiltradas.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <FileCheck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron evaluaciones
              </h3>
              <p className="text-gray-600 mb-4">
                Intenta ajustar los filtros de búsqueda o inicia una nueva evaluación
              </p>
              <button
                onClick={handleNuevaEvaluacion}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Nueva Evaluación
              </button>
            </div>
          ) : (
            evaluacionesFiltradas.map((evaluacion) => (
              <div
                key={evaluacion.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {evaluacion.proyecto}
                      </h3>
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getEstadoColor(evaluacion.estado)}`}>
                        {getEstadoIcon(evaluacion.estado)}
                        <span>{evaluacion.estado}</span>
                      </span>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPrioridadColor(evaluacion.prioridad)}`}>
                        {evaluacion.prioridad}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Building className="h-4 w-4" />
                        <span>{evaluacion.empresa}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target className="h-4 w-4" />
                        <span>{evaluacion.norma}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(evaluacion.fecha_inicio).toLocaleDateString('es-ES')}
                          {evaluacion.fecha_fin && ` - ${new Date(evaluacion.fecha_fin).toLocaleDateString('es-ES')}`}
                        </span>
                      </div>
                      {evaluacion.duracion && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{evaluacion.duracion}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {evaluacion.calificacion && (
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getColorCalificacion(evaluacion.calificacion)}`}>
                          {evaluacion.calificacion}%
                        </div>
                        <div className="text-xs text-gray-500">Calificación</div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleVerDetalle(evaluacion.id)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Ver detalle"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      
                      {evaluacion.estado === 'En Progreso' && (
                        <button
                          onClick={() => handleContinuarEvaluacion(evaluacion.id)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          title="Continuar evaluación"
                        >
                          <Play className="h-4 w-4" />
                        </button>
                      )}
                      
                      {(evaluacion.estado === 'Completada' || evaluacion.estado === 'Pausada') && (
                        <button
                          onClick={() => handleEditarEvaluacion(evaluacion.id)}
                          className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
                          title="Editar evaluación"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Métricas de progreso */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      {evaluacion.caracteristicas_evaluadas}
                    </div>
                    <div className="text-xs text-gray-600">Características</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">
                      {evaluacion.subcaracteristicas_evaluadas}
                    </div>
                    <div className="text-xs text-gray-600">Subcaracterísticas</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">
                      {evaluacion.nivel_cumplimiento}
                    </div>
                    <div className="text-xs text-gray-600">Nivel</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">
                      {evaluacion.puntos_fuertes.length + evaluacion.areas_mejora.length}
                    </div>
                    <div className="text-xs text-gray-600">Observaciones</div>
                  </div>
                </div>

                {/* Observaciones */}
                {evaluacion.observaciones && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Observaciones:</h4>
                    <p className="text-gray-700 text-sm">{evaluacion.observaciones}</p>
                  </div>
                )}

                {/* Puntos fuertes y áreas de mejora */}
                {(evaluacion.puntos_fuertes.length > 0 || evaluacion.areas_mejora.length > 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {evaluacion.puntos_fuertes.length > 0 && (
                      <div>
                        <h4 className="font-medium text-green-700 mb-2 flex items-center space-x-1">
                          <CheckCircle className="h-4 w-4" />
                          <span>Puntos Fuertes</span>
                        </h4>
                        <ul className="space-y-1">
                          {evaluacion.puntos_fuertes.slice(0, 3).map((punto, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span>{punto}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {evaluacion.areas_mejora.length > 0 && (
                      <div>
                        <h4 className="font-medium text-orange-700 mb-2 flex items-center space-x-1">
                          <AlertCircle className="h-4 w-4" />
                          <span>Áreas de Mejora</span>
                        </h4>
                        <ul className="space-y-1">
                          {evaluacion.areas_mejora.slice(0, 3).map((area, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                              <span>{area}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Mostrar resultados */}
        <div className="mt-8 text-center text-gray-600">
          Mostrando {evaluacionesFiltradas.length} de {evaluaciones.length} evaluaciones
        </div>
      </div>
    </div>
  );
};

export default EvaluadorEvaluaciones;