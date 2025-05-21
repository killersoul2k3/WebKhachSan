import React from 'react';
import { Layout, Menu, Carousel, Row, Col, Card, Form, Input, Button, message } from 'antd';
import {
  FacebookOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import 'antd/dist/reset.css';
import './HomePage.css';

const { Header, Content, Footer } = Layout;

const images = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80',
];

// Define types for event and food data
interface Event {
  title: string;
  img: string;
}

interface Food {
  name: string;
  img: string;
}

// Mock data for events and foods (added back)
const events: Event[] = [
  { title: 'Sự kiện cưới hỏi', img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
  { title: 'Hội nghị doanh nghiệp', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80' },
  { title: 'Tiệc buffet cuối tuần', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
];

const foods: Food[] = [
  { name: 'Buffet sáng', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
  { name: 'Ẩm thực Á Âu', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80' },
  { name: 'Đặc sản địa phương', img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80' },
];

const HomePage: React.FC = () => {
  const onFinish = (values: any) => {
    // Xử lý booking form ở đây
    console.log('Success:', values);
    message.success('Bạn đã đặt phòng thành công!');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Bạn đã nhập sai thông tin. Vui lòng kiểm tra lại các trường.');
  };

  const navigate = useNavigate();

  return (
    <Layout>
      <Header className="main-header">
        <div className="logo">HOTEL LUXURY</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" onClick={() => navigate('/')}>Trang chủ</Menu.Item>
          <Menu.Item key="2" onClick={() => navigate('/rooms')}>Phòng</Menu.Item>
          <Menu.Item key="about" onClick={() => navigate('/about')}>Giới thiệu</Menu.Item>
          <Menu.Item key="admin-login">
            <Link to="/login">Admin Login</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <div className="hero-section">
          <Carousel autoplay effect="fade" className="main-carousel">
            {images.map((img, idx) => (
              <div key={idx}>
                <img src={img} alt="hotel" className="carousel-img" />
              </div>
            ))}
          </Carousel>
          <div className="hero-text">
            <h1>Chào mừng đến với HOTEL LUXURY</h1>
            <p>Khách sạn 5 sao với dịch vụ đẳng cấp, không gian sang trọng và tiện nghi hiện đại bậc nhất thành phố.</p>
          </div>
        </div>

        {/* Added back About section */} 
        <div className="section about-section">
          <Row gutter={32} align="middle">
            <Col md={12} xs={24}>
              <h2>Về khách sạn</h2>
              <p>Khách sạn Luxury là điểm đến lý tưởng cho kỳ nghỉ dưỡng, hội nghị và các sự kiện quan trọng. Chúng tôi cam kết mang đến trải nghiệm tuyệt vời nhất cho mọi khách hàng.</p>
            </Col>
            <Col md={12} xs={24}>
              <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="about hotel" className="about-img" />
            </Col>
          </Row>
        </div>

        {/* Added back Event section */} 
        <div className="section event-section">
          <h2>Sự kiện nổi bật</h2>
          <Row gutter={24}>
            {events.map((event, idx) => (
              <Col md={8} xs={24} key={idx}>
                <Card
                  hoverable
                  cover={<img alt={event.title} src={event.img} className="event-img" />}
                >
                  <Card.Meta title={event.title} />
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Added back Food section */} 
        <div className="section food-section">
          <h2>Ẩm thực & Bữa ăn</h2>
          <Row gutter={24}>
            {foods.map((food, idx) => (
              <Col md={8} xs={24} key={idx}>
                <Card
                  hoverable
                  cover={<img alt={food.name} src={food.img} className="food-img" />}
                >
                  <Card.Meta title={food.name} />
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <div className="divider-line"></div>

        {/* Moved footer content into Content section */} 
        <div className="section main-footer"> {/* Reusing main-footer class for styles */} 
          <Row gutter={32} justify="end"> {/* Row to align content to the right, using gutter for spacing */}
            <Col md={8} xs={24}> {/* Column for Contact Info */}
              <h3>HOTEL LUXURY</h3>
              <p>Địa chỉ: 123 Đường Biển, Quận Du Lịch, TP. Biển Xanh</p>
              <p><PhoneOutlined /> 0123 456 789</p>
              <p><MailOutlined /> info@hotelluxury.com</p>
            </Col>
            <Col md={8} xs={24}> {/* Column for Connect with Us */} 
              <h3>Kết nối với chúng tôi</h3>
              <p><FacebookOutlined /> Facebook</p>
              <p><EnvironmentOutlined /> Xem bản đồ</p>
            </Col>
            <Col md={8} xs={24}> {/* Column for Map */} 
              <iframe
                title="hotel-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.005839013733!2d105.7803633154027!3d21.03065339312739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab3b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2zQ8O0bmcgVHkgQ-G7lSBQaMO6bmcgQ2Fv!5e0!3m2!1svi!2s!4v1620000000000!5m2!1svi!2s" width="100%" height="120" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
            </Col>
          </Row>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            © {new Date().getFullYear()} HOTEL LUXURY. All rights reserved.
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default HomePage; 