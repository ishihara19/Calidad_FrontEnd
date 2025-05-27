// src/pages/QuienesSomos/index.jsx
import { Code, Database, Shield, Zap, Users, Target, Award, Cpu } from 'lucide-react';

const QuienesSomos = () => {
  const tecnologias = [
    {
      icon: <Code className="h-8 w-8 text-blue-600" />,
      nombre: "React & Vite",
      descripcion: "Frontend moderno con React 18 y Vite para desarrollo rápido"
    },
    {
      icon: <Database className="h-8 w-8 text-green-600" />,
      nombre: "Django REST",
      descripcion: "Backend robusto con Django REST Framework para APIs escalables"
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      nombre: "Autenticación Segura",
      descripcion: "Sistema de tokens y roles para máxima seguridad"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      nombre: "Tailwind CSS",
      descripcion: "Diseño responsive y moderno con Tailwind CSS"
    }
  ];

  const valores = [
    {
      icon: <Target className="h-12 w-12 text-blue-600" />,
      titulo: "Precisión",
      descripcion: "Evaluaciones exactas basadas en estándares internacionales como ISO 25000"
    },
    {
      icon: <Users className="h-12 w-12 text-green-600" />,
      titulo: "Colaboración",
      descripcion: "Facilitamos la comunicación entre equipos de desarrollo y evaluadores"
    },
    {
      icon: <Award className="h-12 w-12 text-purple-600" />,
      titulo: "Excelencia",
      descripcion: "Comprometidos con la más alta calidad en evaluación de software"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <Cpu className="h-16 w-16 text-blue-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Sobre <span className="text-blue-600">CodeScore</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Somos una empresa especializada en la <strong>evaluación de calidad de software</strong> 
            basada en estándares internacionales. Nuestra plataforma revoluciona la forma en que 
            las empresas evalúan y mejoran sus sistemas de software.
          </p>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-blue-50 p-8 rounded-2xl">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Nuestra Misión</h2>
              <p className="text-gray-700 leading-relaxed">
                Proporcionar herramientas avanzadas de evaluación de software que permitan a las 
                empresas identificar, medir y mejorar la calidad de sus sistemas, garantizando 
                el cumplimiento de estándares internacionales como ISO 25000 e IEEE 730.
              </p>
            </div>
            <div className="bg-green-50 p-8 rounded-2xl">
              <h2 className="text-3xl font-bold text-green-900 mb-4">Nuestra Visión</h2>
              <p className="text-gray-700 leading-relaxed">
                Ser la plataforma líder en evaluación de calidad de software en América Latina, 
                estableciendo nuevos estándares en la industria y facilitando la transformación 
                digital de las empresas a través de software de alta calidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestras Tecnologías */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestras Tecnologías</h2>
            <p className="text-xl text-gray-600">
              Utilizamos las tecnologías más modernas para garantizar rendimiento y escalabilidad
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tecnologias.map((tech, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">
                  {tech.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                  {tech.nombre}
                </h3>
                <p className="text-gray-600 text-center text-sm">
                  {tech.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestros Valores */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Valores</h2>
            <p className="text-xl text-gray-600">
              Los principios que guían nuestro trabajo diario
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {valores.map((valor, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="flex justify-center mb-6">
                  {valor.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {valor.titulo}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {valor.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué Hacemos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Qué Hacemos?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Evaluación Integral de Software
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full mt-1">
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Evaluación basada en normas</h4>
                    <p className="text-gray-600">ISO 25000, IEEE 730 y otros estándares internacionales</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-full mt-1">
                    <Target className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Evaluación dinámica</h4>
                    <p className="text-gray-600">Selecciona qué aspectos evaluar según tus necesidades</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full mt-1">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Gestión de riesgos</h4>
                    <p className="text-gray-600">Matriz de riesgos integrada para análisis completo</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                📊 Proceso de Evaluación
              </h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  <span>Registro de empresa y sistemas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                  <span>Selección de norma de evaluación</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                  <span>Evaluación dinámica por expertos</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                  <span>Reportes detallados y recomendaciones</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuienesSomos;