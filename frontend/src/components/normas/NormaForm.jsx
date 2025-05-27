import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const { TextArea } = Input;

const NormaForm = ({ initialValues, onSubmit }) => {
    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            onFinish={onSubmit}
        >
            <Form.Item
                name="nombre"
                label="Nombre"
                rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="descripcion"
                label="Descripción"
                rules={[{ required: true, message: 'Por favor ingrese la descripción' }]}
            >
                <TextArea rows={4} />
            </Form.Item>

            <Form.Item
                name="version"
                label="Versión"
                rules={[{ required: true, message: 'Por favor ingrese la versión' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="estado"
                label="Estado"
                rules={[{ required: true, message: 'Por favor seleccione el estado' }]}
            >
                <Select>
                    <Select.Option value="borrador">Borrador</Select.Option>
                    <Select.Option value="revision">En Revisión</Select.Option>
                    <Select.Option value="aprobada">Aprobada</Select.Option>
                    <Select.Option value="obsoleta">Obsoleta</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Guardar
                </Button>
            </Form.Item>
        </Form>
    );
};

export default NormaForm;