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
import AdminDashboard from './pages/AdministradorDashboard';
import AdminEmpresas from './pages/AdministradorEmpresas';
import AdminSistemas from './pages/AdministradorSistemas';
import EvaluadorEvaluarSistema from './pages/EvaluadorEvaluarSistema';
import EvaluadorEvaluaciones from './pages/EvaluadorEvaluaciones';
import EvaluadorReportes from './pages/EvaluadorReportes';
import UsuarioMisEvaluaciones from './pages/UsuarioMisEvaluaciones';
import UsuarioMisSistemas from './pages/UsuarioMisSistemas';
import RiskMatrixApp from './pages/UsuarioCrearMatriz';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Rutas públicas */}
        <Route index element={<QuienesSomos />} />
        <Route path="quienes-somos" element={<QuienesSomos />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        
        {/* Rutas de autenticación */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        {/* Rutas para Usuarios_Empresa */}
        <Route path="inicio" element={<InicioUsuarioEmpresa />} />
        <Route path="perfil" element={<PerfilUsuarioEmpresa />} />
        <Route path="mis-evaluaciones" element={<UsuarioMisEvaluaciones />} />
        <Route path="mis-sistemas" element={<UsuarioMisSistemas />} />
        <Route path="generar-matriz-riesgo" element={<RiskMatrixApp />} />
        <Route path="matrices" element={<div>Página en desarrollo - Matrices</div>} />
        
        {/* Rutas para Administradores */}
        <Route path="admin/dashboard" element={<AdminDashboard/>} />
        <Route path="admin/empresas" element={<AdminEmpresas/>} />
        <Route path="admin/sistemas" element={<AdminSistemas/>} />
      
        {/* Rutas para Evaluadores */}
        <Route path="evaluador/dashboard" element={<EvaluadorDashboard />} />
        <Route path="evaluador/empresas" element={<EvaluadorEmpresas />} />
        <Route path="evaluador/empresa/:empresaId/sistemas" element={<EvaluadorSistemasEmpresa />} />
        <Route path="evaluador/sistema/:sistemaId/detalle" element={<EvaluadorDetalleSistema />} />
        <Route path="evaluador/sistema/:sistemaId/evaluar" element={<EvaluadorEvaluarSistema/>} />
        <Route path="evaluador/evaluaciones" element={<EvaluadorEvaluaciones/>} />
        <Route path="evaluador/evaluacion/:evaluacionId/detalle" element={<div>Detalle de Evaluación - En desarrollo</div>} />

        {/* Rutas genéricas (fallback) */}
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