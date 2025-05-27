// src/pages/EvaluadorReportes/index.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  PieChart,
  TrendingUp,
  Download,
  Calendar,
  Filter,
  FileText,
  Building,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Eye,
  Plus,
  Settings,
  RefreshCw
} from 'lucide-react';

const EvaluadorReportes = () => {
  const navigate = useNavigate();
  const [reportes, setReportes] = useState([]);
  const [estadisticas, setEstadisticas] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('resumen');

  // Datos simulados
  useEffect(() => {
    const fetchReportesData = async () => {
      try {
        setTimeout(() => {
          const reportesData = [
            {
              id: 1,
              titulo: 'Reporte Mensual - Mayo 2024',
              tipo: 'Mensual',
              fecha_generacion: '2024-05-31',
              periodo: 'Mayo 2024',
              evaluaciones_incluidas: 8,
              empresas_incluidas: 5,
              promedio_calificacion: 86.2,
              estado: 'Completado',
              archivo_url: '/reportes/mayo-2024.pdf',
              descripcion: 'Resumen completo de todas las evaluaciones realizadas durante mayo'
            },
            {
              id: 2,
              titulo: 'Análisis por Normas - ISO 25000',
              tipo: 'Por Norma',
              fecha_generacion: '2024-05-28',
              periodo: 'Enero - Mayo 2024',
              evaluaciones_incluidas: 15,
              empresas_incluidas: 8,
              promedio_calificacion: 84.7,
              estado: 'Completado',
              archivo_url: '/reportes/iso25000-analysis.pdf',
              descripcion: 'Análisis detallado de evaluaciones bajo norma ISO 25000'
            },
            {
              id: 3,
              titulo: 'Comparativo de Empresas - Q1 2024',
              tipo: 'Comparativo',
              fecha_generacion: '2024-05-25',
              periodo: 'Q1 2024',
              evaluaciones_incluidas: 12,
              empresas_incluidas: 6,
              promedio_calificacion: 82.1,
              estado: 'Completado',
              archivo_url: '/reportes/comparative-q1.pdf',
              descripcion: 'Comparación de rendimiento entre empresas evaluadas'
            },
            {
              id: 4,
              titulo: 'Tendencias de Calidad - 2024',
              tipo: 'Tendencias',
              fecha_generacion: '2024-05-20',
              periodo: 'Enero - Mayo 2024',
              evaluaciones_incluidas: 23,
              empresas_incluidas: 12,
              promedio_calificacion: 85.4,
              estado: 'Completado',
              archivo_url: '/reportes/trends-2024.pdf',
              descripcion: 'Análisis de tendencias en calidad de software durante 2024'
            },
            {
              id: 5,
              titulo: 'Reporte Personalizado - TechCorp',
              tipo: 'Personalizado',
              fecha_generacion: '2024-05-18',
              periodo: 'Marzo - Mayo 2024',
              evaluaciones_incluidas: 3,
              empresas_incluidas: 1,
              promedio_calificacion: 87.8,
              estado: 'Completado',
              archivo_url: '/reportes/techcorp-custom.pdf',
              descripcion: 'Reporte específico para TechCorp S.A.S con análisis detallado'
            }
          ];

          const estadisticasData = {
            evaluaciones_totales: 23,
            empresas_evaluadas: 12,
            promedio_general: 85.4,
            normas_utilizadas: 4,
            evaluaciones_completadas: 20,
            evaluaciones_pendientes: 3,
            tiempo_promedio_evaluacion: '3.2 días',
            caracteristicas_mas_evaluadas: [
              { nombre: 'Funcionalidad', count: 18, promedio: 87.2 },
              { nombre: 'Usabilidad', count: 16, promedio: 82.5 },
              { nombre: 'Confiabilidad', count: 15, promedio: 85.1 },
              { nombre: 'Rendimiento', count: 14, promedio: 83.7 },
              { nombre: 'Seguridad', count: 12, promedio: 79.8 }
            ],
            normas_populares: [
              { norma: 'ISO 25000', count: 15, promedio: 84.7 },
              { norma: 'IEEE 730', count: 5, promedio: 88.2 },
              { norma: 'CMMI', count: 2, promedio: 82.1 },
              { norma: 'ISO 9126', count: 1, promedio: 89.5 }
            ],
            empresas_top: [
              { empresa: 'DataSolutions Corp', evaluaciones: 5, promedio: 91.2 },
              { empresa: 'TechCorp S.A.S', evaluaciones: 4, promedio: 87.8 },
              { empresa: 'InnovaSoft Ltda', evaluaciones: 3, promedio: 83.5 },
              { empresa: 'CloudTech Solutions', evaluaciones: 3, promedio: 81.7 },
              { empresa: 'SecureApp Inc', evaluaciones: 2, promedio: 85.9 }
            ],
            tendencia_mensual: [
              { mes: 'Enero', evaluaciones: 3, promedio: 83.2 },
              { mes: 'Febrero', evaluaciones: 5, promedio: 84.1 },
              { mes: 'Marzo', evaluaciones: 6, promedio: 85.8 },
              { mes: 'Abril', evaluaciones: 4, promedio: 86.5 },
              { mes: 'Mayo', evaluaciones: 5, promedio: 87.2 }
            ]
          };

          setReportes(reportesData);
          setEstadisticas(estadisticasData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error cargando reportes:', error);
        setLoading(false);
      }
    };

    fetchReportesData();
  }, [selectedPeriod]);

  // Filtrar reportes
  const reportesFiltrados = reportes.filter(reporte => {
    const cumpleSearch = reporte.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        reporte.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const cumpleTipo = !filtroTipo || reporte.tipo === filtroTipo;
    
    return cumpleSearch && cumpleTipo;
  });

  const tiposUnicos = [...new Set(reportes.map(r => r.tipo))];

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'Mensual':
        return 'bg-blue-100 text-blue-800';
      case 'Por Norma':
        return 'bg-green-100 text-green-800';
      case 'Comparativo':
        return 'bg-purple-100 text-purple-800';
      case 'Tendencias':
        return 'bg-orange-100 text-orange-800';
      case 'Personalizado':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getColorCalificacion = (promedio) => {
    if (promedio >= 90) return 'text-green-600';
    if (promedio >= 80) return 'text-blue-600';
    if (promedio >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleDescargarReporte = (reporteId, archivoUrl) => {
    // Simular descarga
    console.log(`Descargando reporte ${reporteId} desde ${archivoUrl}`);
  };

  const handleVerReporte = (reporteId) => {
    navigate(`/evaluador/reporte/${reporteId}/detalle`);
  };

  const handleGenerarReporte = () => {
    navigate('/evaluador/generar-reporte');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando reportes...</p>
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
                Reportes y Análisis
              </h1>
              <p className="text-xl text-gray-600">
                Visualiza estadísticas y genera reportes de tus evaluaciones
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7">Últimos 7 días</option>
                <option value="30">Últimos 30 días</option>
                <option value="90">Últimos 3 meses</option>
                <option value="365">Último año</option>
              </select>
              <button
                onClick={handleGenerarReporte}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Generar Reporte</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navegación por pestañas */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'resumen', label: 'Resumen', icon: BarChart3 },
                { id: 'estadisticas', label: 'Estadísticas', icon: TrendingUp },
                { id: 'reportes', label: 'Reportes Generados', icon: FileText }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Tab Resumen */}
            {activeTab === 'resumen' && (
              <div className="space-y-8">
                {/* Estadísticas principales */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Total Evaluaciones</p>
                        <p className="text-3xl font-bold text-blue-900">{estadisticas.evaluaciones_totales}</p>
                      </div>
                      <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-600">Empresas Evaluadas</p>
                        <p className="text-3xl font-bold text-green-900">{estadisticas.empresas_evaluadas}</p>
                      </div>
                      <Building className="h-8 w-8 text-green-600" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-600">Promedio General</p>
                        <p className="text-3xl font-bold text-purple-900">{estadisticas.promedio_general}%</p>
                      </div>
                      <Award className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border-l-4 border-orange-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-orange-600">Tiempo Promedio</p>
                        <p className="text-3xl font-bold text-orange-900">{estadisticas.tiempo_promedio_evaluacion}</p>
                      </div>
                      <Clock className="h-8 w-8 text-orange-600" />
                    </div>
                  </div>
                </div>

                {/* Tendencia mensual */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                    Tendencia Mensual
                  </h3>
                  <div className="grid grid-cols-5 gap-4">
                    {estadisticas.tendencia_mensual?.map((mes, index) => (
                      <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-600 mb-2">{mes.mes}</div>
                        <div className="text-xl font-bold text-blue-600 mb-1">{mes.evaluaciones}</div>
                        <div className="text-xs text-gray-500">evaluaciones</div>
                        <div className={`text-sm font-medium mt-2 ${getColorCalificacion(mes.promedio)}`}>
                          {mes.promedio}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top empresas */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <Award className="h-5 w-5 text-green-600 mr-2" />
                    Empresas con Mejor Rendimiento
                  </h3>
                  <div className="space-y-4">
                    {estadisticas.empresas_top?.map((empresa, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-semibold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{empresa.empresa}</div>
                            <div className="text-sm text-gray-500">{empresa.evaluaciones} evaluaciones</div>
                          </div>
                        </div>
                        <div className={`text-lg font-bold ${getColorCalificacion(empresa.promedio)}`}>
                          {empresa.promedio}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab Estadísticas */}
            {activeTab === 'estadisticas' && (
              <div className="space-y-8">
                {/* Características más evaluadas */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <Target className="h-5 w-5 text-blue-600 mr-2" />
                    Características Más Evaluadas
                  </h3>
                  <div className="space-y-4">
                    {estadisticas.caracteristicas_mas_evaluadas?.map((caracteristica, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900">{caracteristica.nombre}</span>
                            <span className="text-sm text-gray-500">{caracteristica.count} evaluaciones</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(caracteristica.count / 20) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className={`ml-4 font-bold ${getColorCalificacion(caracteristica.promedio)}`}>
                          {caracteristica.promedio}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Normas más utilizadas */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <FileText className="h-5 w-5 text-green-600 mr-2" />
                    Normas Más Utilizadas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {estadisticas.normas_populares?.map((norma, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{norma.norma}</span>
                          <span className={`font-bold ${getColorCalificacion(norma.promedio)}`}>
                            {norma.promedio}%
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">{norma.count} evaluaciones realizadas</div>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-green-600 h-1.5 rounded-full" 
                            style={{ width: `${(norma.count / 15) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Estado de evaluaciones */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {estadisticas.evaluaciones_completadas}
                    </div>
                    <div className="text-sm text-green-700">Evaluaciones Completadas</div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                    <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-yellow-600 mb-2">
                      {estadisticas.evaluaciones_pendientes}
                    </div>
                    <div className="text-sm text-yellow-700">Evaluaciones Pendientes</div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                    <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {estadisticas.normas_utilizadas}
                    </div>
                    <div className="text-sm text-blue-700">Normas Utilizadas</div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Reportes Generados */}
            {activeTab === 'reportes' && (
              <div className="space-y-6">
                {/* Filtros de reportes */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Buscar reportes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <select
                      value={filtroTipo}
                      onChange={(e) => setFiltroTipo(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Todos los tipos</option>
                      {tiposUnicos.map(tipo => (
                        <option key={tipo} value={tipo}>{tipo}</option>
                      ))}
                    </select>
                  </div>
                  
                  <button
                    onClick={() => window.location.reload()}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Actualizar</span>
                  </button>
                </div>

                {/* Lista de reportes */}
                <div className="space-y-4">
                  {reportesFiltrados.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No se encontraron reportes
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Intenta ajustar los filtros o genera un nuevo reporte
                      </p>
                      <button
                        onClick={handleGenerarReporte}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Generar Reporte
                      </button>
                    </div>
                  ) : (
                    reportesFiltrados.map((reporte) => (
                      <div
                        key={reporte.id}
                        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {reporte.titulo}
                              </h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTipoColor(reporte.tipo)}`}>
                                {reporte.tipo}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 mb-4">{reporte.descripcion}</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div>
                                <div className="text-sm text-gray-500">Periodo</div>
                                <div className="font-medium text-gray-900">{reporte.periodo}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Evaluaciones</div>
                                <div className="font-medium text-gray-900">{reporte.evaluaciones_incluidas}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Empresas</div>
                                <div className="font-medium text-gray-900">{reporte.empresas_incluidas}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Promedio</div>
                                <div className={`font-bold ${getColorCalificacion(reporte.promedio_calificacion)}`}>
                                  {reporte.promedio_calificacion}%
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-sm text-gray-500">
                              Generado el {new Date(reporte.fecha_generacion).toLocaleDateString('es-ES')}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => handleVerReporte(reporte.id)}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                              title="Ver detalle"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDescargarReporte(reporte.id, reporte.archivo_url)}
                              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <Download className="h-4 w-4" />
                              <span>Descargar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluadorReportes;