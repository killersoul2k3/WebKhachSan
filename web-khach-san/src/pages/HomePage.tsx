import React, { useState, useEffect } from 'react';
import { Layout, Menu, Carousel, Row, Col, Card, Form, Input, Button, message, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  
  FacebookOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import 'antd/dist/reset.css';
import './HomePage.css';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;
const { Meta } = Card;

const bannerImages = [
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
const mockEvents: Event[] = [
  { title: 'Sự kiện cưới hỏi', img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
  { title: 'Hội nghị doanh nghiệp', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80' },
  { title: 'Tiệc buffet cuối tuần', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
];

const mockFoods: Food[] = [
  { name: 'Buffet sáng', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
  { name: 'Ẩm thực Á Âu', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80' },
  { name: 'Đặc sản địa phương', img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80' },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([
    'https://img.rawpixel.com/private/static/images/website/2022-05/v904-nn-001-k.jpg?w=800&dpr=1&fit=crop&auto=format&fm=jpg&crop=entropy&cs=srgb&ixlib=rb-1.1.0&ch=preset&s=44cf12383b67d34ef780455f363ac280',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1563103649-9cd07b92183b?auto=format&fit=crop&w=600&q=60',
  ]);

  const [events, setEvents] = useState<Event[]>(mockEvents);

  const onFinish = (values: any) => {
    // Xử lý booking form ở đây
    console.log('Success:', values);
    message.success('Bạn đã đặt phòng thành công!');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Bạn đã nhập sai thông tin. Vui lòng kiểm tra lại các trường.');
  };

  return (
    <Layout>
      <Header className="main-header">
        <div className="logo">HOTEL LUXURY</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={[
          { key: '1', label: 'Trang chủ', onClick: () => navigate('/') },
          { key: '2', label: 'Phòng', onClick: () => navigate('/rooms') },
          { key: 'about', label: 'Giới thiệu', onClick: () => navigate('/about') },
          { key: 'admin-login', label: <Link to="/login">Admin Login</Link> },
        ]} />
      </Header>
      <Content>
        <div className="hero-section">
          <Carousel autoplay effect="fade" className="main-carousel">
            {bannerImages.map((img, idx) => (
              <div key={idx}>
                <img src={img} alt="hotel" className="carousel-img" />
              </div>
            ))}
          </Carousel>
          <div className="hero-text">
            <Typography.Title>Chào mừng đến với HOTEL LUXURY</Typography.Title>
            <Typography.Paragraph>Khách sạn 5 sao với dịch vụ đẳng cấp, không gian sang trọng và tiện nghi hiện đại bậc nhất thành phố.</Typography.Paragraph>
          </div>
        </div>

        <div className="section about-section">
          <Row gutter={32} align="middle">
            <Col md={12} xs={24}>
              <Typography.Title level={2}>Chào mừng đến với Câu chuyện của HOTEL LUXURY</Typography.Title>
              <Typography.Paragraph>
                Tại HOTEL LUXURY, chúng tôi không chỉ cung cấp dịch vụ lưu trú, mà còn kiến tạo nên những trải nghiệm đáng nhớ. Tọa lạc tại vị trí đắc địa, với kiến trúc độc đáo kết hợp giữa nét cổ điển và hiện đại, chúng tôi mang đến không gian nghỉ dưỡng lý tưởng, sang trọng và yên bình giữa lòng thành phố sôi động.
              </Typography.Paragraph>
              <Typography.Paragraph>
                Với đội ngũ nhân viên chuyên nghiệp, tận tâm, chúng tôi cam kết phục vụ quý khách bằng sự chu đáo và mến khách nhất. Từ ẩm thực tinh tế, các tiện nghi đẳng cấp thế giới đến dịch vụ spa thư giãn, mọi chi tiết tại HOTEL LUXURY đều được chăm chút tỉ mỉ để đảm bảo kỳ nghỉ của bạn là hoàn hảo.
              </Typography.Paragraph>
              <Typography.Paragraph>
                Hãy để HOTEL LUXURY trở thành ngôi nhà thứ hai của bạn, nơi mỗi khoảnh khắc đều là sự tận hưởng trọn vẹn.
              </Typography.Paragraph>
            </Col>
            <Col md={12} xs={24}>
              <img src="https://images.squarespace-cdn.com/content/v1/5aadf482aa49a1d810879b88/1626698419120-J7CH9BPMB2YI728SLFPN/1.jpg" alt="about hotel" className="about-img" />
            </Col>
          </Row>
        </div>

        <div className="section event-section">
          <Typography.Title level={2}>Sự kiện nổi bật</Typography.Title>
          <Row gutter={24}>
            {events.map((event, idx) => (
              <Col md={8} xs={24} key={idx}>
                <Card
                  hoverable
                  cover={<img alt={event.title} src={event.img} className="event-img" style={{ height: 200, objectFit: 'cover' }} />}
                >
                  <Card.Meta title={event.title} />
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <div className="section food-section">
          <Typography.Title level={2}>Ẩm thực & Bữa ăn</Typography.Title>
          <Row gutter={24}>
            {mockFoods.map((food, idx) => (
              <Col md={8} xs={24} key={idx}>
                <Link to={`/foods/${food.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Card
                    hoverable
                    cover={<img alt={food.name} src={food.img} className="food-img" style={{ height: 200, objectFit: 'cover' }} />}
                  >
                    <Card.Meta title={food.name} />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>

        <div className="divider-line"></div>

        <div className="section main-footer">
          <Row gutter={32} justify="end">
            <Col md={8} xs={24}>
              <Typography.Title level={3}>HOTEL LUXURY</Typography.Title>
              <Typography.Paragraph>Địa chỉ: 123 Đường Biển, Quận Du Lịch, TP. Biển Xanh</Typography.Paragraph>
              <Typography.Paragraph><PhoneOutlined /> 0123 456 789</Typography.Paragraph>
              <Typography.Paragraph><MailOutlined /> info@hotelluxury.com</Typography.Paragraph>
            </Col>
            <Col md={8} xs={24}>
              <Typography.Title level={3}>Kết nối với chúng tôi</Typography.Title>
              <Typography.Paragraph><FacebookOutlined /> Facebook</Typography.Paragraph>
              <Typography.Paragraph><EnvironmentOutlined /> Xem bản đồ</Typography.Paragraph>
            </Col>
            <Col md={8} xs={24}>
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