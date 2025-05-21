import React from 'react';
import { Layout, Menu } from 'antd';
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

const { Content, Sider } = Layout;

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const handleMenuClick = (e: any) => {
    navigate(`/admin/${e.key}`);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          style={{ height: '100%', borderRight: 0 }}
          onClick={handleMenuClick}
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="rooms" icon={<HomeOutlined />}>
            Quản lý phòng
          </Menu.Item>
          <Menu.Item key="bookings" icon={<BookOutlined />}>
            Quản lý đặt phòng
          </Menu.Item>
          <Menu.Item key="customers" icon={<UserOutlined />}>
            Quản lý khách hàng
          </Menu.Item>
          <Menu.Item key="invoices" icon={<FileTextOutlined />}>
            Quản lý hóa đơn & thanh toán
          </Menu.Item>
          <Menu.Item key="services" icon={<CustomerServiceOutlined />}>
            Quản lý dịch vụ
          </Menu.Item>
          <Menu.Item key="users" icon={<TeamOutlined />}>
            Phân quyền người dùng
          </Menu.Item>
        </Menu>
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
          <Outlet /> {/* This is where the nested route components will render */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboardPage; 