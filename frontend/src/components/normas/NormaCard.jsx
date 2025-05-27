import React from 'react';
import { Card, Tag, Space, Button } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const NormaCard = ({ norma }) => {
    const navigate = useNavigate();

    const getEstadoTag = (estado) => {
        const estados = {
            'borrador': 'blue',
            'revision': 'orange',
            'aprobada': 'green',
            'obsoleta': 'red'
        };
        return estados[estado] || 'default';
    };

    return (
        <Card 
            title={norma.nombre}
            extra={
                <Tag color={getEstadoTag(norma.estado)}>
                    {norma.estado.toUpperCase()}
                </Tag>
            }
        >
            <p><strong>Versión:</strong> {norma.version}</p>
            <p>{norma.descripcion}</p>
            <Space>
                <Button 
                    icon={<EditOutlined />}
                    onClick={() => navigate(`/normas/${norma.id}/editar`)}
                >
                    Editar
                </Button>
                <Button 
                    icon={<EyeOutlined />}
                    onClick={() => navigate(`/normas/${norma.id}`)}
                >
                    Ver Detalles
                </Button>
            </Space>
        </Card>
    );
};

export default NormaCard;