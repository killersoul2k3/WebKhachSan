import React from 'react';
import { Form, Input, Button, Card, Typography, Space, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    // Simulate login logic
    if (values.username === 'admin' && values.password === '123456') {
      console.log('Login successful');
      message.success('Đăng nhập thành công!');
      navigate('/admin/dashboard');
    } else {
      console.log('Login failed');
      alert('Tên đăng nhập hoặc mật khẩu không đúng!'); // Simple alert for failed login
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%', padding: '50px 0', background: '#f0f2f5' }}>
        <Row justify="center">
            <Col>
                <Card title={<Title level={3} style={{ textAlign: 'center' }}>Đăng nhập Admin</Title>} style={{ width: 300 }}>
                    <Form
                        name="admin_login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên đăng nhập" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Mật khẩu"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    </Space>
  );
};

export default LoginPage; 