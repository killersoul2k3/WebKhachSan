import React from 'react';
import { Layout, Row, Col, Card, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout; // Assuming standard layout structure
const { Title, Paragraph } = Typography;

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  // Dummy data for events and foods
  const events = [
    { title: 'Hội nghị khách hàng 2024', img: 'https://via.placeholder.com/600x400', description: 'Sự kiện thường niên kết nối khách hàng và đối tác.' },
    { title: 'Gala Dinner cuối năm', img: 'https://via.placeholder.com/600x400', description: 'Đêm tiệc sang trọng tri ân khách hàng thân thiết.' },
    { title: 'Workshop pha chế Cocktail', img: 'https://via.placeholder.com/600x400', description: 'Trải nghiệm tự tay pha chế những ly cocktail hấp dẫn.' },
  ];

  const foods = [
    { name: 'Buffet Hải sản', img: 'https://via.placeholder.com/600x400', description: 'Thưởng thức hải sản tươi sống và đa dạng.' },
    { name: 'Ẩm thực Á-Âu', img: 'https://via.placeholder.com/600x400', description: 'Khám phá hương vị độc đáo từ hai nền ẩm thực.' },
    { name: 'Trà chiều và Bánh ngọt', img: 'https://via.placeholder.com/600x400', description: 'Khoảnh khắc thư giãn với trà và bánh ngọt.' },
  ];

  return (
    <Layout>
      <Header>
        {/* Header content */}
      </Header>
      <Content>
        <div style={{ padding: '20px 0', textAlign: 'center' }}>
          <Button type="primary" onClick={() => navigate('/')}>
            Quay về Trang chủ
          </Button>
        </div>
        <div className="site-layout-content">
          <div className="section about-section">
            <Row gutter={32} align="middle">
              <Col md={12} xs={24}>
                <Title level={2}>Về khách sạn</Title>
                <Paragraph>
                  Khách sạn Luxury là điểm đến lý tưởng cho kỳ nghỉ dưỡng, hội nghị và các sự kiện quan trọng. Chúng tôi cam kết mang đến trải nghiệm tuyệt vời nhất cho mọi khách hàng.
                </Paragraph>
                <Paragraph>
                  Với kiến trúc độc đáo, nội thất sang trọng và dịch vụ chuyên nghiệp, HOTEL LUXURY tự hào là biểu tượng của sự đẳng cấp và tinh tế.
                </Paragraph>
              </Col>
              <Col md={12} xs={24}>
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="about hotel" className="about-img" />
              </Col>
            </Row>
          </div>
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
          <div className="section food-section">
            <Title level={2}>Ẩm thực & Bữa ăn</Title>
            <Row gutter={24}>
              {foods.map((food, idx) => (
                <Col md={8} xs={24} key={idx}>
                  <Card
                    hoverable
                    cover={<img alt={food.name} src={food.img} className="food-img" style={{ height: 200, objectFit: 'cover' }} />}
                  >
                    <Card.Meta title={food.name} description={food.description} />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Content>
      <Footer>
        {/* Footer content */}
      </Footer>
    </Layout>
  );
};

export default AboutPage; 