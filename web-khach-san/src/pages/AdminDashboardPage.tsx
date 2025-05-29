import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { 
  DashboardOutlined, 
  HomeOutlined, 
  BookOutlined,
  UserOutlined, 
  FileTextOutlined,
  CustomerServiceOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';

const { Content } = Layout;

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const handleMenuClick = (e: any) => {
    navigate(`/admin/${e.key}`);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <div style={{ padding: '16px 24px', background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
        <Button type="default" icon={<HomeOutlined />} onClick={() => navigate('/')}>
          Về trang chủ
        </Button>
      </div>

      <Layout>
        <Layout.Sider width={200} className="site-layout-background">
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
              { key: 'invoices', icon: <FileTextOutlined />, label: 'Quản lý hóa đơn & thanh toán' },
              { key: 'services', icon: <CustomerServiceOutlined />, label: 'Quản lý dịch vụ' },
              { key: 'users', icon: <TeamOutlined />, label: 'Phân quyền người dùng' },
              { key: 'bot-chat', icon: <CustomerServiceOutlined />, label: 'Chat Bot' }, // Thêm dòng này
            ]}
          />
        </Layout.Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet /> {/* This is where the nested route components will render */}
          </Content>
        </Layout>
      </Layout>
      
    </Layout>
  );
};

export default AdminDashboardPage;