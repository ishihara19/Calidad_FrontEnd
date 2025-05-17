import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Página no encontrada</p>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        La página que estás buscando no existe o ha sido movida.
      </p>
      <Link 
        to="/"
        className="px-6 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;