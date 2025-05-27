// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null); // ✅ NUEVO: Para almacenar el rol

  // Verificar si hay un usuario almacenado en localStorage al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      const token = user.user.token;
      // Configurar el token en los headers de axios
      api.defaults.headers.common['Authorization'] = `Token ${token}`;
      
      // ✅ NUEVO: Obtener rol del usuario
      fetchUserRole();
    }
    setLoading(false);
  }, []);

  // ✅ NUEVA FUNCIÓN: Obtener rol del usuario
  const fetchUserRole = async () => {
    try {
      const response = await api.get('users/user-role'); // Este endpoint debe crearlo tu compañero
      setUserRole(response.data.role);
    } catch (error) {
      console.error('Error obteniendo rol del usuario:', error);
      // Fallback: intentar determinar rol desde los grupos del usuario
      // Si no funciona la API, podemos usar esta lógica temporal
    }
  };

  // ✅ FUNCIÓN HELPER: Determinar si el usuario pertenece a un grupo específico
  const hasRole = (roleName) => {
    return userRole === roleName;
  };

  // ✅ FUNCIÓN HELPER: Obtener el rol principal del usuario
  const getUserRole = () => {
    return userRole;
  };

  // Función para iniciar sesión
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('users/login', { email, password });
      const user_login = response.data;
      setCurrentUser(user_login);
      localStorage.setItem('user', JSON.stringify(user_login));      
      api.defaults.headers.common['Authorization'] = `Token ${user_login.token}`;
      
      // ✅ NUEVO: Obtener rol después del login
      await fetchUserRole();
      
      return user_login;
    } catch (err) {
      const message = err.response?.data?.error || 'Error al iniciar sesión';
      console.log("message", message);
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Función para registrar usuario
  const register = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/users/register', data);
      const successMessage = response.data?.message || 'Registro exitoso';
      return successMessage;
    } catch (err) {
      // Guardamos solo si no hay errores de campo
      if (!err.response?.data?.errors) {
        setError('Error al registrarse');
      }
      throw err; // ← Importante: lanzar el error completo
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    const user = currentUser?.user;
    const token = user?.token;
    
    try {
      const response = await api.post(
        '/users/logout',
        {},
        { headers: { Authorization: `Token ${token}` } }
      );
      const successMessage = response.data?.message || 'Sesión cerrada correctamente.';
      
      // Limpiar estado y localStorage
      setCurrentUser(null);
      setUserRole(null); // ✅ NUEVO: Limpiar rol
      localStorage.removeItem('user');
      delete api.defaults.headers.common['Authorization'];
      
      return { success: true, message: successMessage };
    } catch (err) {
      const message = err.response?.data?.error || 'No se pudo cerrar la sesión.';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Función para verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return !!currentUser;
  };
 
  // Valor que se proporcionará al contexto
  const value = {
    currentUser,
    loading,
    error,
    userRole,           // ✅ NUEVO
    hasRole,           // ✅ NUEVO
    getUserRole,       // ✅ NUEVO
    login,
    register,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;