// src/pages/EvaluadorEmpresas/index.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building, 
  Search, 
  Filter, 
  Code, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  BarChart3,
  Users
} from 'lucide-react';

const EvaluadorEmpresas = () => {
  const navigate = useNavigate();
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroSector, setFiltroSector] = useState('');
  const [filtroTamaño, setFiltroTamaño] = useState('');

  // Datos simulados de empresas
  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        // Simular llamada a API
        setTimeout(() => {
          const empresasData = [
            {
              id: 1,
              nombre: 'TechCorp S.A.S',
              nit: '900123456-7',
              sector: 'Tecnología',
              tamaño: 'Grande',
              direccion: 'Calle 100 #15-30, Bogotá',
              telefono: '+57 1 234 5678',
              email: 'contacto@techcorp.com',
              fecha_registro: '2023-06-15',
              sistemas_count: 5,
              evaluaciones_count: 12,
              ultima_evaluacion: '2024-05-20',
              promedio_calificacion: 85.5,
              codigo_empresa: 'TC001'
            },
            {
              id: 2,
              nombre: 'InnovaSoft Ltda',
              nit: '800987654-3',
              sector: 'Software',
              tamaño: 'Mediana',
              direccion: 'Carrera 50 #25-10, Medellín',
              telefono: '+57 4 567 8901',
              email: 'info@innovasoft.co',
              fecha_registro: '2023-08-22',
              sistemas_count: 3,
              evaluaciones_count: 7,
              ultima_evaluacion: '2024-05-18',
              promedio_calificacion: 78.2,
              codigo_empresa: 'IS002'
            },
            {
              id: 3,
              nombre: 'DataSolutions Corp',
              nit: '901234567-1',
              sector: 'Análisis de Datos',
              tamaño: 'Grande',
              direccion: 'Av. Las Americas #45-20, Cali',
              telefono: '+57 2 345 6789',
              email: 'contact@datasolutions.co',
              fecha_registro: '2023-03-10',
              sistemas_count: 8,
              evaluaciones_count: 20,
              ultima_evaluacion: '2024-05-25',
              promedio_calificacion: 92.1,
              codigo_empresa: 'DS003'
            },
            {
              id: 4,
              nombre: 'CloudTech Solutions',
              nit: '800555444-9',
              sector: 'Cloud Computing',
              tamaño: 'Pequeña',
              direccion: 'Calle 26 #68-15, Bogotá',
              telefono: '+57 1 987 6543',
              email: 'hello@cloudtech.co',
              fecha_registro: '2023-11-05',
              sistemas_count: 2,
              evaluaciones_count: 4,
              ultima_evaluacion: '2024-05-15',
              promedio_calificacion: 73.8,
              codigo_empresa: 'CT004'
            },
            {
              id: 5,
              nombre: 'SecureApp Inc',
              nit: '900111222-5',
              sector: 'Ciberseguridad',
              tamaño: 'Mediana',
              direccion: 'Zona Rosa, Carrera 15 #93-47, Bogotá',
              telefono: '+57 1 456 7890',
              email: 'security@secureapp.co',
              fecha_registro: '2023-07-18',
              sistemas_count: 4,
              evaluaciones_count: 9,
              ultima_evaluacion: '2024-05-22',
              promedio_calificacion: 88.7,
              codigo_empresa: 'SA005'
            }
          ];
          setEmpresas(empresasData);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error cargando empresas:', error);
        setLoading(false);
      }
    };

    fetchEmpresas();
  }, []);

  // Filtrar empresas
  const empresasFiltradas = empresas.filter(empresa => {
    const cumpleSearch = empresa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        empresa.nit.includes(searchTerm) ||
                        empresa.codigo_empresa.toLowerCase().includes(searchTerm.toLowerCase());
    const cumpleSector = !filtroSector || empresa.sector === filtroSector;
    const cumpleTamaño = !filtroTamaño || empresa.tamaño === filtroTamaño;
    
    return cumpleSearch && cumpleSector && cumpleTamaño;
  });

  const sectoresUnicos = [...new Set(empresas.map(e => e.sector))];
  const tamañosUnicos = [...new Set(empresas.map(e => e.tamaño))];

  const handleVerSistemas = (empresaId, empresaNombre) => {
    navigate(`/evaluador/empresa/${empresaId}/sistemas`, { 
      state: { empresaNombre } 
    });
  };

  const getColorCalificacion = (promedio) => {
    if (promedio >= 90) return 'text-green-600 bg-green-100';
    if (promedio >= 80) return 'text-blue-600 bg-blue-100';
    if (promedio >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getTamañoColor = (tamaño) => {
    switch (tamaño) {
      case 'Grande': return 'bg-purple-100 text-purple-800';
      case 'Mediana': return 'bg-blue-100 text-blue-800';
      case 'Pequeña': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando empresas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Empresas Registradas
          </h1>
          <p className="text-xl text-gray-600">
            Explora las empresas y sus sistemas de software para realizar evaluaciones
          </p>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, NIT o código..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filtro por sector */}
            <div>
              <select
                value={filtroSector}
                onChange={(e) => setFiltroSector(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos los sectores</option>
                {sectoresUnicos.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>

            {/* Filtro por tamaño */}
            <div>
              <select
                value={filtroTamaño}
                onChange={(e) => setFiltroTamaño(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos los tamaños</option>
                {tamañosUnicos.map(tamaño => (
                  <option key={tamaño} value={tamaño}>{tamaño}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{empresas.length}</div>
            <div className="text-sm text-gray-600">Total Empresas</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {empresas.reduce((sum, emp) => sum + emp.sistemas_count, 0)}
            </div>
            <div className="text-sm text-gray-600">Sistemas Registrados</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {empresas.reduce((sum, emp) => sum + emp.evaluaciones_count, 0)}
            </div>
            <div className="text-sm text-gray-600">Evaluaciones Realizadas</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {(empresas.reduce((sum, emp) => sum + emp.promedio_calificacion, 0) / empresas.length).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Promedio General</div>
          </div>
        </div>

        {/* Lista de empresas */}
        <div className="space-y-6">
          {empresasFiltradas.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron empresas
              </h3>
              <p className="text-gray-600">
                Intenta ajustar los filtros de búsqueda
              </p>
            </div>
          ) : (
            empresasFiltradas.map((empresa) => (
              <div
                key={empresa.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-blue-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Building className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {empresa.nombre}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>NIT: {empresa.nit}</span>
                          <span>•</span>
                          <span>Código: {empresa.codigo_empresa}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTamañoColor(empresa.tamaño)}`}>
                            {empresa.tamaño}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{empresa.direccion}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{empresa.telefono}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{empresa.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Desde {new Date(empresa.fecha_registro).toLocaleDateString('es-ES')}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Code className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-gray-600">
                          {empresa.sistemas_count} sistemas
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">
                          {empresa.evaluaciones_count} evaluaciones
                        </span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getColorCalificacion(empresa.promedio_calificacion)}`}>
                        Promedio: {empresa.promedio_calificacion}%
                      </div>
                    </div>
                  </div>

                  <div className="ml-6">
                    <button
                      onClick={() => handleVerSistemas(empresa.id, empresa.nombre)}
                      className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <span>Ver Sistemas</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Mostrar resultados */}
        <div className="mt-8 text-center text-gray-600">
          Mostrando {empresasFiltradas.length} de {empresas.length} empresas
        </div>
      </div>
    </div>
  );
};

export default EvaluadorEmpresas;