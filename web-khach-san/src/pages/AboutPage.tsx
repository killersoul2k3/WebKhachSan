import React from 'react';
import { Layout, Row, Col, Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

// Define types for event and food data
interface Event {
  title: string;
  img: string;
}

interface Food {
  name: string;
  img: string;
}

// Mock data 
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

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Header will be part of the main Layout in App.tsx */}
      <Content>
        <div style={{ padding: '20px 0', textAlign: 'center' }}>
          <Button type="primary" onClick={() => navigate('/')}>
            Quay về Trang chủ
          </Button>
        </div>
        <div className="section about-section"> {/* Reuse CSS class if applicable */}
          <Row gutter={32} align="middle">
            <Col md={12} xs={24}>
              <h2>Về khách sạn</h2>
              <p>Khách sạn Luxury là điểm đến lý tưởng cho kỳ nghỉ dưỡng, hội nghị và các sự kiện quan trọng. Chúng tôi cam kết mang đến trải nghiệm tuyệt vời nhất cho mọi khách hàng.</p>
            </Col>
            <Col md={12} xs={24}>
              <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="about hotel" className="about-img" /> {/* Reuse CSS class if applicable */}
            </Col>
          </Row>
        </div>

        <div className="section event-section"> {/* Reuse CSS class if applicable */}
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

        <div className="section food-section"> {/* Reuse CSS class if applicable */}
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

        {/* Add more sections for other info like tourist spots, services if needed */}

      </Content>
      {/* Footer will be part of the main Layout in App.tsx */}
    </Layout>
  );
};

export default AboutPage; 