import React from 'react';
import { Layout, Menu, Button, Typography, Space } from 'antd';
import { 
  DashboardOutlined, 
  HomeOutlined, 
  BookOutlined, 
  UserOutlined, 
  SettingOutlined,
  DollarOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const handleMenuClick = (e: any) => {
    switch (e.key) {
      case 'dashboard':
        break;
      case 'rooms':
        navigate('/admin/rooms');
        break;
      case 'bookings':
        navigate('/admin/bookings');
        break;
      case 'customers':
        navigate('/admin/customers');
        break;
      case 'services':
        navigate('/admin/services');
        break;
      case 'invoices':
        navigate('/admin/invoices');
        break;
      case 'users':
        navigate('/admin/users');
        break;
      default:
        break;
    }
  };

   const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <div className="logo" style={{ color: 'white' }}>Admin Dashboard</div>
        <Space>
           <Button type="text" icon={<HomeOutlined style={{ color: 'white' }}/>} onClick={() => navigate('/')} style={{ color: 'white' }}>
            Về trang chủ
          </Button>
           <Button type="text" icon={<LogoutOutlined style={{ color: 'white' }}/>} onClick={handleLogout} style={{ color: 'white' }}>
            Đăng xuất
          </Button>
        </Space>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['dashboard']}
            style={{ height: '100%', borderRight: 0 }}
            onClick={handleMenuClick}
            items={[
              { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
              { key: 'rooms', icon: <HomeOutlined />, label: 'Quản lý phòng' },
              { key: 'bookings', icon: <BookOutlined />, label: 'Quản lý đặt phòng' },
              { key: 'customers', icon: <UserOutlined />, label: 'Quản lý khách hàng' },
              { key: 'services', icon: <SettingOutlined />, label: 'Quản lý dịch vụ' },
              { key: 'invoices', icon: <DollarOutlined />, label: 'Quản lý hóa đơn/thanh toán' },
              { key: 'users', icon: <UserOutlined />, label: 'Quản lý người dùng' },
            ]}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Title level={3}>Chào mừng đến với Admin Dashboard</Title>
            <p>Chọn một mục từ menu bên trái để quản lý.</p>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminDashboardPage; 