// src/pages/InicioUsuarioEmpresa/index.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  FileCheck, 
  Code, 
  Shield, 
  FileSpreadsheet,
  ChevronRight,
  BarChart3,
  Settings
} from 'lucide-react';

const InicioUsuarioEmpresa = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const menuOptions = [
    {
      id: 'mis-evaluaciones',
      title: 'Mis Evaluaciones',
      description: 'Ver la lista de evaluaciones realizadas a tus sistemas de software',
      icon: <FileCheck className="h-12 w-12" />,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      route: '/mis-evaluaciones'
    },
    {
      id: 'mis-proyectos',
      title: 'Mis Proyectos (Software)',
      description: 'Gestiona los sistemas de software registrados en tu empresa',
      icon: <Code className="h-12 w-12" />,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      route: '/mis-proyectos'
    },
    {
      id: 'generar-matriz',
      title: 'Generar Matriz de Riesgo',
      description: 'Crear nueva matriz de análisis de riesgos para tus proyectos',
      icon: <Shield className="h-12 w-12" />,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      route: '/generar-matriz-riesgo'
    },
    {
      id: 'matrices',
      title: 'Matrices',
      description: 'Consulta el historial de matrices de riesgo anteriores',
      icon: <FileSpreadsheet className="h-12 w-12" />,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      route: '/matrices'
    }
  ];

  const handleOptionClick = (route) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bienvenido, {currentUser?.user?.nombre}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Desde aquí puedes gestionar tus evaluaciones, proyectos de software y matrices de riesgo. 
            Selecciona una opción para comenzar.
          </p>
        </div>

        {/* Información de la empresa */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-blue-500">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Settings className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {currentUser?.user?.empresa || 'Empresa no asignada'}
              </h2>
              <p className="text-gray-600">
                Último acceso: {new Date().toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Menú de opciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {menuOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleOptionClick(option.route)}
              className={`${option.color} ${option.hoverColor} transform hover:scale-105 transition-all duration-300 cursor-pointer rounded-xl shadow-lg overflow-hidden group`}
            >
              <div className="p-8 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="opacity-90 group-hover:opacity-100 transition-opacity">
                    {option.icon}
                  </div>
                  <ChevronRight className="h-6 w-6 transform group-hover:translate-x-1 transition-transform" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3">
                  {option.title}
                </h3>
                
                <p className="text-white/90 leading-relaxed">
                  {option.description}
                </p>
              </div>
              
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </div>
          ))}
        </div>

        {/* Estadísticas rápidas */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
            Resumen Rápido
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">-</div>
              <div className="text-sm text-gray-600">Evaluaciones Activas</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">-</div>
              <div className="text-sm text-gray-600">Proyectos Registrados</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">-</div>
              <div className="text-sm text-gray-600">Matrices Creadas</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">-</div>
              <div className="text-sm text-gray-600">Calificación Promedio</div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              * Los datos se actualizarán una vez que tengas evaluaciones y proyectos registrados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InicioUsuarioEmpresa;