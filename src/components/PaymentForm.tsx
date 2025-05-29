import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import {
  CreditCardOutlined,
  CalendarOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const PaymentForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
    // Here you would typically integrate with a payment gateway
    message.success('Payment information submitted!');
    form.resetFields();
  };

  return (
    <Card style={{ maxWidth: 400, margin: '20px auto' }}>
      <Title level={4} style={{ textAlign: 'center', marginBottom: 24 }}>Payment Information</Title>
      <Form
        form={form}
        name="payment_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Card Number"
          name="cardNumber"
          rules={[
            { required: true, message: 'Please input your card number!' },
            {
              pattern: /^\d{16}$/,
              message: 'Card number must be 16 digits!',
            },
          ]}
        >
          <Input prefix={<CreditCardOutlined />} placeholder="Card Number" />
        </Form.Item>

        <Form.Item
          label="Cardholder Name"
          name="cardholderName"
          rules={[{ required: true, message: 'Please input cardholder name!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Cardholder Name" />
        </Form.Item>

        <Form.Item
          label="Expiry Date"
          name="expiryDate"
          rules={[
            { required: true, message: 'Please input expiry date (MM/YY)!' },
            {
              pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
              message: 'Expiry date must be in MM/YY format!',
            },
          ]}
        >
          <Input prefix={<CalendarOutlined />} placeholder="MM/YY" />
        </Form.Item>

        <Form.Item
          label="CVV"
          name="cvv"
          rules={[
            { required: true, message: 'Please input CVV!' },
            {
              pattern: /^\d{3}$/,
              message: 'CVV must be 3 digits!',
            },
          ]}
        >
          <Input prefix={<LockOutlined />} placeholder="CVV" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Submit Payment
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PaymentForm; 