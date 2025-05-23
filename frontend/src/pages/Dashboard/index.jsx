import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/Card';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
 const user = currentUser?.user;
  // Datos de ejemplo para mostrar en el dashboard
  const dashboardData = [
    { 
      id: 1, 
      title: 'Usuarios Activos', 
      value: '1,248', 
      increase: true, 
      percentage: '12%' 
    },
    { 
      id: 2, 
      title: 'Nuevos Registros', 
      value: '345', 
      increase: true, 
      percentage: '8%' 
    },
    { 
      id: 3, 
      title: 'Visitas Totales', 
      value: '5,679', 
      increase: false, 
      percentage: '3%' 
    },
    { 
      id: 4, 
      title: 'Tiempo Promedio', 
      value: '2m 45s', 
      increase: true, 
      percentage: '7%' 
    }
  ];

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      logout();
      setIsLoading(false);
    }, 500);
  };
  if (!currentUser) {
  return <div>Acceso denegado. Inicia sesión para ver el Dashboard.</div>;
}
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-700">
            Bienvenido, <span className="font-medium">{user?.nombre}</span>
          </div>
          {/*<button 
            onClick={handleLogout} 
            disabled={isLoading}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300"
          >
            {isLoading ? 'Cerrando sesión...' : 'Cerrar Sesión'}
          </button>*/}
        </div>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Información de la cuenta</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Nombre</p>
            <p className="text-sm font-medium text-gray-900">{user?.nombre}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-sm font-medium text-gray-900">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">ID de Usuario</p>
            <p className="text-sm font-medium text-gray-900">{user?.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Rol</p>
            <p className="text-sm font-medium text-gray-900">Usuario</p>
          </div>
        </div>
      </div>
      
      <h2 className="text-lg font-medium text-gray-900 mb-4">Estadísticas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-500">{item.title}</p>
            <p className="text-3xl font-bold text-gray-900 my-2">{item.value}</p>
            <div className={`flex items-center text-sm ${item.increase ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-1">{item.increase ? '↑' : '↓'}</span>
              <span>{item.percentage}</span>
              <span className="ml-1 text-gray-500">vs último mes</span>
            </div>
          </div>
        ))}
      </div>
      
      <h2 className="text-lg font-medium text-gray-900 mt-8 mb-4">Acciones Rápidas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          title="Actualizar Perfil" 
          description="Modifica tus datos personales y preferencias de usuario"
        />
        <Card 
          title="Ver Actividad" 
          description="Consulta el historial de acciones realizadas en tu cuenta"
        />
        <Card 
          title="Configuración" 
          description="Ajusta las opciones de seguridad y notificaciones"
        />
      </div>
    </div>
  );
};

export default Dashboard;