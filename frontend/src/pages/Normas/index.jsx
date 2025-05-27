import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter,  
  Eye, 
  Edit, 
  Trash2, 
  Download,
  FileText,
  Calendar,
  User,
  Settings,
  ChevronDown,
  MoreVertical,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  Globe,
  Shield
} from 'lucide-react';
import { Button } from 'antd';
import {useNavigate } from 'react-router-dom'
import {  PlusOutlined } from '@ant-design/icons';


const NormasPage = () => {
  const [normas, setNormas] = useState([]);
  const [filteredNormas, setFilteredNormas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('todas');
  const [filterStatus, setFilterStatus] = useState('todas');
  const [sortBy, setSortBy] = useState('fecha_desc');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
      const navigate = useNavigate();


  // Datos de ejemplo para las normas
  const normasData = [
    {
      id: 1,
      codigo: 'ISO-25000',
      nombre: 'ISO/IEC 25000 - SQuaRE',
      descripcion: 'Systems and software Quality Requirements and Evaluation',
      version: '2014',
      tipo: 'ISO',
      categoria: 'Calidad de Software',
      estado: 'activa',
      fecha_creacion: '2024-01-15',
      fecha_actualizacion: '2024-12-01',
      autor: 'ISO/IEC',
      evaluaciones_realizadas: 45,
      popularidad: 95,
      ambito: 'internacional',
      criterios_count: 8,
      subcriterios_count: 31
    },
    {
      id: 2,
      codigo: 'IEEE-730',
      nombre: 'IEEE 730 - Software Quality Assurance',
      descripcion: 'Standard for Software Quality Assurance Processes',
      version: '2014',
      tipo: 'IEEE',
      categoria: 'Aseguramiento de Calidad',
      estado: 'activa',
      fecha_creacion: '2024-02-20',
      fecha_actualizacion: '2024-11-15',
      autor: 'Institute of Electrical and Electronics Engineers',
      evaluaciones_realizadas: 28,
      popularidad: 78,
      ambito: 'internacional',
      criterios_count: 6,
      subcriterios_count: 24
    },
    {
      id: 3,
      codigo: 'CMMI-DEV',
      nombre: 'CMMI for Development',
      descripcion: 'Capability Maturity Model Integration for Development',
      version: '2.0',
      tipo: 'CMMI',
      categoria: 'Madurez de Procesos',
      estado: 'activa',
      fecha_creacion: '2024-03-10',
      fecha_actualizacion: '2024-10-30',
      autor: 'CMMI Institute',
      evaluaciones_realizadas: 32,
      popularidad: 85,
      ambito: 'internacional',
      criterios_count: 5,
      subcriterios_count: 22
    },
    {
      id: 4,
      codigo: 'ISO-27001',
      nombre: 'ISO/IEC 27001 - Information Security',
      descripcion: 'Information Security Management Systems - Requirements',
      version: '2022',
      tipo: 'ISO',
      categoria: 'Seguridad Información',
      estado: 'activa',
      fecha_creacion: '2024-04-05',
      fecha_actualizacion: '2024-12-10',
      autor: 'ISO/IEC',
      evaluaciones_realizadas: 19,
      popularidad: 72,
      ambito: 'internacional',
      criterios_count: 14,
      subcriterios_count: 114
    },
    {
      id: 5,
      codigo: 'CUSTOM-001',
      nombre: 'Norma Personalizada - FinTech',
      descripcion: 'Norma específica para evaluación de software financiero',
      version: '1.0',
      tipo: 'Personalizada',
      categoria: 'Sector Financiero',
      estado: 'borrador',
      fecha_creacion: '2024-11-20',
      fecha_actualizacion: '2024-12-15',
      autor: 'CodeScore Team',
      evaluaciones_realizadas: 3,
      popularidad: 45,
      ambito: 'nacional',
      criterios_count: 7,
      subcriterios_count: 28
    },
    {
      id: 6,
      codigo: 'ISO-25010',
      nombre: 'ISO/IEC 25010 - Quality Model',
      descripcion: 'Systems and software quality models',
      version: '2011',
      tipo: 'ISO',
      categoria: 'Modelo de Calidad',
      estado: 'deprecada',
      fecha_creacion: '2023-08-12',
      fecha_actualizacion: '2024-01-10',
      autor: 'ISO/IEC',
      evaluaciones_realizadas: 67,
      popularidad: 60,
      ambito: 'internacional',
      criterios_count: 8,
      subcriterios_count: 31
    }
  ];

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setNormas(normasData);
      setFilteredNormas(normasData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...normas];

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(norma =>
        norma.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        norma.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        norma.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por tipo
    if (filterType !== 'todas') {
      filtered = filtered.filter(norma => norma.tipo.toLowerCase() === filterType.toLowerCase());
    }

    // Filtrar por estado
    if (filterStatus !== 'todas') {
      filtered = filtered.filter(norma => norma.estado === filterStatus);
    }

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'nombre_asc':
          return a.nombre.localeCompare(b.nombre);
        case 'nombre_desc':
          return b.nombre.localeCompare(a.nombre);
        case 'fecha_asc':
          return new Date(a.fecha_actualizacion) - new Date(b.fecha_actualizacion);
        case 'fecha_desc':
          return new Date(b.fecha_actualizacion) - new Date(a.fecha_actualizacion);
        case 'popularidad':
          return b.popularidad - a.popularidad;
        default:
          return 0;
      }
    });

    setFilteredNormas(filtered);
  }, [normas, searchTerm, filterType, filterStatus, sortBy]);

  const getEstadoBadge = (estado) => {
    const badges = {
      activa: { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle className="h-3 w-3" /> },
      borrador: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <Clock className="h-3 w-3" /> },
      deprecada: { bg: 'bg-red-100', text: 'text-red-800', icon: <AlertCircle className="h-3 w-3" /> }
    };
    const badge = badges[estado] || badges.activa;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        {badge.icon}
        {estado.charAt(0).toUpperCase() + estado.slice(1)}
      </span>
    );
  };

  const getTipoBadge = (tipo) => {
    const colors = {
      ISO: 'bg-blue-100 text-blue-800',
      IEEE: 'bg-purple-100 text-purple-800',
      CMMI: 'bg-indigo-100 text-indigo-800',
      Personalizada: 'bg-orange-100 text-orange-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[tipo] || 'bg-gray-100 text-gray-800'}`}>
        {tipo}
      </span>
    );
  };

  const getPopularityStars = (popularidad) => {
    const stars = Math.floor(popularidad / 20);
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">({popularidad}%)</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando normas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Gestión de Normas</h1>
                <p className="text-gray-600">Administra las normas de evaluación del sistema</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Download className="h-4 w-4" />
                <span>Exportar</span>
              </button>
               <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => navigate('/normas/crear')}
                >
                    Nueva Norma
                </Button>
             
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Normas</p>
                <p className="text-2xl font-bold text-gray-900">{normas.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Normas Activas</p>
                <p className="text-2xl font-bold text-gray-900">{normas.filter(n => n.estado === 'activa').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Evaluaciones Totales</p>
                <p className="text-2xl font-bold text-gray-900">{normas.reduce((acc, n) => acc + n.evaluaciones_realizadas, 0)}</p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Más Popular</p>
                <p className="text-sm font-bold text-gray-900">{normas.reduce((prev, current) => prev.popularidad > current.popularidad ? prev : current, normas[0])?.codigo || 'N/A'}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Controles de búsqueda y filtros */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar normas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="todas">Todos los tipos</option>
                <option value="iso">ISO</option>
                <option value="ieee">IEEE</option>
                <option value="cmmi">CMMI</option>
                <option value="personalizada">Personalizada</option>
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="todas">Todos los estados</option>
                <option value="activa">Activas</option>
                <option value="borrador">Borrador</option>
                <option value="deprecada">Deprecadas</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="fecha_desc">Más recientes</option>
                <option value="fecha_asc">Más antiguas</option>
                <option value="nombre_asc">Nombre A-Z</option>
                <option value="nombre_desc">Nombre Z-A</option>
                <option value="popularidad">Más populares</option>
              </select>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" />
                <span>Filtros</span>
                <ChevronDown className={`h-4 w-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Filtros avanzados</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rango de evaluaciones</label>
                  <input type="range" min="0" max="100" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha desde</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha hasta</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Lista de normas */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Normas encontradas: {filteredNormas.length}
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Norma
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo / Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Criterios
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Popularidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Última actualización
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredNormas.map((norma) => (
                  <tr key={norma.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {norma.nombre}
                            </p>
                            {norma.ambito === 'internacional' && (
                              <Globe className="h-3 w-3 text-blue-500" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mb-1">{norma.codigo} v{norma.version}</p>
                          <p className="text-xs text-gray-600 line-clamp-2">{norma.descripcion}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {getTipoBadge(norma.tipo)}
                        {getEstadoBadge(norma.estado)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div>{norma.criterios_count} criterios</div>
                        <div className="text-xs text-gray-500">{norma.subcriterios_count} subcriterios</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {getPopularityStars(norma.popularidad)}
                        <div className="text-xs text-gray-500">
                          {norma.evaluaciones_realizadas} evaluaciones
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {new Date(norma.fecha_actualizacion).toLocaleDateString('es-ES')}
                      </div>
                      <div className="text-xs text-gray-500">
                        por {norma.autor}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:bg-gray-50 rounded transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:bg-gray-50 rounded transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredNormas.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron normas</h3>
              <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
            </div>
          )}
        </div>

        {/* Paginación */}
        {filteredNormas.length > 0 && (
          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Mostrando {filteredNormas.length} de {normas.length} normas
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                Anterior
              </button>
              <span className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</span>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NormasPage;