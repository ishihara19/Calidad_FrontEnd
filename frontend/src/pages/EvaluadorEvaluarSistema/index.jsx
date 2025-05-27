// src/pages/EvaluadorEvaluarSistema/index.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  ArrowLeft,
  Save,
  Send,
  FileCheck,
  AlertCircle,
  CheckCircle,
  Book,
  Target,
  Star,
  MessageSquare,
  Clock,
  Calculator
} from 'lucide-react';

const EvaluadorEvaluarSistema = () => {
  const { sistemaId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const { empresaId, empresaNombre, sistema } = location.state || {};

  // Estados principales
  const [normaSeleccionada, setNormaSeleccionada] = useState('');
  const [normasDisponibles, setNormasDisponibles] = useState([]);
  const [caracteristicasNorma, setCaracteristicasNorma] = useState([]);
  const [evaluacionData, setEvaluacionData] = useState({
    evaluador: currentUser?.user?.id || '',
    sistema_id: sistemaId,
    empresa_id: empresaId,
    norma_id: '',
    observaciones_generales: '',
    calificaciones: [] // Array de { subcaracteristica_id, puntos, observacion }
  });
  const [loading, setLoading] = useState(false);
  const [loadingNorma, setLoadingNorma] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Cargar normas disponibles al montar el componente
  useEffect(() => {
    fetchNormasDisponibles();
  }, []);

  // Cargar características cuando se selecciona una norma
  useEffect(() => {
    if (normaSeleccionada) {
      fetchCaracteristicasNorma(normaSeleccionada);
    }
  }, [normaSeleccionada]);

  const fetchNormasDisponibles = async () => {
    try {
      // Simulación - reemplazar con llamada real a API
      // const response = await api.get('/api/normas/');
      
      const normasSimuladas = [
        { id: 1, nombre: 'ISO 25000 - Calidad del Producto de Software', descripcion: 'Estándar internacional para evaluación de calidad de software' },
        { id: 2, nombre: 'IEEE 730 - Aseguramiento de Calidad de Software', descripcion: 'Estándar IEEE para aseguramiento de calidad' },
        { id: 3, nombre: 'CMMI - Modelo de Madurez de Capacidad', descripcion: 'Modelo de mejora de procesos de desarrollo' }
      ];
      
      setNormasDisponibles(normasSimuladas);
    } catch (error) {
      console.error('Error cargando normas:', error);
      setError('Error al cargar las normas disponibles');
    }
  };

  const fetchCaracteristicasNorma = async (normaId) => {
    setLoadingNorma(true);
    try {
      // Simulación - reemplazar con llamada real a API
      // const response = await api.get(`/api/normas/${normaId}/`);
      
      const caracteristicasSimuladas = [
        {
          id: 1,
          nombre: 'Funcionalidad',
          descripcion: 'Capacidad del software para proporcionar funciones que satisfagan las necesidades',
          subcaracteristicas: [
            { id: 1, nombre: 'Idoneidad', descripcion: 'Capacidad para proporcionar un conjunto apropiado de funciones' },
            { id: 2, nombre: 'Exactitud', descripcion: 'Capacidad para proporcionar resultados correctos' },
            { id: 3, nombre: 'Interoperabilidad', descripcion: 'Capacidad para interactuar con otros sistemas' }
          ]
        },
        {
          id: 2,
          nombre: 'Confiabilidad',
          descripcion: 'Capacidad de mantener un nivel de rendimiento bajo condiciones establecidas',
          subcaracteristicas: [
            { id: 4, nombre: 'Madurez', descripcion: 'Capacidad para evitar fallas' },
            { id: 5, nombre: 'Tolerancia a fallos', descripcion: 'Capacidad para mantener funcionalidad ante fallas' },
            { id: 6, nombre: 'Recuperabilidad', descripcion: 'Capacidad para recuperarse ante fallas' }
          ]
        },
        {
          id: 3,
          nombre: 'Usabilidad',
          descripcion: 'Capacidad de ser entendido, aprendido y usado por usuarios específicos',
          subcaracteristicas: [
            { id: 7, nombre: 'Comprensibilidad', descripcion: 'Facilidad para entender el software' },
            { id: 8, nombre: 'Facilidad de aprendizaje', descripcion: 'Facilidad para aprender a usar el software' },
            { id: 9, nombre: 'Operabilidad', descripcion: 'Facilidad para operar y controlar el software' }
          ]
        }
      ];
      
      setCaracteristicasNorma(caracteristicasSimuladas);
      
      // Inicializar calificaciones vacías
      const calificacionesIniciales = [];
      caracteristicasSimuladas.forEach(caracteristica => {
        caracteristica.subcaracteristicas.forEach(sub => {
          calificacionesIniciales.push({
            subcaracteristica_id: sub.id,
            puntos: 0,
            observacion: ''
          });
        });
      });
      
      setEvaluacionData(prev => ({
        ...prev,
        norma_id: normaId,
        calificaciones: calificacionesIniciales
      }));
      
    } catch (error) {
      console.error('Error cargando características:', error);
      setError('Error al cargar las características de la norma');
    } finally {
      setLoadingNorma(false);
    }
  };

  const handleNormaChange = (normaId) => {
    setNormaSeleccionada(normaId);
    setError('');
  };

  const handleCalificacionChange = (subcaracteristicaId, field, value) => {
    setEvaluacionData(prev => ({
      ...prev,
      calificaciones: prev.calificaciones.map(cal => 
        cal.subcaracteristica_id === subcaracteristicaId 
          ? { ...cal, [field]: value }
          : cal
      )
    }));
  };

  const calcularPromedioGeneral = () => {
    const calificaciones = evaluacionData.calificaciones;
    if (calificaciones.length === 0) return 0;
    
    const suma = calificaciones.reduce((acc, cal) => acc + cal.puntos, 0);
    const maximo = calificaciones.length * 3; // Máximo 3 puntos por subcaracterística
    return ((suma / maximo) * 100).toFixed(1);
  };

  const validarEvaluacion = () => {
    if (!normaSeleccionada) {
      setError('Debe seleccionar una norma para la evaluación');
      return false;
    }

    const calificacionesSinCompletar = evaluacionData.calificaciones.filter(cal => 
      cal.puntos === 0 && !cal.observacion.trim()
    );

    if (calificacionesSinCompletar.length > 0) {
      setError('Debe calificar todas las subcaracterísticas o agregar observaciones');
      return false;
    }

    return true;
  };

  const guardarBorrador = async () => {
    if (!normaSeleccionada) {
      setError('Debe seleccionar una norma antes de guardar');
      return;
    }

    setLoading(true);
    try {
      // Llamada a API para guardar borrador
      // const response = await api.post('/api/evaluaciones/borrador/', evaluacionData);
      
      console.log('Guardando borrador:', evaluacionData);
      
      // Simulación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
    } catch (error) {
      console.error('Error guardando borrador:', error);
      setError('Error al guardar el borrador');
    } finally {
      setLoading(false);
    }
  };

  const enviarEvaluacion = async () => {
    if (!validarEvaluacion()) return;

    setLoading(true);
    try {
      // Llamada a API para enviar evaluación final
      // const response = await api.post('/api/evaluaciones/', evaluacionData);
      
      console.log('Enviando evaluación final:', evaluacionData);
      
      // Simulación
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redireccionar a lista de evaluaciones
      navigate('/evaluador/evaluaciones', {
        state: { message: 'Evaluación enviada exitosamente' }
      });
      
    } catch (error) {
      console.error('Error enviando evaluación:', error);
      setError('Error al enviar la evaluación');
    } finally {
      setLoading(false);
    }
  };

  const getColorPuntuacion = (puntos) => {
    switch (puntos) {
      case 0: return 'bg-gray-100 text-gray-800';
      case 1: return 'bg-red-100 text-red-800';
      case 2: return 'bg-yellow-100 text-yellow-800';
      case 3: return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPuntuacionTexto = (puntos) => {
    switch (puntos) {
      case 0: return 'Sin calificar';
      case 1: return 'No cumple';
      case 2: return 'Parcialmente';
      case 3: return 'Cumple totalmente';
      default: return 'Sin calificar';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Navegación */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver</span>
          </button>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FileCheck className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Evaluar Sistema: {sistema?.nombre || 'Sistema'}
              </h1>
              <p className="text-gray-600">
                Empresa: {empresaNombre} • Evaluador: {currentUser?.user?.nombre}
              </p>
            </div>
          </div>
        </div>

        {/* Alertas */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-green-700">Borrador guardado exitosamente</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Panel Principal de Evaluación */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Selección de Norma */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Book className="h-6 w-6 mr-2 text-blue-600" />
                Seleccionar Norma de Evaluación
              </h2>
              
              <div className="space-y-4">
                {normasDisponibles.map(norma => (
                  <div 
                    key={norma.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      normaSeleccionada == norma.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleNormaChange(norma.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="norma"
                        value={norma.id}
                        checked={normaSeleccionada == norma.id}
                        onChange={() => handleNormaChange(norma.id)}
                        className="text-blue-600"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{norma.nombre}</h3>
                        <p className="text-sm text-gray-600">{norma.descripcion}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Características y Evaluación */}
            {normaSeleccionada && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Target className="h-6 w-6 mr-2 text-green-600" />
                  Evaluación por Características
                </h2>

                {loadingNorma ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="ml-2 text-gray-600">Cargando características...</span>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {caracteristicasNorma.map(caracteristica => (
                      <div key={caracteristica.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {caracteristica.nombre}
                          </h3>
                          <p className="text-gray-600">{caracteristica.descripcion}</p>
                        </div>

                        <div className="space-y-6">
                          {caracteristica.subcaracteristicas.map(subcaract => {
                            const calificacion = evaluacionData.calificaciones.find(
                              cal => cal.subcaracteristica_id === subcaract.id
                            );

                            return (
                              <div key={subcaract.id} className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-4">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                      {subcaract.nombre}
                                    </h4>
                                    <p className="text-sm text-gray-600 mb-4">
                                      {subcaract.descripcion}
                                    </p>
                                  </div>
                                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getColorPuntuacion(calificacion?.puntos || 0)}`}>
                                    {getPuntuacionTexto(calificacion?.puntos || 0)}
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {/* Calificación */}
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Calificación (0-3 puntos)
                                    </label>
                                    <div className="flex space-x-2">
                                      {[0, 1, 2, 3].map(punto => (
                                        <button
                                          key={punto}
                                          type="button"
                                          onClick={() => handleCalificacionChange(subcaract.id, 'puntos', punto)}
                                          className={`flex items-center justify-center w-12 h-10 rounded-lg border-2 transition-all ${
                                            calificacion?.puntos === punto
                                              ? 'border-blue-500 bg-blue-100 text-blue-700'
                                              : 'border-gray-300 hover:border-gray-400'
                                          }`}
                                        >
                                          {punto === 0 ? (
                                            <span className="text-xs">N/A</span>
                                          ) : (
                                            <div className="flex">
                                              {[...Array(punto)].map((_, i) => (
                                                <Star key={i} className="h-3 w-3 fill-current" />
                                              ))}
                                            </div>
                                          )}
                                        </button>
                                      ))}
                                    </div>
                                    <div className="mt-1 text-xs text-gray-500">
                                      0: No aplica • 1: No cumple • 2: Parcial • 3: Cumple
                                    </div>
                                  </div>

                                  {/* Observaciones */}
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Observaciones
                                    </label>
                                    <textarea
                                      value={calificacion?.observacion || ''}
                                      onChange={(e) => handleCalificacionChange(subcaract.id, 'observacion', e.target.value)}
                                      rows={3}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="Comentarios sobre esta subcaracterística..."
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Observaciones Generales */}
            {normaSeleccionada && !loadingNorma && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <MessageSquare className="h-6 w-6 mr-2 text-purple-600" />
                  Observaciones Generales
                </h2>
                
                <textarea
                  value={evaluacionData.observaciones_generales}
                  onChange={(e) => setEvaluacionData(prev => ({
                    ...prev,
                    observaciones_generales: e.target.value
                  }))}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Comentarios generales sobre el sistema evaluado, recomendaciones, aspectos destacables, áreas de mejora, etc."
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Resumen de Evaluación */}
            {normaSeleccionada && !loadingNorma && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-orange-600" />
                  Resumen
                </h3>
                
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {calcularPromedioGeneral()}%
                    </div>
                    <div className="text-sm text-gray-600">Calificación General</div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total características:</span>
                      <span className="font-medium">{caracteristicasNorma.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subcaracterísticas:</span>
                      <span className="font-medium">
                        {caracteristicasNorma.reduce((acc, car) => acc + car.subcaracteristicas.length, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Evaluadas:</span>
                      <span className="font-medium">
                        {evaluacionData.calificaciones.filter(cal => cal.puntos > 0).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Información del Sistema */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Información del Sistema
              </h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Sistema:</span>
                  <p className="font-medium">{sistema?.nombre || 'No disponible'}</p>
                </div>
                <div>
                  <span className="text-gray-600">Empresa:</span>
                  <p className="font-medium">{empresaNombre}</p>
                </div>
                <div>
                  <span className="text-gray-600">Evaluador:</span>
                  <p className="font-medium">{currentUser?.user?.nombre}</p>
                </div>
                <div>
                  <span className="text-gray-600">Fecha:</span>
                  <p className="font-medium">{new Date().toLocaleDateString('es-ES')}</p>
                </div>
              </div>
            </div>

            {/* Acciones */}
            {normaSeleccionada && !loadingNorma && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Acciones
                </h3>
                
                <div className="space-y-3">
                  <button
                    onClick={guardarBorrador}
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                    <span>Guardar Borrador</span>
                  </button>
                  
                  <button
                    onClick={enviarEvaluacion}
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    <span>
                      {loading ? 'Enviando...' : 'Enviar Evaluación'}
                    </span>
                  </button>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1 mb-1">
                    <Clock className="h-3 w-3" />
                    <span>El borrador se guarda automáticamente</span>
                  </div>
                  <p>Una vez enviada, la evaluación no podrá ser modificada.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluadorEvaluarSistema;