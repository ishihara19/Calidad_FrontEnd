import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import NormaForm from '../../components/normas/NormaForm';
import { getNormaById, updateNorma } from '../../api/normas';

const EditNorma = () => {
    const [loading, setLoading] = useState(true);
    const [norma, setNorma] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchNorma();
    }, [id]);

    const fetchNorma = async () => {
        try {
            const response = await getNormaById(id);
            setNorma(response.data);
        } catch (error) {
            message.error('Error al cargar la norma');
            navigate('/normas');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values) => {
        try {
            await updateNorma(id, values);
            message.success('Norma actualizada exitosamente');
            navigate('/normas');
        } catch (error) {
            message.error('Error al actualizar la norma');
        }
    };

    if (loading) return <div>Cargando...</div>;

    return (
        <div className="container">
            <h1>Editar Norma</h1>
            <NormaForm initialValues={norma} onSubmit={handleSubmit} />
        </div>
    );
};

export default EditNorma;