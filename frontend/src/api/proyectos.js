import api from './axios';

export const fetchProyectos = () => api.get('proyectos/');

export const fetchEvaluacionResultados = (evaluacionId) =>
  api.get(`evaluaciones/${evaluacionId}/resultados/`);
