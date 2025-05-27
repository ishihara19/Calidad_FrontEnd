import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Button, Space, message, Tag } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import { getNormaById } from '../../api/normas';
import NormaActions from '../../components/normas/NormaActions';

const NormaDetail = () => {
    const [norma, setNorma] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchNorma();
    }, [id]);

    const fetchNorma = async () => {
        try {
            const response = await getNormaById(id);
            setNorma(response.data);
        } catch (error) {
            message.error('Error al cargar los detalles de la norma');
            navigate('/normas');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (!norma) return <div>Norma no encontrada</div>;

    return (
        <div className="container">
            <Card
                title={<h2>{norma.nombre}</h2>}
                extra={
                    <Space>
                        <Button 
                            icon={<EditOutlined />}
                            onClick={() => navigate(`/normas/${id}/editar`)}
                        >
                            Editar
                        </Button>
                        <NormaActions 
                            normaId={id} 
                            currentStatus={norma.estado}
                            onStatusChange={fetchNorma}
                        />
                    </Space>
                }
            >
                <Descriptions bordered>
                    <Descriptions.Item label="Versión">{norma.version}</Descriptions.Item>
                    <Descriptions.Item label="Estado">
                        <Tag color={
                            norma.estado === 'aprobada' ? 'green' :
                            norma.estado === 'revision' ? 'orange' :
                            norma.estado === 'borrador' ? 'blue' : 'red'
                        }>
                            {norma.estado.toUpperCase()}
                        </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Fecha de Creación">
                        {new Date(norma.fecha_creacion).toLocaleDateString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Última Actualización">
                        {new Date(norma.fecha_actualizacion).toLocaleDateString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Descripción" span={3}>
                        {norma.descripcion}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );
};

export default NormaDetail;