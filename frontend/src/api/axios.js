import axios from 'axios';
const API_URL = import.meta.env.VITE_APP_API_URL
if (!API_URL) {
  console.error('⚠️ La variable de entorno VITE_APP_API_URL no está definida.');
}
const api = axios.create({
  baseURL: `${API_URL}`, // Cambia esto según tu API
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});
console.log('API URL:', API_URL);

export default api;