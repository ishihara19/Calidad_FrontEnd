// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import QuienesSomos from './pages/QuienesSomos';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Proyectos from './pages/Proyectos';
import EvaluacionDetalle from './pages/EvaluacionDetalle';
import InicioUsuarioEmpresa from './pages/InicioUsuarioEmpresa';
import PerfilUsuarioEmpresa from './pages/PerfilUsuarioEmpresa';

// Componentes del Evaluador
import EvaluadorDashboard from './pages/EvaluadorDashboard';
import EvaluadorEmpresas from './pages/EvaluadorEmpresas';
import EvaluadorSistemasEmpresa from './pages/EvaluadorSistemasEmpresa';
import EvaluadorDetalleSistema from './pages/EvaluadorDetalleSistema';

import './App.css';

// Importar componentes de Normas
import NormasIndex from './pages/Normas/index';
import CreateNorma from './pages/Normas/Create';
import EditNorma from './pages/Normas/Edit';
import NormaDetail from './pages/Normas/Detail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Rutas públicas */}
        <Route index element={<Home />} />
        <Route path="quienes-somos" element={<QuienesSomos />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        
        {/* Rutas de autenticación */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        {/* Rutas para Usuarios_Empresa */}
        <Route path="inicio" element={<InicioUsuarioEmpresa />} />
        <Route path="perfil" element={<PerfilUsuarioEmpresa />} />
        <Route path="mis-evaluaciones" element={<div>Página en desarrollo - Mis Evaluaciones</div>} />
        <Route path="mis-proyectos" element={<div>Página en desarrollo - Mis Proyectos</div>} />
        <Route path="generar-matriz-riesgo" element={<div>Página en desarrollo - Generar Matriz de Riesgo</div>} />
        <Route path="matrices" element={<div>Página en desarrollo - Matrices</div>} />
        
        {/* Rutas para Administradores */}
        <Route path="admin/dashboard" element={<div>Dashboard Administrador</div>} />
        <Route path="admin/empresas" element={<div>Gestión de Empresas</div>} />
        <Route path="admin/sistemas" element={<div>Gestión de Sistemas</div>} />
        
        {/* Rutas para Evaluadores */}
        <Route path="evaluador/dashboard" element={<EvaluadorDashboard />} />
        <Route path="evaluador/empresas" element={<EvaluadorEmpresas />} />
        <Route path="evaluador/empresa/:empresaId/sistemas" element={<EvaluadorSistemasEmpresa />} />
        <Route path="evaluador/sistema/:sistemaId/detalle" element={<EvaluadorDetalleSistema />} />
        <Route path="evaluador/sistema/:sistemaId/evaluar" element={<div>Página de Evaluación - En desarrollo</div>} />
        <Route path="evaluador/evaluaciones" element={<div>Mis Evaluaciones</div>} />
        <Route path="evaluador/nueva-evaluacion" element={<div>Nueva Evaluación - En desarrollo</div>} />
        <Route path="evaluador/reportes" element={<div>Reportes - En desarrollo</div>} />
        <Route path="evaluador/evaluacion/:evaluacionId/detalle" element={<div>Detalle de Evaluación - En desarrollo</div>} />
        
        {/* Rutas genéricas (fallback) */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="proyectos" element={<Proyectos />} />
        <Route path="evaluacion/:id" element={<EvaluacionDetalle />} />
        
        {/* Rutas de Normas */}
        <Route path="normas" element={<NormasIndex />} />
        <Route path="normas/crear" element={<CreateNorma />} />
        <Route path="normas/:id" element={<NormaDetail />} />
        <Route path="normas/:id/editar" element={<EditNorma />} />
        
        {/* Ruta 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;