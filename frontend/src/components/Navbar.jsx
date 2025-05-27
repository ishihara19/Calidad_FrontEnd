// src/components/Navbar.jsx
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LogoutModal from './LogoutModal'; 

const Navbar = () => {
  const activeStyle = "text-blue-600 font-medium";
  const baseStyle = "px-3 py-2 rounded-md hover:bg-gray-100 transition-colors";

  const { isAuthenticated, currentUser, logout, hasRole, userRoles } = useAuth();
  console.log(userRoles)
  const isLoggedIn = isAuthenticated();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      setModalOpen(true);
    } else {
      console.error(result.message);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    navigate('/login');
  };

  // Mostrar el primer rol o "Sin rol"
  const displayedRole = userRoles.length > 0 ? userRoles[0] : "Sin rol";

  const renderNavLinks = () => {
    if (!isLoggedIn) {
      return (
        <>
          <NavLink to="/" end className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : "text-gray-600"}`}>
            Inicio
          </NavLink>
          <NavLink to="/quienes-somos" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : "text-gray-600"}`}>
            Quiénes Somos
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : "text-gray-600"}`}>
            Contacto
          </NavLink>
        </>
      );
    }

    if (hasRole('Usuarios_Empresa')) {
      return (
        <>
          <NavLink to="/inicio" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : "text-gray-600"}`}>
            Inicio
          </NavLink>
          <NavLink to="/perfil" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : "text-gray-600"}`}>
            Perfil
          </NavLink>
        </>
      );
    }

    if (hasRole('Administradores')) {
      return (
        <>
          <NavLink to="/admin/dashboard" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : "text-gray-600"}`}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/empresas" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : "text-gray-600"}`}>
            Empresas
          </NavLink>
          <NavLink to="/admin/sistemas" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : "text-gray-600"}`}>
            Sistemas
          </NavLink>
          <NavLink to="/normas" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : "text-gray-600"}`}>
            Normas
          </NavLink>
        </>
      );
    }

    if (hasRole('Evaluadores')) {
      return (
        <>
          <NavLink to="/evaluador/dashboard" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : "text-gray-600"}`}>
            Dashboard
          </NavLink>
          <NavLink to="/evaluador/empresas" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : "text-gray-600"}`}>
            Empresas
          </NavLink>
          <NavLink to="/evaluador/evaluaciones" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : "text-gray-600"}`}>
            Evaluaciones
          </NavLink>
        </>
      );
    }

    // Si no tiene roles reconocidos, fallback genérico
    return (
      <NavLink to="/dashboard" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : "text-gray-600"}`}>
        Dashboard
      </NavLink>
    );
  };

  return (
    <>
      <nav style={{ backgroundColor: '#B8BBBF' }} className="shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <NavLink to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-800">
                <img src="/logo2.png" alt="Logo CodeScore" className="h-16 w-16" />
                <span>CodeScore</span>
              </NavLink>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                {renderNavLinks()}
              </div>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-2">
                {isLoggedIn ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-700">
                      {currentUser?.user?.nombre} ({displayedRole})
                    </span>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-md text-sm font-medium ${
                          isActive
                            ? "bg-blue-500 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        } transition-colors`
                      }
                    >
                      Iniciar Sesión
                    </NavLink>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-md text-sm font-medium ${
                          isActive
                            ? "bg-blue-700 text-white"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        } transition-colors`
                      }
                    >
                      Registrarse
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <LogoutModal isOpen={modalOpen} onClose={handleModalClose} />
    </>
  );
};

export default Navbar;
