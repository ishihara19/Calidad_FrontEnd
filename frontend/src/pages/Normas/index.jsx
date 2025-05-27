import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Tag, message } from 'antd';
import { EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getNormas } from '../../api/normas';
import NormaCard from '../../components/normas/NormaCard';

const NormasPage = () => {
    const [normas, setNormas] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNormas();
    }, []);

    const fetchNormas = async () => {
        setLoading(true);
        try {
            const response = await getNormas();
            setNormas(response.data);
        } catch (error) {
            message.error('Error al cargar las normas');
        }
        setLoading(false);
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Normas de Calidad</h1>
                <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => navigate('/normas/crear')}
                >
                    Nueva Norma
                </Button>
            </div>
            <div className="content">
                {loading ? (
                    <div>Cargando...</div>
                ) : (
                    normas.map(norma => (
                        <NormaCard key={norma.id} norma={norma} />
                    ))
                )}
            </div>
        </div>
    );
};

export default NormasPage;