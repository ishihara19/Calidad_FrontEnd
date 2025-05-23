// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  // Clase para links activos
  const activeStyle = "text-blue-600 font-medium";
  // Clase base para todos los links
  const baseStyle = "px-3 py-2 rounded-md hover:bg-gray-100 transition-colors";
  
  const { isAuthenticated, currentUser, logout } = useAuth();
  const isLoggedIn = isAuthenticated();

  return (
    <nav style={{ backgroundColor: '#B8BBBF' }} className="shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-800">
              <img src="/public/logo2.png" alt="Logo CodeScore" className="h-16 w-16" />
              <span>CodeScore</span>
            </NavLink>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <NavLink 
                to="/" 
                end
                className={({ isActive }) => 
                  `${baseStyle} ${isActive ? activeStyle : "text-gray-600"}`
                }
              >
                Inicio
              </NavLink>
              
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `${baseStyle} ${isActive ? activeStyle : "text-gray-600"}`
                }
              >
                Sobre Nosotros
              </NavLink>
              
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `${baseStyle} ${isActive ? activeStyle : "text-gray-600"}`
                }
              >
                Contacto
              </NavLink>
              
              {isLoggedIn && (
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => 
                    `${baseStyle} ${isActive ? activeStyle : "text-gray-600"}`
                  }
                >
                  Dashboard
                </NavLink>
              )}
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  {/*<span className="text-sm text-gray-700">
                    Hola, {currentUser.user?.nombre}
                  </span>*/}
                  <button
                    onClick={logout}
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
  );
};

export default Navbar;