import { useState } from 'react';
import { 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Shield, 
  TrendingUp, 
  Activity, 
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Calendar,
  Target,
  Award,
  BookOpen
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  // Datos de ejemplo
  const stats = {
    usuarios: { total: 248, cambio: +12, porcentaje: 4.8 },
    evaluaciones: { total: 156, cambio: +23, porcentaje: 17.3 },
    normas: { total: 12, cambio: +2, porcentaje: 20.0 },
    proyectos: { total: 89, cambio: +8, porcentaje: 9.9 }
  };

  const recentEvaluations = [
    { id: 1, proyecto: 'Sistema de Gestión ERP', evaluador: 'María González', norma: 'ISO 25000', estado: 'completada', puntuacion: 87, fecha: '2024-12-15' },
    { id: 2, proyecto: 'App Móvil Bancaria', evaluador: 'Carlos Ruiz', norma: 'IEEE 730', estado: 'en_progreso', puntuacion: null, fecha: '2024-12-14' },
    { id: 3, proyecto: 'Portal Web Corporativo', evaluador: 'Ana López', norma: 'ISO 25000', estado: 'completada', puntuacion: 92, fecha: '2024-12-13' },
    { id: 4, proyecto: 'Sistema de Inventario', evaluador: 'Luis Torres', norma: 'CMMI', estado: 'pendiente', puntuacion: null, fecha: '2024-12-12' },
    { id: 5, proyecto: 'Plataforma E-learning', evaluador: 'Sofia Mendez', norma: 'ISO 25000', estado: 'completada', puntuacion: 89, fecha: '2024-12-11' }
  ];

  const topUsers = [
    { id: 1, nombre: 'María González', evaluaciones: 23, promedio: 88.5, rol: 'Evaluador Senior' },
    { id: 2, nombre: 'Carlos Ruiz', evaluaciones: 19, promedio: 85.2, rol: 'Evaluador' },
    { id: 3, nombre: 'Ana López', evaluaciones: 17, promedio: 91.3, rol: 'Evaluador Senior' },
    { id: 4, nombre: 'Luis Torres', evaluaciones: 15, promedio: 82.7, rol: 'Evaluador' },
    { id: 5, nombre: 'Sofia Mendez', evaluaciones: 14, promedio: 89.1, rol: 'Evaluador' }
  ];

  const systemAlerts = [
    { id: 1, tipo: 'warning', mensaje: '3 evaluaciones pendientes de revisión', tiempo: '2 horas' },
    { id: 2, tipo: 'info', mensaje: 'Actualización del sistema programada para mañana', tiempo: '1 día' },
    { id: 3, tipo: 'error', mensaje: 'Error en la carga de métricas del proyecto ERP', tiempo: '30 min' },
    { id: 4, tipo: 'success', mensaje: 'Backup completado exitosamente', tiempo: '6 horas' }
  ];

  const getEstadoBadge = (estado) => {
    const badges = {
      completada: 'bg-green-100 text-green-800',
      en_progreso: 'bg-yellow-100 text-yellow-800',
      pendiente: 'bg-gray-100 text-gray-800'
    };
    return badges[estado] || 'bg-gray-100 text-gray-800';
  };

  const getAlertIcon = (tipo) => {
    const icons = {
      warning: <AlertCircle className="h-4 w-4 text-yellow-500" />,
      error: <AlertCircle className="h-4 w-4 text-red-500" />,
      info: <Activity className="h-4 w-4 text-blue-500" />,
      success: <CheckCircle className="h-4 w-4 text-green-500" />
    };
    return icons[tipo];
  };

  const StatCard = ({ title, value, change, percentage, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600 font-medium">+{change}</span>
            <span className="text-sm text-gray-500 ml-1">({percentage}%)</span>
          </div>
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
          <Icon className="h-8 w-8" style={{ color }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
                <p className="text-gray-600">Sistema de Evaluación de Calidad de Software</p>
              </div>
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
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="h-4 w-4" />
                <span>Nueva Acción</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Usuarios"
            value={stats.usuarios.total}
            change={stats.usuarios.cambio}
            percentage={stats.usuarios.porcentaje}
            icon={Users}
            color="#3B82F6"
          />
          <StatCard
            title="Evaluaciones"
            value={stats.evaluaciones.total}
            change={stats.evaluaciones.cambio}
            percentage={stats.evaluaciones.porcentaje}
            icon={BarChart3}
            color="#10B981"
          />
          <StatCard
            title="Normas Activas"
            value={stats.normas.total}
            change={stats.normas.cambio}
            percentage={stats.normas.porcentaje}
            icon={FileText}
            color="#F59E0B"
          />
          <StatCard
            title="Proyectos"
            value={stats.proyectos.total}
            change={stats.proyectos.cambio}
            percentage={stats.proyectos.porcentaje}
            icon={Target}
            color="#8B5CF6"
          />
        </div>

        {/* Navegación por pestañas */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Resumen', icon: BarChart3 },
                { id: 'evaluations', label: 'Evaluaciones', icon: FileText },
                { id: 'users', label: 'Usuarios', icon: Users },
                { id: 'alerts', label: 'Alertas', icon: AlertCircle }
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
            {/* Contenido del tab Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Gráfico de actividad */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Activity className="h-5 w-5 text-blue-600 mr-2" />
                    Actividad del Sistema
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">23</div>
                      <div className="text-sm text-gray-600">Evaluaciones Hoy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">156</div>
                      <div className="text-sm text-gray-600">Este Mes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">89%</div>
                      <div className="text-sm text-gray-600">Tasa de Éxito</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">4.5</div>
                      <div className="text-sm text-gray-600">Puntuación Media</div>
                    </div>
                  </div>
                </div>

                {/* Top usuarios */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Award className="h-5 w-5 text-yellow-600 mr-2" />
                    Mejores Evaluadores
                  </h3>
                  <div className="space-y-3">
                    {topUsers.map((user, index) => (
                      <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-semibold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{user.nombre}</div>
                            <div className="text-sm text-gray-500">{user.rol}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{user.evaluaciones} evaluaciones</div>
                          <div className="text-sm text-green-600">Promedio: {user.promedio}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Contenido del tab Evaluaciones */}
            {activeTab === 'evaluations' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Evaluaciones Recientes</h3>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Buscar evaluaciones..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter className="h-4 w-4" />
                      <span>Filtros</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      <Download className="h-4 w-4" />
                      <span>Exportar</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Proyecto</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Evaluador</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Norma</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Estado</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Puntuación</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Fecha</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentEvaluations.map(evaluation => (
                        <tr key={evaluation.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-900">{evaluation.proyecto}</div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{evaluation.evaluador}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                              {evaluation.norma}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEstadoBadge(evaluation.estado)}`}>
                              {evaluation.estado.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {evaluation.puntuacion ? (
                              <span className="font-medium text-gray-900">{evaluation.puntuacion}/100</span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-gray-600">{evaluation.fecha}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Contenido del tab Usuarios */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Gestión de Usuarios</h3>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Plus className="h-4 w-4" />
                    <span>Nuevo Usuario</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Evaluadores</p>
                        <p className="text-2xl font-bold text-blue-900">156</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-600 font-medium">Administradores</p>
                        <p className="text-2xl font-bold text-green-900">8</p>
                      </div>
                      <Shield className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-purple-600 font-medium">Usuarios Activos</p>
                        <p className="text-2xl font-bold text-purple-900">142</p>
                      </div>
                      <Activity className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {topUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.nombre.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user.nombre}</div>
                          <div className="text-sm text-gray-500">{user.rol} • {user.evaluaciones} evaluaciones</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Promedio</div>
                          <div className="font-semibold text-green-600">{user.promedio}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contenido del tab Alertas */}
            {activeTab === 'alerts' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Alertas del Sistema</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    Marcar todas como leídas
                  </button>
                </div>

                <div className="space-y-4">
                  {systemAlerts.map(alert => (
                    <div key={alert.id} className="flex items-start space-x-3 p-4 bg-white border border-gray-200 rounded-lg">
                      {getAlertIcon(alert.tipo)}
                      <div className="flex-1">
                        <p className="text-gray-900">{alert.mensaje}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>hace {alert.tiempo}</span>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Acciones Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center space-y-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Nueva Norma</span>
            </button>
            
            <button className="flex flex-col items-center space-y-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="h-8 w-8 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Gestionar Usuarios</span>
            </button>
            
            <button className="flex flex-col items-center space-y-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Ver Reportes</span>
            </button>
            
            <button className="flex flex-col items-center space-y-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Settings className="h-8 w-8 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Configuración</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;