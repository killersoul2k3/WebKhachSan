import React, { useState, useEffect } from 'react';
import { Layout, Menu, Carousel, Row, Col, Card, Form, Input, Button, message, Typography, Space, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;
const { Item: FormItem } = Form;

// Dummy data for carousel
const images = [
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1596436889106-be35e84e6f9b?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
];

// Dummy data for events (reused from AboutPage)
const events = [
  { title: 'Hội nghị khách hàng 2024', img: 'https://via.placeholder.com/600x400', description: 'Sự kiện thường niên kết nối khách hàng và đối tác.' },
  { title: 'Gala Dinner cuối năm', img: 'https://via.placeholder.com/600x400', description: 'Đêm tiệc sang trọng tri ân khách hàng thân thiết.' },
  { title: 'Workshop pha chế Cocktail', img: 'https://via.placeholder.com/600x400', description: 'Trải nghiệm tự tay pha chế những ly cocktail hấp dẫn.' },
];

// Dummy data for foods
const mockFoods = [
  { name: 'Buffet Hải sản', img: 'https://via.placeholder.com/600x400', description: 'Thưởng thức hải sản tươi sống và đa dạng.' },
  { name: 'Ẩm thực Á-Âu', img: 'https://via.placeholder.com/600x400', description: 'Khám phá hương vị độc đáo từ hai nền ẩm thực.' },
  { name: 'Trà chiều và Bánh ngọt', img: 'https://via.placeholder.com/600x400', description: 'Khoảnh khắc thư giãn với trà và bánh ngọt.' },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const onContactFormFinish = (values: any) => {
    console.log('Received values of form:', values);
    message.success('Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất!');
    // You would typically send this data to a backend service
  };

  const menuItems = [
    { key: '1', label: 'Trang chủ', onClick: () => navigate('/') },
    { key: '2', label: 'Phòng', onClick: () => navigate('/rooms') },
    { key: 'about', label: 'Giới thiệu', onClick: () => navigate('/about') },
    { key: 'contact', label: 'Liên hệ', onClick: () => navigate('/contact') },
    {
      key: 'admin',
      label: (
        <Link to="/admin" style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
          Admin Dashboard
        </Link>
      ),
    },
     { key: 'login', label: 'Đăng nhập', onClick: () => navigate('/login') },
  ];

  return (
    <Layout className="layout">
      <Header className="main-header">
        <div className="logo">HOTEL LUXURY</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={menuItems} />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="hero-section">
          <Carousel autoplay effect="fade" className="main-carousel">
            {images.map((img, idx) => (
              <div key={idx}>
                <img src={img} alt="hotel" className="carousel-img" style={{ width: '100%', maxHeight: 500, objectFit: 'cover' }} />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="site-layout-content" style={{ padding: '24px 0' }}>
          <div className="section about-section">
            <Row gutter={32} align="middle">
              <Col md={12} xs={24}>
                <Title level={2}>Chào mừng đến với Câu chuyện của HOTEL LUXURY</Title>
                <Paragraph>
                  Tại HOTEL LUXURY, chúng tôi không chỉ cung cấp dịch vụ lưu trú, mà còn kiến tạo nên những trải nghiệm đáng nhớ. Tọa lạc tại vị trí đắc địa, với kiến trúc độc đáo kết hợp giữa nét cổ điển và hiện đại, chúng tôi mang đến không gian nghỉ dưỡng lý tưởng, sang trọng và yên bình giữa lòng thành phố sôi động.
                </Paragraph>
                <Paragraph>
                  Chúng tôi tự hào về đội ngũ nhân viên chuyên nghiệp, tận tâm, luôn sẵn sàng phục vụ quý khách với sự chu đáo và mến khách. Từ những tiện nghi hiện đại đến các dịch vụ cá nhân hóa, mọi chi tiết đều được chăm chút tỉ mỉ để mang đến sự hài lòng tuyệt đối.
                </Paragraph>
              </Col>
              <Col md={12} xs={24}>
                <img src="https://images.squarespace-cdn.com/content/v1/5aadf482aa49a1d810879b88/1626698419120-J7CH9BPMB2YI728SLFPN/1.jpg" alt="about hotel" className="about-img" style={{ width: '100%', height: 'auto' }} />
              </Col>
            </Row>
          </div>

          <Divider />

          <div className="section event-section">
            <Title level={2}>Sự kiện nổi bật</Title>
            <Row gutter={24}>
              {events.map((event, idx) => (
                <Col md={8} xs={24} key={idx}>
                  <Card
                    hoverable
                    cover={<img alt={event.title} src={event.img} className="event-img" style={{ height: 200, objectFit: 'cover' }} />}
                  >
                    <Card.Meta title={event.title} description={event.description} />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

           <Divider />

          <div className="section food-section">
            <Title level={2}>Ẩm thực & Bữa ăn</Title>
            <Row gutter={24}>
              {mockFoods.map((food, idx) => (
                <Col md={8} xs={24} key={idx}>
                  <Link to={`/foods/${food.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Card
                      hoverable
                      cover={<img alt={food.name} src={food.img} className="food-img" style={{ height: 200, objectFit: 'cover' }} />}
                    >
                      <Card.Meta title={food.name} description={food.description} />
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>

           <Divider />

           {/* Simple Contact Form Section */}
           <div className="section contact-section">
               <Title level={2} style={{ textAlign: 'center' }}>Liên hệ chúng tôi</Title>
               <Row justify="center">
                   <Col xs={24} md={12}>
                        <Form
                            name="contact"
                            layout="vertical"
                            onFinish={onContactFormFinish}
                        >
                            <FormItem
                                label="Tên của bạn"
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
                            >
                                <Input />
                            </FormItem>
                            <FormItem
                                label="Email của bạn"
                                name="email"
                                rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}
                            >
                                <Input />
                            </FormItem>
                             <FormItem
                                label="Nội dung"
                                name="message"
                                rules={[{ required: true, message: 'Vui lòng nhập nội dung tin nhắn!' }]}
                             >
                                 <Input.TextArea rows={4} />
                             </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit">
                                    Gửi tin nhắn
                                </Button>
                            </FormItem>
                        </Form>
                   </Col>
               </Row>
           </div>
        </div>
      </Content>
      <Footer className="main-footer">
        <Row gutter={32} justify="center">
          <Col md={8} xs={24}>
            <Title level={3}>HOTEL LUXURY</Title>
            <Paragraph>Địa chỉ: 123 Đường Biển, Quận Du Lịch, TP. Biển Xanh</Paragraph>
            <Paragraph><PhoneOutlined /> 0123 456 789</Paragraph>
            <Paragraph><MailOutlined /> info@hotelluxury.com</Paragraph>
          </Col>
          <Col md={8} xs={24}>
            <Title level={3}>Kết nối với chúng tôi</Title>
            <Paragraph><FacebookOutlined /> Facebook</Paragraph>
            <Paragraph><TwitterOutlined /> Twitter</Paragraph>
             <Paragraph><InstagramOutlined /> Instagram</Paragraph>
            <Paragraph><EnvironmentOutlined /> Xem bản đồ</Paragraph>
          </Col>
          <Col md={8} xs={24}>
            <iframe
              title="hotel-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.005839013733!2d105.7803633154027!3d21.03065339312739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab3b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2zQ8O0bmcgVHkgQ-G7lSBQaMO6bmcgQ2Fv!5e0!3m2!1svi!2s!4v1620000000000!5m2!1svi!2s" width="100%" height="120" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
          </Col>
        </Row>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Paragraph>© 2023 HOTEL LUXURY. All rights reserved.</Paragraph>
        </div>
      </Footer>
    </Layout>
  );
};

export default HomePage; 