import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const LogoutModal = ({ isOpen, onClose }) => {
  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Overlay con animación */}
      <div className="absolute inset-0 backdrop-blur-[2px] transition-opacity duration-300" />
      
      {/* Modal container */}
      <div 
        className="relative bg-white dark:bg-white-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 animate-in fade-in-0 zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con botón de cerrar */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-black">
              Sesión cerrada
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4 text-gray-500 dark:text-black-400" />
          </button>
        </div>

        {/* Contenido */}
        <div className="px-6 pb-4">
          <p className="dark:text-black-300 leading-relaxed">
            Tu sesión se ha cerrado correctamente. Gracias por usar nuestra plataforma.
          </p>
        </div>

        {/* Footer con acciones */}
        <div className="flex justify-end space-x-3 p-6 pt-4 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;