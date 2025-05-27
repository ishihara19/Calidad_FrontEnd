import React from 'react';
import { Button, Space, message, Popconfirm } from 'antd';
import { CheckCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { approveNorma, reviewNorma } from '../../api/normas';

const NormaActions = ({ normaId, currentStatus, onStatusChange }) => {
    const handleApprove = async () => {
        try {
            await approveNorma(normaId);
            message.success('Norma aprobada exitosamente');
            onStatusChange();
        } catch (error) {
            message.error('Error al aprobar la norma');
        }
    };

    const handleReview = async () => {
        try {
            await reviewNorma(normaId);
            message.success('Norma enviada a revisión');
            onStatusChange();
        } catch (error) {
            message.error('Error al enviar la norma a revisión');
        }
    };

    return (
        <Space>
            {currentStatus === 'borrador' && (
                <Popconfirm
                    title="¿Enviar a revisión?"
                    onConfirm={handleReview}
                >
                    <Button 
                        icon={<EyeOutlined />}
                        type="primary"
                        ghost
                    >
                        Enviar a Revisión
                    </Button>
                </Popconfirm>
            )}
            
            {currentStatus === 'revision' && (
                <Popconfirm
                    title="¿Aprobar norma?"
                    onConfirm={handleApprove}
                >
                    <Button 
                        icon={<CheckCircleOutlined />}
                        type="primary"
                    >
                        Aprobar
                    </Button>
                </Popconfirm>
            )}
        </Space>
    );
};

export default NormaActions;