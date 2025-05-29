import React from 'react';
import { Layout, Row, Col, Card, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

// Define types for event and food data
interface Event {
  title: string;
  img: string;
  description: string;
}

interface Food {
  name: string;
  img: string;
  description: string;
}

// Mock data 
const events: Event[] = [
  { title: 'Sự kiện cưới hỏi', img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', description: 'Sự kiện cưới hỏi đặc biệt' },
  { title: 'Hội nghị doanh nghiệp', img: 'https://govi.vn/wp-content/uploads/2023/06/ky-nang-to-chuc-cuoc-hop.jpg', description: 'Hội nghị doanh nghiệp đầy đủ thông tin' },
  { title: 'Tiệc buffet cuối tuần', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', description: 'Tiệc buffet cuối tuần đầy đủ thông tin' },
];

const foods: Food[] = [
  { name: 'Buffet sáng', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', description: 'Buffet sáng đầy đủ thông tin' },
  { name: 'Ẩm thực Á Âu', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80', description: 'Ẩm thực Á Âu đầy đủ thông tin' },
  { name: 'Đặc sản địa phương', img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80', description: 'Đặc sản địa phương đầy đủ thông tin' },
];

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout.Content>
      <div style={{ padding: '20px 0', textAlign: 'center' }}>
        <Button type="primary" onClick={() => navigate('/')}>
          Quay về Trang chủ
        </Button>
      </div>
      <div className="section about-section"> {/* Reuse CSS class if applicable */}
        <Row gutter={32} align="middle">
          <Col md={12} xs={24}>
            <Title level={2}>Về khách sạn</Title>
            <Paragraph>
              Khách sạn Luxury là điểm đến lý tưởng cho kỳ nghỉ dưỡng, hội nghị và các sự kiện quan trọng. Chúng tôi cam kết mang đến trải nghiệm tuyệt vời nhất cho mọi khách hàng.
            </Paragraph>
          </Col>
          <Col md={12} xs={24}>
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="about hotel" className="about-img" /> {/* Reuse CSS class if applicable */}
          </Col>
        </Row>
      </div>

      <div className="section event-section"> {/* Reuse CSS class if applicable */}
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

      <div className="section food-section"> {/* Reuse CSS class if applicable */}
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

      {/* Add more sections for other info like tourist spots, services if needed */}

    </Layout.Content>
  );
};

export default AboutPage; 