import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Space, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const updatedMockUserRoles = [
  { username: 'admin', password: '123', role: 'admin' },
  { username: 'letan1', password: '123', role: 'letan1' },
  // ... các user khác
];

const { Title } = Typography;
const { Item } = Form;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  

  const onFinish = (values: any) => {
    setLoading(true);
    console.log('Success:', values);
      const ADMIN_USERNAME = 'admin';
      const ADMIN_PASSWORD = '123';
      const LETAN1_ROLE = 'letan1';
      const LETAN1_PASSWORD = '123';
    setTimeout(() => {
      setLoading(false);
      // Find the user in the updated mock data
      const authenticatedUser = updatedMockUserRoles.find(
        (user) => user.username === values.username && user.password === values.password
      );

      if (authenticatedUser) {
        message.success('Đăng nhập thành công!');
        // Store user info in localStorage (for demo purposes)
        localStorage.setItem('loggedInUser', JSON.stringify(authenticatedUser));
        navigate('/admin'); // Redirect to admin dashboard
      } else {
        message.error('Sai tên đăng nhập hoặc mật khẩu!');
      }
    }, 1000); // Simulate network request delay
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      <Card title="Đăng nhập Admin" style={{ width: 400 }}>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;