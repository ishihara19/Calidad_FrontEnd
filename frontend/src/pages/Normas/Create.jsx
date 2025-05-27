import React from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import NormaForm from '../../components/normas/NormaForm';
import { createNorma } from '../../api/normas';

const CreateNorma = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            await createNorma(values);
            message.success('Norma creada exitosamente');
            navigate('/normas');
        } catch (error) {
            message.error('Error al crear la norma');
        }
    };

    return (
        <div className="container">
            <h1>Crear Nueva Norma</h1>
            <NormaForm onSubmit={handleSubmit} />
        </div>
    );
};

export default CreateNorma;