import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar si hay un usuario almacenado en localStorage al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      const token= user.user.token
      // Configurar el token en los headers de axios
      api.defaults.headers.common['Authorization'] = `Token ${token}`;
    }
    setLoading(false);
  }, []);

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
      return user_login;
    } catch (err) {
      const message = err.response?.data?.error || 'Error al iniciar sesión';
      console.log("message",message)
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
    console.log("token",token)
    try {
      const response = await api.post('/users/logout'); // <-- Endpoint corregido
      const successMessage = response.data?.message || 'Sesión cerrada correctamente.';
      setCurrentUser(null);
      localStorage.removeItem('user');
      delete api.defaults.headers.common['Authorization'];
      return alert(successMessage);
    } catch (err) {
      const message = err.response?.data?.error || 'No se pudo cerrar la sesión.';
      setError(message);
      throw new Error(message);
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
    login,
    register,
    logout,
    isAuthenticated
  };
   console.log("value",value)
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;