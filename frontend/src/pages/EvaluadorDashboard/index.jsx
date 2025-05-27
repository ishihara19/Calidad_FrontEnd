// src/pages/EvaluadorDashboard/index.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  Building, 
  Code, 
  FileCheck, 
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';

const EvaluadorDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    empresas_total: 0,
    sistemas_total: 0,
    evaluaciones_pendientes: 0,
    evaluaciones_completadas: 0,
    evaluaciones_mes: 0,
    promedio_calificacion: 0
  });
  
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simular carga de datos
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simular datos - aquí irían las llamadas reales a la API
        setTimeout(() => {
          setStats({
            empresas_total: 12,
            sistemas_total: 35,
            evaluaciones_pendientes: 8,
            evaluaciones_completadas: 23,
            evaluaciones_mes: 15,
            promedio_calificacion: 78.5
          });
          
          setRecentActivity([
            { id: 1, empresa: 'TechCorp S.A.S', sistema: 'Sistema ERP', tipo: 'evaluacion_completada', fecha: '2024-05-25' },
            { id: 2, empresa: 'InnovaSoft', sistema: 'App Mobile', tipo: 'evaluacion_pendiente', fecha: '2024-05-24' },
            { id: 3, empresa: 'DataSolutions', sistema: 'Portal Web', tipo: 'evaluacion_completada', fecha: '2024-05-23' },
            { id: 4, empresa: 'CloudTech', sistema: 'API Gateway', tipo: 'evaluacion_iniciada', fecha: '2024-05-22' },
            { id: 5, empresa: 'SecureApp', sistema: 'Sistema de Seguridad', tipo: 'evaluacion_completada', fecha: '2024-05-21' }
          ]);
          
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error cargando datos del dashboard:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const quickActions = [
    {
      title: 'Ver Empresas',
      description: 'Explorar empresas registradas y sus sistemas',
      icon: <Building className="h-8 w-8" />,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      route: '/evaluador/empresas'
    },
    {
      title: 'Nueva Evaluación',
      description: 'Iniciar evaluación de un sistema de software',
      icon: <FileCheck className="h-8 w-8" />,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      route: '/evaluador/nueva-evaluacion'
    },
    {
      title: 'Mis Evaluaciones',
      description: 'Ver historial y estado de evaluaciones',
      icon: <BarChart3 className="h-8 w-8" />,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      route: '/evaluador/evaluaciones'
    },
    {
      title: 'Reportes',
      description: 'Generar reportes y estadísticas',
      icon: <TrendingUp className="h-8 w-8" />,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      route: '/evaluador/reportes'
    }
  ];

  const getActivityIcon = (tipo) => {
    switch (tipo) {
      case 'evaluacion_completada':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'evaluacion_pendiente':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'evaluacion_iniciada':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <FileCheck className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityText = (tipo) => {
    switch (tipo) {
      case 'evaluacion_completada':
        return 'Evaluación completada';
      case 'evaluacion_pendiente':
        return 'Evaluación pendiente';
      case 'evaluacion_iniciada':
        return 'Evaluación iniciada';
      default:
        return 'Actividad';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dashboard del Evaluador
          </h1>
          <p className="text-xl text-gray-600">
            Bienvenido, {currentUser?.user?.nombre}
          </p>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Empresas Disponibles</p>
                <p className="text-3xl font-bold text-gray-900">{stats.empresas_total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sistemas Registrados</p>
                <p className="text-3xl font-bold text-gray-900">{stats.sistemas_total}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Code className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Evaluaciones Pendientes</p>
                <p className="text-3xl font-bold text-gray-900">{stats.evaluaciones_pendientes}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Promedio General</p>
                <p className="text-3xl font-bold text-gray-900">{stats.promedio_calificacion}%</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Acciones rápidas */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Acciones Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  onClick={() => navigate(action.route)}
                  className={`${action.color} ${action.hoverColor} text-white p-6 rounded-xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300 group`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="opacity-90 group-hover:opacity-100 transition-opacity">
                      {action.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                  <p className="text-white/90 text-sm">{action.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actividad reciente */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Actividad Reciente</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="mt-1">
                    {getActivityIcon(activity.tipo)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.empresa}
                    </p>
                    <p className="text-xs text-gray-600">
                      {activity.sistema} • {getActivityText(activity.tipo)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(activity.fecha).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => navigate('/evaluador/evaluaciones')}
              className="w-full mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Ver todas las evaluaciones →
            </button>
          </div>
        </div>

        {/* Métricas adicionales */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen del Mes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.evaluaciones_mes}</div>
              <div className="text-sm text-gray-600">Evaluaciones Realizadas</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.evaluaciones_completadas}</div>
              <div className="text-sm text-gray-600">Evaluaciones Completadas</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">{((stats.evaluaciones_completadas / (stats.evaluaciones_completadas + stats.evaluaciones_pendientes)) * 100).toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Tasa de Finalización</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluadorDashboard;