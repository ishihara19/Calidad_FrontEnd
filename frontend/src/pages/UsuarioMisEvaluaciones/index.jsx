// src/pages/UsuarioMisEvaluaciones/index.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  FileCheck, 
  Search, 
  Filter, 
  Calendar,
  User,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  Star,
  TrendingUp,
  BarChart3,
  Award,
  Building,
  RefreshCw
} from 'lucide-react';

const UsuarioMisEvaluaciones = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroEvaluador, setFiltroEvaluador] = useState('');
  const [filtroSistema, setFiltroSistema] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('90');

  // Datos simulados de evaluaciones de la empresa del usuario
  useEffect(() => {
    const fetchMisEvaluaciones = async () => {
      try {
        setTimeout(() => {
          const evaluacionesData = [
            {
              id: 1,
              sistema: 'Sistema ERP Corporativo',
              evaluador: 'Ana García Rodríguez',
              evaluador_email: 'ana.garcia@evaluadora.com',
              norma: 'ISO 25000',
              estado: 'Completada',
              fecha_inicio: '2024-05-20',
              fecha_fin: '2024-05-22',
              duracion: '2 días',
              calificacion_final: 87.2,
              nivel_cumplimiento: 'Satisfactorio',
              caracteristicas_evaluadas: 8,
              subcaracteristicas_evaluadas: 24,
              observaciones_generales: 'El sistema presenta una arquitectura sólida y funcionalidad completa. Se identificaron oportunidades de mejora en seguridad y documentación técnica.',
              puntos_fuertes: [
                'Excelente rendimiento y velocidad de respuesta',
                'Interfaz de usuario intuitiva y fácil de usar',
                'Arquitectura modular bien estructurada',
                'Buena integración entre módulos'
              ],
              areas_mejora: [
                'Implementar autenticación de dos factores',
                'Mejorar la documentación técnica del código',
                'Agregar más pruebas unitarias automatizadas',
                'Optimizar consultas de base de datos'
              ],
              recomendaciones: [
                'Priorizar las mejoras de seguridad en el próximo sprint',
                'Establecer un proceso de revisión de código',
                'Implementar monitoreo de performance en tiempo real'
              ],
              can_view_details: true,
              reporte_url: '/reportes/evaluacion-erp-mayo2024.pdf'
            },
            {
              id: 2,
              sistema: 'Portal Web Corporativo',
              evaluador: 'Carlos Méndez Silva',
              evaluador_email: 'carlos.mendez@evaluadora.com',
              norma: 'ISO 25000',
              estado: 'En Progreso',
              fecha_inicio: '2024-05-24',
              fecha_fin: null,
              duracion: null,
              calificacion_final: null,
              nivel_cumplimiento: 'En evaluación',
              caracteristicas_evaluadas: 5,
              subcaracteristicas_evaluadas: 15,
              observaciones_generales: 'Evaluación en curso. Hasta el momento se observa un buen diseño y funcionalidad básica.',
              puntos_fuertes: [
                'Diseño responsivo y atractivo',
                'Navegación clara y lógica',
                'Tiempos de carga aceptables'
              ],
              areas_mejora: [
                'Validación de formularios incompleta',
                'Falta optimización para SEO'
              ],
              recomendaciones: [],
              can_view_details: false,
              reporte_url: null
            },
            {
              id: 3,
              sistema: 'App Móvil de Ventas',
              evaluador: 'María Rodríguez López',
              evaluador_email: 'maria.rodriguez@evaluadora.com',
              norma: 'IEEE 730',
              estado: 'Completada',
              fecha_inicio: '2024-05-10',
              fecha_fin: '2024-05-14',
              duracion: '4 días',
              calificacion_final: 82.5,
              nivel_cumplimiento: 'Satisfactorio',
              caracteristicas_evaluadas: 6,
              subcaracteristicas_evaluadas: 18,
              observaciones_generales: 'Aplicación funcional con buen potencial. Requiere mejoras en usabilidad y performance.',
              puntos_fuertes: [
                'Funcionalidad completa según requerimientos',
                'Integración efectiva con sistemas backend',
                'Diseño visual moderno'
              ],
              areas_mejora: [
                'Optimizar tiempo de respuesta en consultas',
                'Mejorar flujo de navegación',
                'Agregar validaciones de entrada de datos',
                'Implementar manejo de errores más robusto'
              ],
              recomendaciones: [
                'Realizar pruebas de usabilidad con usuarios reales',
                'Implementar caché local para mejorar performance',
                'Revisar y optimizar consultas a la API'
              ],
              can_view_details: true,
              reporte_url: '/reportes/evaluacion-app-ventas-mayo2024.pdf'
            },
            {
              id: 4,
              sistema: 'Sistema de Inventario',
              evaluador: 'Luis Torres Hernández',
              evaluador_email: 'luis.torres@evaluadora.com',
              norma: 'ISO 25000',
              estado: 'Pendiente',
              fecha_inicio: '2024-06-05',
              fecha_fin: null,
              duracion: null,
              calificacion_final: null,
              nivel_cumplimiento: 'Pendiente',
              caracteristicas_evaluadas: 0,
              subcaracteristicas_evaluadas: 0,
              observaciones_generales: 'Evaluación programada para iniciar próximamente.',
              puntos_fuertes: [],
              areas_mejora: [],
              recomendaciones: [],
              can_view_details: false,
              reporte_url: null
            },
            {
              id: 5,
              sistema: 'Dashboard de Reportes',
              evaluador: 'Sofia Mendoza Castro',
              evaluador_email: 'sofia.mendoza@evaluadora.com',
              norma: 'ISO 25000',
              estado: 'Completada',
              fecha_inicio: '2024-04-15',
              fecha_fin: '2024-04-19',
              duracion: '4 días',
              calificacion_final: 89.1,
              nivel_cumplimiento: 'Bueno',
              caracteristicas_evaluadas: 7,
              subcaracteristicas_evaluadas: 21,
              observaciones_generales: 'Excelente implementación con visualizaciones efectivas y buena experiencia de usuario.',
              puntos_fuertes: [
                'Visualizaciones claras y efectivas',
                'Interfaz intuitiva para generar reportes',
                'Buena performance en carga de datos',
                'Exportación a múltiples formatos'
              ],
              areas_mejora: [
                'Agregar más opciones de filtrado avanzado',
                'Implementar notificaciones automáticas',
                'Mejorar responsividad en dispositivos móviles'
              ],
              recomendaciones: [
                'Considerar agregar análisis predictivo',
                'Implementar dashboards personalizables',
                'Agregar colaboración en tiempo real'
              ],
              can_view_details: true,
              reporte_url: '/reportes/evaluacion-dashboard-abril2024.pdf'
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

    fetchMisEvaluaciones();
  }, [selectedPeriod]);

  // Filtrar evaluaciones
  const evaluacionesFiltradas = evaluaciones.filter(evaluacion => {
    const cumpleSearch = evaluacion.sistema.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        evaluacion.evaluador.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        evaluacion.norma.toLowerCase().includes(searchTerm.toLowerCase());
    const cumpleEstado = !filtroEstado || evaluacion.estado === filtroEstado;
    const cumpleEvaluador = !filtroEvaluador || evaluacion.evaluador === filtroEvaluador;
    const cumpleSistema = !filtroSistema || evaluacion.sistema === filtroSistema;
    
    return cumpleSearch && cumpleEstado && cumpleEvaluador && cumpleSistema;
  });

  const estadosUnicos = [...new Set(evaluaciones.map(e => e.estado))];
  const evaluadoresUnicos = [...new Set(evaluaciones.map(e => e.evaluador))];
  const sistemasUnicos = [...new Set(evaluaciones.map(e => e.sistema))];

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
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'Completada':
        return <CheckCircle className="h-4 w-4" />;
      case 'En Progreso':
        return <Clock className="h-4 w-4" />;
      case 'Pendiente':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <FileCheck className="h-4 w-4" />;
    }
  };

  const getColorCalificacion = (calificacion) => {
    if (!calificacion) return 'text-gray-400';
    if (calificacion >= 90) return 'text-green-600';
    if (calificacion >= 80) return 'text-blue-600';
    if (calificacion >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getNivelColor = (nivel) => {
    switch (nivel.toLowerCase()) {
      case 'excelente':
        return 'bg-green-100 text-green-800';
      case 'bueno':
        return 'bg-blue-100 text-blue-800';
      case 'satisfactorio':
        return 'bg-yellow-100 text-yellow-800';
      case 'deficiente':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleVerDetalle = (evaluacionId) => {
    navigate(`/evaluacion/${evaluacionId}/detalle`);
  };

  const handleDescargarReporte = (reporteUrl, sistemaId) => {
    if (reporteUrl) {
      console.log(`Descargando reporte desde: ${reporteUrl}`);
      // Aquí iría la lógica real de descarga
    }
  };

  const calcularStats = () => {
    const completadas = evaluaciones.filter(e => e.estado === 'Completada').length;
    const enProgreso = evaluaciones.filter(e => e.estado === 'En Progreso').length;
    const pendientes = evaluaciones.filter(e => e.estado === 'Pendiente').length;
    const promedioCalificacion = evaluaciones
      .filter(e => e.calificacion_final)
      .reduce((sum, e) => sum + e.calificacion_final, 0) / evaluaciones.filter(e => e.calificacion_final).length || 0;

    return { completadas, enProgreso, pendientes, promedioCalificacion };
  };

  const stats = calcularStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando mis evaluaciones...</p>
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
                Mis Evaluaciones
              </h1>
              <p className="text-xl text-gray-600">
                Revisa el progreso y resultados de las evaluaciones de tus sistemas
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="30">Últimos 30 días</option>
                <option value="90">Últimos 3 meses</option>
                <option value="180">Últimos 6 meses</option>
                <option value="365">Último año</option>
              </select>
              <button
                onClick={() => window.location.reload()}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Actualizar</span>
              </button>
            </div>
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
                <p className="text-sm font-medium text-gray-600">En Proceso</p>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar evaluaciones..."
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
                value={filtroSistema}
                onChange={(e) => setFiltroSistema(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos los sistemas</option>
                {sistemasUnicos.map(sistema => (
                  <option key={sistema} value={sistema}>{sistema}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={filtroEvaluador}
                onChange={(e) => setFiltroEvaluador(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos los evaluadores</option>
                {evaluadoresUnicos.map(evaluador => (
                  <option key={evaluador} value={evaluador}>{evaluador}</option>
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
              <p className="text-gray-600">
                Intenta ajustar los filtros de búsqueda
              </p>
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
                        {evaluacion.sistema}
                      </h3>
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getEstadoColor(evaluacion.estado)}`}>
                        {getEstadoIcon(evaluacion.estado)}
                        <span>{evaluacion.estado}</span>
                      </span>
                      {evaluacion.nivel_cumplimiento !== 'Pendiente' && evaluacion.nivel_cumplimiento !== 'En evaluación' && (
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getNivelColor(evaluacion.nivel_cumplimiento)}`}>
                          {evaluacion.nivel_cumplimiento}
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{evaluacion.evaluador}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4" />
                        <span>{evaluacion.norma}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(evaluacion.fecha_inicio).toLocaleDateString('es-ES')}
                          {evaluacion.fecha_fin && ` - ${new Date(evaluacion.fecha_fin).toLocaleDateString('es-ES')}`}
                        </span>
                      </div>
                      {evaluacion.duracion && (
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{evaluacion.duracion}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 ml-4">
                    {evaluacion.calificacion_final && (
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${getColorCalificacion(evaluacion.calificacion_final)}`}>
                          {evaluacion.calificacion_final}%
                        </div>
                        <div className="text-xs text-gray-500">Calificación Final</div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      {evaluacion.can_view_details && (
                        <button
                          onClick={() => handleVerDetalle(evaluacion.id)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Ver detalle completo"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      )}
                      
                      {evaluacion.reporte_url && (
                        <button
                          onClick={() => handleDescargarReporte(evaluacion.reporte_url, evaluacion.id)}
                          className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          <span>Reporte</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Métricas de progreso */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
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
                      {evaluacion.puntos_fuertes.length + evaluacion.areas_mejora.length}
                    </div>
                    <div className="text-xs text-gray-600">Observaciones</div>
                  </div>
                </div>

                {/* Observaciones generales */}
                {evaluacion.observaciones_generales && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Observaciones Generales:</h4>
                    <p className="text-gray-700 text-sm">{evaluacion.observaciones_generales}</p>
                  </div>
                )}

                {/* Puntos fuertes y áreas de mejora */}
                {(evaluacion.puntos_fuertes.length > 0 || evaluacion.areas_mejora.length > 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {evaluacion.puntos_fuertes.length > 0 && (
                      <div>
                        <h4 className="font-medium text-green-700 mb-3 flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4" />
                          <span>Puntos Fuertes</span>
                        </h4>
                        <ul className="space-y-2">
                          {evaluacion.puntos_fuertes.slice(0, 3).map((punto, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{punto}</span>
                            </li>
                          ))}
                          {evaluacion.puntos_fuertes.length > 3 && (
                            <li className="text-sm text-blue-600 italic">
                              +{evaluacion.puntos_fuertes.length - 3} más...
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                    
                    {evaluacion.areas_mejora.length > 0 && (
                      <div>
                        <h4 className="font-medium text-orange-700 mb-3 flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4" />
                          <span>Áreas de Mejora</span>
                        </h4>
                        <ul className="space-y-2">
                          {evaluacion.areas_mejora.slice(0, 3).map((area, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{area}</span>
                            </li>
                          ))}
                          {evaluacion.areas_mejora.length > 3 && (
                            <li className="text-sm text-blue-600 italic">
                              +{evaluacion.areas_mejora.length - 3} más...
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Recomendaciones */}
                {evaluacion.recomendaciones.length > 0 && (
                  <div className="mt-4 bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-3 flex items-center space-x-2">
                      <Star className="h-4 w-4" />
                      <span>Recomendaciones</span>
                    </h4>
                                        <ul className="space-y-2">
                      {evaluacion.recomendaciones.slice(0, 3).map((recomendacion, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{recomendacion}</span>
                        </li>
                      ))}
                      {evaluacion.recomendaciones.length > 3 && (
                        <li className="text-sm text-blue-600 italic">
                          +{evaluacion.recomendaciones.length - 3} más...
                        </li>
                      )}
                    </ul>
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

export default UsuarioMisEvaluaciones;
