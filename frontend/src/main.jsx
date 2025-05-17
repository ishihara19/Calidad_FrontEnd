import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // ✅ Importá el provider
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* ✅ Ahora todo tiene acceso al contexto */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);