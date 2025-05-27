import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Plus,
  Save,
  FileText,
  Edit3,
  Trash2,
  Eye,
  Search,
} from 'lucide-react';

// Constantes para dropdowns y descripciones
const PROBABILIDAD_LEVELS = [
  { value: 1, label: 'Raro', description: 'Muy improbable que ocurra' },
  { value: 2, label: 'Improbable', description: 'Poco probable que ocurra' },
  { value: 3, label: 'Posible', description: 'Podría ocurrir' },
  { value: 4, label: 'Probable', description: 'Probablemente ocurrirá' },
  { value: 5, label: 'Casi Seguro', description: 'Casi seguro que ocurrirá' },
];

const IMPACTO_LEVELS = [
  { value: 1, label: 'Insignificante', description: 'No hay interrupción en las operaciones' },
  { value: 2, label: 'Menor', description: 'Interrupción por algunas horas' },
  { value: 3, label: 'Moderado', description: 'Interrupción por un día' },
  { value: 4, label: 'Mayor', description: 'Interrupción por más de dos días' },
  { value: 5, label: 'Catastrófico', description: 'Interrupción por más de cinco días' },
];

const FACTORES_CAUSA = [
  'Información', 'Método', 'Personas', 'Sistemas de información', 'Infraestructura',
];

const TIPOS_CONTROL = ['Preventivo', 'Correctivo', 'Detectivo'];

const TIPOS_RIESGO = ['Operativo', 'Estratégico', 'Financiero', 'Cumplimiento', 'Tecnológico'];

// Función para calcular zona de riesgo (igual que backend)
const calcularZonaRiesgo = (probabilidad, impacto) => {
  const valor = probabilidad * impacto;
  if (valor >= 15) return { nivel: 'EXTREMA', color: 'bg-red-600', valor };
  if (valor >= 10) return { nivel: 'ALTA', color: 'bg-red-400', valor };
  if (valor >= 6) return { nivel: 'MODERADA', color: 'bg-yellow-400', valor };
  if (valor >= 3) return { nivel: 'BAJA', color: 'bg-green-400', valor };
  return { nivel: 'MUY BAJA', color: 'bg-green-600', valor };
};

const API_BASE_URL = 'http://localhost:8000/api'; // Cambia por la URL real de tu backend

const initialRiskState = {
  numero: 1,
  fecha: new Date().toISOString().split('T')[0],
  codigo: '',
  nombre: '',
  descripcion: '',
  causas: [{ causa: '', factor: '', controles: '' }],
  efectos: '',
  tipo_riesgo: '',
  probabilidad: 1,
  impacto: 1,
  controles_existentes: '',
  tipo_control: 'Preventivo',
  efectividad_control: 0,
  controles_evaluacion: {
    herramienta: false,
    manuales: false,
    efectividad: false,
    responsables: false,
    frecuencia: false,
  },
  tratamiento: '',
  responsable_control: '',
  aceptado: false,
};

const RiskMatrixApp = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'create', 'edit', 'view'
  const [matrices, setMatrices] = useState([]);
  const [currentMatrix, setCurrentMatrix] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRiskLevel, setFilterRiskLevel] = useState('');

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    responsable: '',
    fecha_creacion: new Date().toISOString().split('T')[0],
    riesgos: [],
  });

  const [currentRisk, setCurrentRisk] = useState({ ...initialRiskState });

  // Carga lista matrices desde backend al montar componente
  useEffect(() => {
    cargarMatrices();
  }, []);

  const cargarMatrices = () => {
    axios.get(`${API_BASE_URL}/matrices/`)
      .then(res => setMatrices(res.data))
      .catch(err => alert('Error cargando matrices: ' + err.message));
  };

  // Guardar matriz (crear o actualizar)
  const handleSaveMatrix = () => {
    if (!formData.nombre.trim()) {
      alert('El nombre de la matriz es obligatorio');
      return;
    }

    // Ajustamos datos a enviar según serializers (nombres con guion bajo)
    const dataToSend = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      responsable: formData.responsable,
      fecha_creacion: formData.fecha_creacion,
      riesgos: formData.riesgos.map((r, idx) => ({
        id: r.id, // si existe id para actualización
        numero: idx + 1,
        fecha: r.fecha,
        codigo: r.codigo,
        nombre: r.nombre,
        descripcion: r.descripcion,
        causas: r.causas.map(c => ({
          id: c.id, // si existe
          causa: c.causa,
          factor: c.factor,
          controles: c.controles,
          orden: c.orden || 1,
        })),
        efectos: r.efectos,
        tipo_riesgo: r.tipo_riesgo,
        probabilidad: r.probabilidad,
        impacto: r.impacto,
        controles_existentes: r.controles_existentes,
        tipo_control: r.tipo_control,
        efectividad_control: r.efectividad_control,
        controles_evaluacion: r.controles_evaluacion,
        tratamiento: r.tratamiento,
        responsable_control: r.responsable_control,
        aceptado: r.aceptado,
      })),
    };

    if (currentMatrix && currentMatrix.id) {
      // Actualizar matriz
      axios.put(`${API_BASE_URL}/matrices/${currentMatrix.id}/`, dataToSend)
        .then(res => {
          setMatrices(prev => prev.map(m => m.id === currentMatrix.id ? res.data : m));
          resetForm();
          setCurrentView('list');
          setCurrentMatrix(null);
        })
        .catch(err => alert('Error actualizando matriz: ' + err.message));
    } else {
      // Crear matriz
      axios.post(`${API_BASE_URL}/matrices/`, dataToSend)
        .then(res => {
          setMatrices(prev => [...prev, res.data]);
          resetForm();
          setCurrentView('list');
        })
        .catch(err => alert('Error creando matriz: ' + err.message));
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      responsable: '',
      fecha_creacion: new Date().toISOString().split('T')[0],
      riesgos: [],
    });
    setCurrentRisk({ ...initialRiskState });
  };

  // Eliminar matriz
  const handleDeleteMatrix = (id) => {
    if (window.confirm('¿Está seguro de eliminar esta matriz?')) {
      axios.delete(`${API_BASE_URL}/matrices/${id}/`)
        .then(() => setMatrices(prev => prev.filter(m => m.id !== id)))
        .catch(err => alert('Error eliminando matriz: ' + err.message));
    }
  };

  // Ver detalles matriz
  const handleViewMatrix = (id) => {
    axios.get(`${API_BASE_URL}/matrices/${id}/`)
      .then(res => {
        setCurrentMatrix(res.data);
        setCurrentView('view');
      })
      .catch(err => alert('Error cargando matriz: ' + err.message));
  };

  // Editar matriz (carga datos en formulario)
  const handleEditMatrix = (matrix) => {
    // Mapea propiedades backend -> frontend para riesgos y causas
    const riesgosAdaptados = (matrix.riesgos || []).map(r => ({
      id: r.id,
      numero: r.numero,
      fecha: r.fecha,
      codigo: r.codigo,
      nombre: r.nombre,
      descripcion: r.descripcion,
      causas: (r.causas || []).map(c => ({
        id: c.id,
        causa: c.causa,
        factor: c.factor,
        controles: c.controles,
        orden: c.orden,
      })),
      efectos: r.efectos,
      tipo_riesgo: r.tipo_riesgo,
      probabilidad: r.probabilidad,
      impacto: r.impacto,
      controles_existentes: r.controles_existentes,
      tipo_control: r.tipo_control,
      efectividad_control: r.efectividad_control,
      controles_evaluacion: r.controles_evaluacion,
      tratamiento: r.tratamiento,
      responsable_control: r.responsable_control,
      aceptado: r.aceptado,
    }));

    setCurrentMatrix(matrix);
    setFormData({
      nombre: matrix.nombre,
      descripcion: matrix.descripcion,
      responsable: matrix.responsable,
      fecha_creacion: matrix.fecha_creacion,
      riesgos: riesgosAdaptados,
    });
    setCurrentView('edit');
  };

  // Agregar riesgo nuevo al formulario
  const handleAddRisk = () => {
    if (!currentRisk.nombre.trim()) {
      alert('El nombre del riesgo es obligatorio');
      return;
    }

    const nuevoRiesgo = {
      ...currentRisk,
      numero: formData.riesgos.length + 1,
      causas: currentRisk.causas.map((c, i) => ({ ...c, orden: i + 1 })),
    };

    setFormData(prev => ({
      ...prev,
      riesgos: [...prev.riesgos, nuevoRiesgo],
    }));

    setCurrentRisk({ ...initialRiskState, numero: formData.riesgos.length + 2 });
  };

  // Eliminar riesgo de matriz en formulario
  const handleRemoveRisk = (index) => {
    const nuevosRiesgos = [...formData.riesgos];
    nuevosRiesgos.splice(index, 1);
    // Reenumerar
    nuevosRiesgos.forEach((r, i) => (r.numero = i + 1));
    setFormData(prev => ({ ...prev, riesgos: nuevosRiesgos }));
  };

  // Agregar causa al riesgo actual
  const handleAddCausa = () => {
    setCurrentRisk(prev => ({
      ...prev,
      causas: [...prev.causas, { causa: '', factor: '', controles: '', orden: prev.causas.length + 1 }],
    }));
  };

  // Eliminar causa del riesgo actual
  const handleRemoveCausa = (index) => {
    const nuevasCausas = [...currentRisk.causas];
    nuevasCausas.splice(index, 1);
    // Reenumerar
    nuevasCausas.forEach((c, i) => (c.orden = i + 1));
    setCurrentRisk(prev => ({ ...prev, causas: nuevasCausas }));
  };

  // Filtrado matrices para lista
  const filteredMatrices = matrices.filter(matrix => {
    const matchesSearch = matrix.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      matrix.descripcion.toLowerCase().includes(searchTerm.toLowerCase());

    if (!filterRiskLevel) return matchesSearch;

    return matrix.riesgos?.some(r => r.zona_riesgo?.nivel === filterRiskLevel);
  });

  // --- Vistas ---

  if (currentView === 'list') {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestión de Matrices de Riesgos</h1>
              <p className="text-gray-600">Administre y consulte las matrices de riesgos de su organización</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setCurrentView('create');
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Nueva Matriz
            </button>
          </div>

          {/* Filtros */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar matrices..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={filterRiskLevel}
              onChange={e => setFilterRiskLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los niveles de riesgo</option>
              <option value="EXTREMA">Extrema</option>
              <option value="ALTA">Alta</option>
              <option value="MODERADA">Moderada</option>
              <option value="BAJA">Baja</option>
              <option value="MUY BAJA">Muy Baja</option>
            </select>
          </div>

          {/* Lista de matrices */}
          <div className="grid gap-6">
            {filteredMatrices.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay matrices disponibles</h3>
                <p className="text-gray-600 mb-4">Comience creando su primera matriz de riesgos</p>
                <button
                  onClick={() => {
                    resetForm();
                    setCurrentView('create');
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Crear Primera Matriz
                </button>
              </div>
            ) : (
              filteredMatrices.map(matrix => (
                <div key={matrix.id} className="bg-white rounded-lg shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{matrix.nombre}</h3>
                    <p className="text-gray-600 mt-1">{matrix.descripcion}</p>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                      <span>Responsable: {matrix.responsable}</span>
                      <span>Riesgos: {matrix.riesgos?.length || 0}</span>
                      <span>Creado: {new Date(matrix.fecha_creacion).toLocaleDateString()}</span>
                      {matrix.fecha_modificacion && (
                        <span>Modificado: {new Date(matrix.fecha_modificacion).toLocaleDateString()}</span>
                      )}
                    </div>

                    {/* Resumen por nivel */}
                    {matrix.riesgos?.length > 0 && (
                      <div className="flex gap-2 mt-3 text-sm">
                        {['EXTREMA', 'ALTA', 'MODERADA', 'BAJA', 'MUY BAJA'].map(nivel => {
                          const count = matrix.riesgos.filter(r => r.zona_riesgo?.nivel === nivel).length;
                          if (count === 0) return null;
                          const colors = {
                            'EXTREMA': 'bg-red-600 text-white',
                            'ALTA': 'bg-red-400 text-white',
                            'MODERADA': 'bg-yellow-400 text-black',
                            'BAJA': 'bg-green-400 text-black',
                            'MUY BAJA': 'bg-green-600 text-white',
                          };
                          return (
                            <span key={nivel} className={`px-2 py-1 rounded text-xs font-medium ${colors[nivel]}`}>
                              {nivel}: {count}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewMatrix(matrix.id)}
                      className="flex items-center gap-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye size={16} /> Ver
                    </button>
                    <button
                      onClick={() => handleEditMatrix(matrix)}
                      className="flex items-center gap-1 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <Edit3 size={16} /> Editar
                    </button>
                    <button
                      onClick={() => handleDeleteMatrix(matrix.id)}
                      className="flex items-center gap-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} /> Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'create' || currentView === 'edit') {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {currentView === 'create' ? 'Nueva Matriz de Riesgos' : 'Editar Matriz de Riesgos'}
              </h1>
              <p className="text-gray-600">Complete la información básica y agregue los riesgos identificados</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  resetForm();
                  setCurrentView('list');
                  setCurrentMatrix(null);
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveMatrix}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save size={20} />
                Guardar Matriz
              </button>
            </div>
          </div>

          {/* Información básica */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Matriz *</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={e => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: Matriz de Riesgos TI 2024"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Responsable</label>
              <input
                type="text"
                value={formData.responsable}
                onChange={e => setFormData(prev => ({ ...prev, responsable: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nombre del responsable"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
              <textarea
                value={formData.descripcion}
                onChange={e => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Descripción del alcance y propósito de la matriz"
              />
            </div>
          </div>

          {/* Agregar riesgo */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Agregar Nuevo Riesgo</h2>

            {/* Campos básicos riesgo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Código</label>
                <input
                  type="text"
                  value={currentRisk.codigo}
                  onChange={e => setCurrentRisk(prev => ({ ...prev, codigo: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ej: R-001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Riesgo</label>
                <select
                  value={currentRisk.tipo_riesgo}
                  onChange={e => setCurrentRisk(prev => ({ ...prev, tipo_riesgo: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Seleccionar tipo</option>
                  {TIPOS_RIESGO.map(tipo => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                <input
                  type="date"
                  value={currentRisk.fecha}
                  onChange={e => setCurrentRisk(prev => ({ ...prev, fecha: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Nombre y descripción */}
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Riesgo *</label>
                <input
                  type="text"
                  value={currentRisk.nombre}
                  onChange={e => setCurrentRisk(prev => ({ ...prev, nombre: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ej: Falla en el sistema de backup"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción del Riesgo</label>
                <textarea
                  value={currentRisk.descripcion}
                  onChange={e => setCurrentRisk(prev => ({ ...prev, descripcion: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Puede suceder que..."
                />
              </div>
            </div>

            {/* Causas */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">Causas y Factores</label>
                <button
                  type="button"
                  onClick={handleAddCausa}
                  className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded text-sm"
                >
                  + Agregar Causa
                </button>
              </div>
              {currentRisk.causas.map((causa, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 p-3 border border-gray-200 rounded-lg">
                  <div>
                    <input
                      type="text"
                      value={causa.causa}
                      onChange={e => {
                        const nuevasCausas = [...currentRisk.causas];
                        nuevasCausas[index].causa = e.target.value;
                        setCurrentRisk(prev => ({ ...prev, causas: nuevasCausas }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Descripción de la causa"
                    />
                  </div>
                  <div>
                    <select
                      value={causa.factor}
                      onChange={e => {
                        const nuevasCausas = [...currentRisk.causas];
                        nuevasCausas[index].factor = e.target.value;
                        setCurrentRisk(prev => ({ ...prev, causas: nuevasCausas }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Factor de causa</option>
                      {FACTORES_CAUSA.map(factor => (
                        <option key={factor} value={factor}>{factor}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={causa.controles}
                      onChange={e => {
                        const nuevasCausas = [...currentRisk.causas];
                        nuevasCausas[index].controles = e.target.value;
                        setCurrentRisk(prev => ({ ...prev, causas: nuevasCausas }));
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Controles asociados"
                    />
                    {currentRisk.causas.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCausa(index)}
                        className="text-red-600 hover:bg-red-50 px-2 py-1 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Efectos */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Efectos/Consecuencias</label>
              <textarea
                value={currentRisk.efectos}
                onChange={e => setCurrentRisk(prev => ({ ...prev, efectos: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describir las consecuencias si se materializa el riesgo"
              />
            </div>

            {/* Evaluación riesgo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Probabilidad</label>
                <select
                  value={currentRisk.probabilidad}
                  onChange={e => setCurrentRisk(prev => ({ ...prev, probabilidad: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {PROBABILIDAD_LEVELS.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.value} - {level.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {PROBABILIDAD_LEVELS.find(l => l.value === currentRisk.probabilidad)?.description}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Impacto</label>
                <select
                  value={currentRisk.impacto}
                  onChange={e => setCurrentRisk(prev => ({ ...prev, impacto: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {IMPACTO_LEVELS.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.value} - {level.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {IMPACTO_LEVELS.find(l => l.value === currentRisk.impacto)?.description}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zona de Riesgo</label>
                <div className={`px-3 py-2 rounded-lg text-center font-medium ${calcularZonaRiesgo(currentRisk.probabilidad, currentRisk.impacto).color}`}>
                  {calcularZonaRiesgo(currentRisk.probabilidad, currentRisk.impacto).nivel}
                  <br />
                  <span className="text-sm">Valor: {calcularZonaRiesgo(currentRisk.probabilidad, currentRisk.impacto).valor}</span>
                </div>
              </div>
            </div>

            {/* Controles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Controles Existentes</label>
                <textarea
                  value={currentRisk.controles_existentes}
                  onChange={e => setCurrentRisk(prev => ({ ...prev, controles_existentes: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describir controles actuales"
                />
              </div>
              <div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Control</label>
                  <select
                    value={currentRisk.tipo_control}
                    onChange={e => setCurrentRisk(prev => ({ ...prev, tipo_control: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {TIPOS_CONTROL.map(tipo => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Efectividad del Control ({currentRisk.efectividad_control}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={currentRisk.efectividad_control}
                    onChange={e => setCurrentRisk(prev => ({ ...prev, efectividad_control: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Evaluación controles */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Evaluación de Controles</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries({
                  herramienta: 'Posee herramienta para ejercer el control',
                  manuales: 'Existen manuales/procedimientos',
                  efectividad: 'Ha demostrado ser efectivo',
                  responsables: 'Responsables definidos',
                  frecuencia: 'Frecuencia adecuada',
                }).map(([key, label]) => (
                  <label key={key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={currentRisk.controles_evaluacion[key]}
                      onChange={e => setCurrentRisk(prev => ({
                        ...prev,
                        controles_evaluacion: {
                          ...prev.controles_evaluacion,
                          [key]: e.target.checked,
                        },
                      }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tratamiento y responsable */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tratamiento/Controles Propuestos</label>
                <textarea
                  value={currentRisk.tratamiento}
                  onChange={e => setCurrentRisk(prev => ({ ...prev, tratamiento: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describir controles a implementar"
                />
              </div>
              <div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Responsable del Control</label>
                  <input
                    type="text"
                    value={currentRisk.responsable_control}
                    onChange={e => setCurrentRisk(prev => ({ ...prev, responsable_control: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nombre del responsable"
                  />
                </div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={currentRisk.aceptado}
                    onChange={e => setCurrentRisk(prev => ({ ...prev, aceptado: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 font-medium">¿Se acepta el riesgo?</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleAddRisk}
              disabled={!currentRisk.nombre.trim()}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Agregar Riesgo a la Matriz
            </button>
          </div>

          {/* Lista riesgos agregados */}
          {formData.riesgos.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Riesgos Agregados ({formData.riesgos.length})
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Riesgo</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probabilidad</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impacto</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zona</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aceptado</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.riesgos.map((riesgo, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{riesgo.numero}</td>
                        <td className="px-4 py-4 text-sm text-gray-900 max-w-xs truncate">
                          <div className="font-medium">{riesgo.nombre}</div>
                          <div className="text-gray-500 text-xs">{riesgo.codigo}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{riesgo.tipo_riesgo}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {riesgo.probabilidad} - {PROBABILIDAD_LEVELS.find(l => l.value === riesgo.probabilidad)?.label}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {riesgo.impacto} - {IMPACTO_LEVELS.find(l => l.value === riesgo.impacto)?.label}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${calcularZonaRiesgo(riesgo.probabilidad, riesgo.impacto).color}`}>
                            {calcularZonaRiesgo(riesgo.probabilidad, riesgo.impacto).nivel}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {riesgo.aceptado ? (
                            <span className="text-green-600 font-medium">Sí</span>
                          ) : (
                            <span className="text-red-600 font-medium">No</span>
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleRemoveRisk(index)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentView === 'view' && currentMatrix) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{currentMatrix.nombre}</h1>
              <p className="text-gray-600 mt-1">{currentMatrix.descripcion}</p>
              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                <span>Responsable: {currentMatrix.responsable}</span>
                <span>Creado: {new Date(currentMatrix.fecha_creacion).toLocaleDateString()}</span>
                {currentMatrix.fecha_modificacion && (
                  <span>Modificado: {new Date(currentMatrix.fecha_modificacion).toLocaleDateString()}</span>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentView('list')}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Volver
              </button>
              <button
                onClick={() => handleEditMatrix(currentMatrix)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit3 size={20} />
                Editar
              </button>
            </div>
          </div>

          {/* Resumen por nivel */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {['EXTREMA', 'ALTA', 'MODERADA', 'BAJA', 'MUY BAJA'].map(nivel => {
              const count = currentMatrix.riesgos.filter(r => r.zona_riesgo?.nivel === nivel).length;
              const colors = {
                'EXTREMA': 'bg-red-600 text-white',
                'ALTA': 'bg-red-400 text-white',
                'MODERADA': 'bg-yellow-400 text-black',
                'BAJA': 'bg-green-400 text-black',
                'MUY BAJA': 'bg-green-600 text-white',
              };
              return (
                <div key={nivel} className={`${colors[nivel]} rounded-lg p-4 text-center`}>
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-sm font-medium">{nivel}</div>
                </div>
              );
            })}
          </div>

          {/* Tabla riesgos */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Matriz de Riesgos ({currentMatrix.riesgos.length} riesgos)
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Riesgo</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probabilidad</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impacto</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zona Riesgo</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Controles</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentMatrix.riesgos.map(riesgo => (
                    <tr key={riesgo.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{riesgo.numero}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{riesgo.codigo}</td>
                      <td className="px-4 py-4 text-sm text-gray-900 max-w-xs">
                        <div className="font-medium">{riesgo.nombre}</div>
                        <div className="text-gray-500 text-xs truncate">{riesgo.descripcion}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{riesgo.tipo_riesgo}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {riesgo.probabilidad} - {PROBABILIDAD_LEVELS.find(l => l.value === riesgo.probabilidad)?.label}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {riesgo.impacto} - {IMPACTO_LEVELS.find(l => l.value === riesgo.impacto)?.label}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${riesgo.zona_riesgo.color}`}>
                          {riesgo.zona_riesgo.nivel} ({riesgo.zona_riesgo.valor})
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {riesgo.controles_existentes || 'Sin controles'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        {riesgo.aceptado ? (
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            Aceptado
                          </span>
                        ) : (
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                            No Aceptado
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null; // fallback si currentView es inválido
};

export default RiskMatrixApp;
