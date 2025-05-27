import axios from './axios';

export const getNormas = async () => {
    return await axios.get('listar-normas');
};

export const getNormaById = async (id) => {
    return await axios.get(`listar-norma/${id}`);
};

export const createNorma = async (normaData) => {
    return await axios.post('normas/', normaData);
};

export const updateNorma = async (id, normaData) => {
    return await axios.put(`normas/${id}/`, normaData);
};

export const approveNorma = async (id) => {
    return await axios.post(`normas/${id}/approve/`);
};

export const reviewNorma = async (id) => {
    return await axios.post(`normas/${id}/review/`);
};