import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRoles, setUserRoles] = useState([]); // ahora es un array porque backend devuelve lista

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);

      // Establecer token en axios
      api.defaults.headers.common['Authorization'] = `Token ${user.user.token}`;

      // Guardar roles directamente desde el user almacenado
      setUserRoles(user.user.rol || []);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('users/login', { email, password });
      const user_login = response.data;
      setCurrentUser(user_login);
      localStorage.setItem('user', JSON.stringify(user_login));

      // Establecer token en axios
      api.defaults.headers.common['Authorization'] = `Token ${user_login.user.token}`;

      // Guardar roles directamente desde la respuesta del login
      setUserRoles(user_login.user.rol || []);

      return user_login;
    } catch (err) {
      const message = err.response?.data?.error || 'Error al iniciar sesión';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Función para saber si tiene un rol
  const hasRole = (roleName) => {
    return userRoles.includes(roleName);
  };

  const getUserRoles = () => {
    return userRoles;
  };

  const logout = async () => {
    const token = currentUser?.user?.token;

    try {
      const response = await api.post(
        '/users/logout',
        {},
        { headers: { Authorization: `Token ${token}` } }
      );
      const successMessage = response.data?.message || 'Sesión cerrada correctamente.';

      setCurrentUser(null);
      setUserRoles([]);
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

  const isAuthenticated = () => !!currentUser;

  const value = {
    currentUser,
    loading,
    error,
    userRoles,      // lista completa de roles
    hasRole,
    getUserRoles,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
