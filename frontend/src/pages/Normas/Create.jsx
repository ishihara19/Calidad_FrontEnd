import { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  AlertCircle, 
  CheckCircle, 
  Save,
  ArrowLeft,
  Book,
  Target,
  Users
} from 'lucide-react';

const CrearNorma = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const [normaData, setNormaData] = useState({
    nombre: '',
    descripcion: '',
    version: '',
    tipo: '',
    estado: 'activa',
    fecha_creacion: new Date().toISOString().split('T')[0],
    caracteristicas: [
      {
        id: Date.now(),
        nombre: '',
        descripcion: '',
        peso: 0,
        subcaracteristicas: [
          {
            id: Date.now() + 1,
            nombre: '',
            descripcion: '',
            peso: 0,
            metricas: [
              {
                id: Date.now() + 2,
                nombre: '',
                descripcion: '',
                tipo_medicion: 'porcentaje',
                valor_minimo: 0,
                valor_maximo: 100,
                peso: 0
              }
            ]
          }
        ]
      }
    ]
  });

  const tiposNorma = [
    { value: 'ISO-25000', label: 'ISO 25000 - Calidad del Producto de Software' },
    { value: 'IEEE-730', label: 'IEEE 730 - Aseguramiento de Calidad de Software' },
    { value: 'ISO-9126', label: 'ISO 9126 - Modelo de Calidad de Software' },
    { value: 'CMMI', label: 'CMMI - Modelo de Madurez de Capacidad' },
    { value: 'personalizada', label: 'Norma Personalizada' }
  ];

  const tiposMedicion = [
    { value: 'porcentaje', label: 'Porcentaje (%)' },
    { value: 'numero', label: 'Número entero' },
    { value: 'decimal', label: 'Número decimal' },
    { value: 'tiempo', label: 'Tiempo (minutos)' },
    { value: 'boolean', label: 'Sí/No' }
  ];

  // Funciones para manejar características
  const addCaracteristica = () => {
    const newCaracteristica = {
      id: Date.now(),
      nombre: '',
      descripcion: '',
      peso: 0,
      subcaracteristicas: [
        {
          id: Date.now() + 1,
          nombre: '',
          descripcion: '',
          peso: 0,
          metricas: [
            {
              id: Date.now() + 2,
              nombre: '',
              descripcion: '',
              tipo_medicion: 'porcentaje',
              valor_minimo: 0,
              valor_maximo: 100,
              peso: 0
            }
          ]
        }
      ]
    };
    setNormaData(prev => ({
      ...prev,
      caracteristicas: [...prev.caracteristicas, newCaracteristica]
    }));
  };

  const removeCaracteristica = (caracteristicaId) => {
    setNormaData(prev => ({
      ...prev,
      caracteristicas: prev.caracteristicas.filter(c => c.id !== caracteristicaId)
    }));
  };

  const updateCaracteristica = (caracteristicaId, field, value) => {
    setNormaData(prev => ({
      ...prev,
      caracteristicas: prev.caracteristicas.map(c => 
        c.id === caracteristicaId ? { ...c, [field]: value } : c
      )
    }));
  };

  // Funciones para manejar subcaracterísticas
  const addSubcaracteristica = (caracteristicaId) => {
    const newSubcaracteristica = {
      id: Date.now(),
      nombre: '',
      descripcion: '',
      peso: 0,
      metricas: [
        {
          id: Date.now() + 1,
          nombre: '',
          descripcion: '',
          tipo_medicion: 'porcentaje',
          valor_minimo: 0,
          valor_maximo: 100,
          peso: 0
        }
      ]
    };
    
    setNormaData(prev => ({
      ...prev,
      caracteristicas: prev.caracteristicas.map(c => 
        c.id === caracteristicaId 
          ? { ...c, subcaracteristicas: [...c.subcaracteristicas, newSubcaracteristica] }
          : c
      )
    }));
  };

  const removeSubcaracteristica = (caracteristicaId, subcaracteristicaId) => {
    setNormaData(prev => ({
      ...prev,
      caracteristicas: prev.caracteristicas.map(c => 
        c.id === caracteristicaId 
          ? { ...c, subcaracteristicas: c.subcaracteristicas.filter(s => s.id !== subcaracteristicaId) }
          : c
      )
    }));
  };

  const updateSubcaracteristica = (caracteristicaId, subcaracteristicaId, field, value) => {
    setNormaData(prev => ({
      ...prev,
      caracteristicas: prev.caracteristicas.map(c => 
        c.id === caracteristicaId 
          ? {
              ...c, 
              subcaracteristicas: c.subcaracteristicas.map(s => 
                s.id === subcaracteristicaId ? { ...s, [field]: value } : s
              )
            }
          : c
      )
    }));
  };

  // Funciones para manejar métricas
  const addMetrica = (caracteristicaId, subcaracteristicaId) => {
    const newMetrica = {
      id: Date.now(),
      nombre: '',
      descripcion: '',
      tipo_medicion: 'porcentaje',
      valor_minimo: 0,
      valor_maximo: 100,
      peso: 0
    };
    
    setNormaData(prev => ({
      ...prev,
      caracteristicas: prev.caracteristicas.map(c => 
        c.id === caracteristicaId 
          ? {
              ...c, 
              subcaracteristicas: c.subcaracteristicas.map(s => 
                s.id === subcaracteristicaId 
                  ? { ...s, metricas: [...s.metricas, newMetrica] }
                  : s
              )
            }
          : c
      )
    }));
  };

  const removeMetrica = (caracteristicaId, subcaracteristicaId, metricaId) => {
    setNormaData(prev => ({
      ...prev,
      caracteristicas: prev.caracteristicas.map(c => 
        c.id === caracteristicaId 
          ? {
              ...c, 
              subcaracteristicas: c.subcaracteristicas.map(s => 
                s.id === subcaracteristicaId 
                  ? { ...s, metricas: s.metricas.filter(m => m.id !== metricaId) }
                  : s
              )
            }
          : c
      )
    }));
  };

  const updateMetrica = (caracteristicaId, subcaracteristicaId, metricaId, field, value) => {
    setNormaData(prev => ({
      ...prev,
      caracteristicas: prev.caracteristicas.map(c => 
        c.id === caracteristicaId 
          ? {
              ...c, 
              subcaracteristicas: c.subcaracteristicas.map(s => 
                s.id === subcaracteristicaId 
                  ? {
                      ...s, 
                      metricas: s.metricas.map(m => 
                        m.id === metricaId ? { ...m, [field]: value } : m
                      )
                    }
                  : s
              )
            }
          : c
      )
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!normaData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    
    if (!normaData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida';
    }
    
    if (!normaData.version.trim()) {
      newErrors.version = 'La versión es requerida';
    }
    
    if (!normaData.tipo) {
      newErrors.tipo = 'El tipo de norma es requerido';
    }

    // Validar que la suma de pesos de características sea 100
    const totalPesoCaracteristicas = normaData.caracteristicas.reduce((sum, c) => sum + parseFloat(c.peso || 0), 0);
    if (Math.abs(totalPesoCaracteristicas - 100) > 0.01) {
      newErrors.pesoCaracteristicas = 'La suma de pesos de las características debe ser 100%';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Aquí iría la llamada a la API para crear la norma
      console.log('Datos de la norma:', normaData);
      
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      setTimeout(() => {
        console.log('Navegando de vuelta a normas...');
      }, 2000);
      
    } catch (error) {
      console.error('Error al crear la norma:', error);
      setErrors({ submit: 'Error al crear la norma. Inténtalo de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    console.log('Volviendo a la lista de normas...');
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Norma Creada!</h2>
          <p className="text-gray-600 mb-4">La norma se ha creado exitosamente.</p>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleGoBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Volver a Normas</span>
          </button>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Book className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Crear Nueva Norma</h1>
              <p className="text-xl text-gray-600">Define una nueva norma de evaluación de software</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Información básica */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <span>Información Básica</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la Norma *
                </label>
                <input
                  type="text"
                  value={normaData.nombre}
                  onChange={(e) => setNormaData(prev => ({ ...prev, nombre: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: ISO 25000 - Calidad del Software"
                />
                {errors.nombre && (
                  <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.nombre}</span>
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Versión *
                </label>
                <input
                  type="text"
                  value={normaData.version}
                  onChange={(e) => setNormaData(prev => ({ ...prev, version: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: 1.0.0"
                />
                {errors.version && (
                  <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.version}</span>
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Norma *
                </label>
                <select
                  value={normaData.tipo}
                  onChange={(e) => setNormaData(prev => ({ ...prev, tipo: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Seleccionar tipo</option>
                  {tiposNorma.map(tipo => (
                    <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                  ))}
                </select>
                {errors.tipo && (
                  <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.tipo}</span>
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  value={normaData.estado}
                  onChange={(e) => setNormaData(prev => ({ ...prev, estado: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="activa">Activa</option>
                  <option value="borrador">Borrador</option>
                  <option value="inactiva">Inactiva</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                value={normaData.descripcion}
                onChange={(e) => setNormaData(prev => ({ ...prev, descripcion: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe el propósito y alcance de esta norma..."
              />
              {errors.descripcion && (
                <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.descripcion}</span>
                </p>
              )}
            </div>
          </div>

          {/* Características */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <Target className="h-6 w-6 text-blue-600" />
                <span>Características de Evaluación</span>
              </h2>
              <button
                type="button"
                onClick={addCaracteristica}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Agregar Característica</span>
              </button>
            </div>

            {errors.pesoCaracteristicas && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.pesoCaracteristicas}</span>
                </p>
              </div>
            )}

            <div className="space-y-6">
              {normaData.caracteristicas.map((caracteristica, caractIndex) => (
                <div key={caracteristica.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Característica {caractIndex + 1}
                    </h3>
                    {normaData.caracteristicas.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCaracteristica(caracteristica.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de la Característica
                      </label>
                      <input
                        type="text"
                        value={caracteristica.nombre}
                        onChange={(e) => updateCaracteristica(caracteristica.id, 'nombre', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ej: Funcionalidad"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Peso (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={caracteristica.peso}
                        onChange={(e) => updateCaracteristica(caracteristica.id, 'peso', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción
                    </label>
                    <textarea
                      value={caracteristica.descripcion}
                      onChange={(e) => updateCaracteristica(caracteristica.id, 'descripcion', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe esta característica..."
                    />
                  </div>

                  {/* Subcaracterísticas */}
                  <div className="ml-4 border-l-2 border-gray-200 pl-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-md font-medium text-gray-800">Subcaracterísticas</h4>
                      <button
                        type="button"
                        onClick={() => addSubcaracteristica(caracteristica.id)}
                        className="text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                      >
                        + Subcaracterística
                      </button>
                    </div>

                    {caracteristica.subcaracteristicas.map((subcaract, subIndex) => (
                      <div key={subcaract.id} className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-700">
                            Subcaracterística {subIndex + 1}
                          </span>
                          {caracteristica.subcaracteristicas.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSubcaracteristica(caracteristica.id, subcaract.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                          <div className="md:col-span-2">
                            <input
                              type="text"
                              value={subcaract.nombre}
                              onChange={(e) => updateSubcaracteristica(caracteristica.id, subcaract.id, 'nombre', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              placeholder="Nombre de subcaracterística"
                            />
                          </div>
                          <div>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.1"
                              value={subcaract.peso}
                              onChange={(e) => updateSubcaracteristica(caracteristica.id, subcaract.id, 'peso', parseFloat(e.target.value) || 0)}
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              placeholder="Peso %"
                            />
                          </div>
                        </div>
                        
                        <textarea
                          value={subcaract.descripcion}
                          onChange={(e) => updateSubcaracteristica(caracteristica.id, subcaract.id, 'descripcion', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm mb-3"
                          placeholder="Descripción de la subcaracterística"
                        />

                        {/* Métricas */}
                        <div className="ml-3 border-l border-gray-300 pl-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-gray-600">Métricas</span>
                            <button
                              type="button"
                              onClick={() => addMetrica(caracteristica.id, subcaract.id)}
                              className="text-xs px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                            >
                              + Métrica
                            </button>
                          </div>

                          {subcaract.metricas.map((metrica, metIndex) => (
                            <div key={metrica.id} className="mb-3 p-2 bg-white rounded border">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-500">Métrica {metIndex + 1}</span>
                                {subcaract.metricas.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeMetrica(caracteristica.id, subcaract.id, metrica.id)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                )}
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                                <input
                                  type="text"
                                  value={metrica.nombre}
                                  onChange={(e) => updateMetrica(caracteristica.id, subcaract.id, metrica.id, 'nombre', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                  placeholder="Nombre de métrica"
                                />
                                <select
                                  value={metrica.tipo_medicion}
                                  onChange={(e) => updateMetrica(caracteristica.id, subcaract.id, metrica.id, 'tipo_medicion', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                >
                                  {tiposMedicion.map(tipo => (
                                    <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                                  ))}
                                </select>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-2 mb-2">
                                <input
                                  type="number"
                                  value={metrica.valor_minimo}
                                  onChange={(e) => updateMetrica(caracteristica.id, subcaract.id, metrica.id, 'valor_minimo', parseFloat(e.target.value) || 0)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                  placeholder="Min"
                                />
                                <input
                                  type="number"
                                  value={metrica.valor_maximo}
                                  onChange={(e) => updateMetrica(caracteristica.id, subcaract.id, metrica.id, 'valor_maximo', parseFloat(e.target.value) || 0)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                  placeholder="Max"
                                />
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  step="0.1"
                                  value={metrica.peso}
                                  onChange={(e) => updateMetrica(caracteristica.id, subcaract.id, metrica.id, 'peso', parseFloat(e.target.value) || 0)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                  placeholder="Peso %"
                                />
                              </div>
                              
                              <textarea
                                value={metrica.descripcion}
                                onChange={(e) => updateMetrica(caracteristica.id, subcaract.id, metrica.id, 'descripcion', e.target.value)}
                                rows={1}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                placeholder="Descripción de la métrica"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Error de envío */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm flex items-center space-x-1">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.submit}</span>
              </p>
            </div>
          )}

        
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleGoBack}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="inline h-5 w-5 mr-2" />
              Volver
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Save className="h-5 w-5" />
              <span>{loading ? 'Guardando...' : 'Guardar Norma'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearNorma;
