import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Proyectos from './pages/Proyectos';
import EvaluacionDetalle from './pages/EvaluacionDetalle';
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
        <Route index element={<Home />} />
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path="proyectos" element={<Proyectos />} />
        <Route path="evaluacion/:id" element={<EvaluacionDetalle />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/normas" element={<NormasIndex />} />
        <Route path="/normas/crear" element={<CreateNorma />} />
        <Route path="/normas/:id" element={<NormaDetail />} />
        <Route path="/normas/:id/editar" element={<EditNorma />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
   
  )
}

export default App
