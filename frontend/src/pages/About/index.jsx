const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Sobre Nosotros</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Nuestro Proyecto</h2>
        <p className="mb-4">
          Este es un proyecto de ejemplo que utiliza tecnologías modernas de desarrollo web:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Vite - Entorno de desarrollo rápido</li>
          <li>React - Biblioteca de UI</li>
          <li>Tailwind CSS - Framework de estilos utilitarios</li>
          <li>Axios - Cliente HTTP para peticiones a API</li>
          <li>React Router DOM - Manejo de rutas y navegación</li>
        </ul>
        <p>
          La combinación de estas tecnologías nos permite desarrollar aplicaciones web modernas
          con una excelente experiencia de desarrollo y rendimiento.
        </p>
      </div>
    </div>
  );
};

export default About;