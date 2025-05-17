import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Componente para proteger rutas que requieren autenticación
 * @param {Object} props - Propiedades del componente
 * @param {JSX.Element} props.children - Elemento hijo a renderizar si está autenticado
 * @returns {JSX.Element} - Componente protegido o redirección a login
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Mostrar un indicador de carga mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirigir a login si no está autenticado
  if (!isAuthenticated()) {
    // Guardar la ubicación actual para redirigir después del login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Renderizar el contenido protegido si está autenticado
  return children;
};

export default ProtectedRoute;