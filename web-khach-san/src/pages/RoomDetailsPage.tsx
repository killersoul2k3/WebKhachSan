import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, Row, Col, Carousel, Button, Typography, Descriptions, Spin, Form, Input, message } from 'antd';
import { HomeOutlined, ArrowLeftOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

// Import mock data from RoomTypesPage (for now)
// In a real app, you would fetch this from an API
import { mockRooms } from './RoomTypesPage';

const { Title, Paragraph } = Typography;
const { Item } = Descriptions;

const RoomDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Lấy ID từ URL
  const navigate = useNavigate();
  const location = useLocation();
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching room data based on ID
    const foundRoom = mockRooms.find(r => r.id === Number(id));
    if (foundRoom) {
      setRoom(foundRoom);
    } else {
      // Handle case where room is not found (e.g., show 404 or redirect)
      console.error('Room not found');
      setRoom(null); // Or set an error state
    }
    setLoading(false);
  }, [id]); // Re-run effect if ID changes

  const onFinish = (values: any) => {
    // Xử lý booking form ở đây
    console.log('Success:', values);
    message.success('Bạn đã đặt phòng thành công! Đang chuyển hướng đến trang thanh toán...');
    // Navigate to transaction page, passing room and user details
    navigate('/transaction', { state: { roomId: room?.id, roomName: room?.name, roomPrice: room?.price, bookingDetails: values } });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Bạn đã nhập sai thông tin. Vui lòng kiểm tra lại các trường.');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <Spin size="large" tip="Đang tải thông tin phòng..."></Spin>
      </div>
    );
  }

  if (!room) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <Title level={3}>Không tìm thấy thông tin phòng này.</Title>
        <Button type="primary" onClick={() => navigate('/rooms')} style={{ marginTop: 20 }}>
          <ArrowLeftOutlined /> Về danh sách phòng
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: 32, background: '#f5f6fa', minHeight: '100vh' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Button icon={<HomeOutlined />} onClick={() => navigate('/')} style={{ marginRight: 16 }}>Về trang chủ</Button>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/rooms')}>Về danh sách phòng</Button>
        </Col>
        <Col>
          <Title level={2}>{room.name}</Title>
        </Col>
      </Row>

      <Row gutter={[32, 32]}>
        <Col xs={24} md={14}>
          {room.images && room.images.length > 0 && (
            <Card bordered={false}>
              <Carousel autoplay>
                {room.images.map((img: string, idx: number) => (
                  <div key={idx}>
                    <img src={img} alt={`Ảnh phòng ${room.name} ${idx + 1}`} style={{ width: '100%', maxHeight: 500, objectFit: 'cover' }} />
                  </div>
                ))}
              </Carousel>
            </Card>
          )}
        </Col>
        <Col xs={24} md={10}>
          <Card bordered={false}>
            <Title level={4}>Thông tin chi tiết</Title>
            <Descriptions bordered column={1}>
              <Item label="Loại phòng">{room.type}</Item>
              <Item label="Giá">{room.price.toLocaleString()} VNĐ / đêm</Item>
              <Item label="Địa điểm">{room.location}</Item>
              <Item label="Mùa gợi ý">{room.season}</Item>
              <Item label="Trạng thái">{room.status}</Item>
              <Item label="Nội thất">{room.interior.join(', ')}</Item>
              <Item label="View">{room.view}</Item>
              <Item label="Ghi chú">{room.notes || 'Không có'}</Item>
            </Descriptions>
            <Title level={4} style={{ marginTop: 24 }}>Mô tả</Title>
            <Paragraph>{room.description}</Paragraph>

            {/* Booking Form */}
            <div className="section booking-section" style={{ marginTop: 32 }}>
              <h2>Thông tin đặt phòng</h2>
              <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} className="booking-form">
                <Row gutter={16}>
                  <Col md={12} xs={24}>
                    <Form.Item name="name" label="Họ và tên" rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}><Input /></Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}><Input /></Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}><Input /></Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item name="date" label="Ngày nhận phòng" rules={[{ required: true, message: 'Chọn ngày nhận phòng!' }]}><Input type="date" /></Form.Item>
                  
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item name="note" label="Ghi chú"><Input /></Form.Item>
                  </Col>
                </Row>
                <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>Xác nhận đặt phòng</Button>
              </Form>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RoomDetailsPage; 