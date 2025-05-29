import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Form, Input, message, DatePicker, Carousel, Spin, Row, Col, Card, Typography, Descriptions } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

// Import mock data from RoomTypesPage (for now)
// In a real app, you would fetch this from an API
import { mockRooms } from './RoomTypesPage';

const { Title, Paragraph } = Typography;
const { Item } = Descriptions;
const { Item: FormItem } = Form; // Alias Form.Item to avoid conflict with Descriptions.Item

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
    let finalPrice = room?.price;
    const hasSpecialRequest = values.note && values.note.trim() !== '';

    if (hasSpecialRequest) {
      finalPrice = (room?.price || 0) * 1.15; // Add 15% for special requests if note exists
    }

    navigate('/transaction', { state: { roomId: room?.id, roomName: room?.name, roomPrice: room?.price, bookingDetails: values, finalAmount: finalPrice, hasSpecialRequest: hasSpecialRequest } });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Bạn đã nhập sai thông tin. Vui lòng kiểm tra lại các trường.');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <Spin size="large">
           Đang tải thông tin phòng...
        </Spin>
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
          <Button icon={<HomeOutlined />} onClick={() => navigate('/')} style={{ marginRight: 16 }}>
            Về trang chủ
          </Button>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/rooms')}>
            Về danh sách phòng
          </Button>
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
              <Item label="Giá">{room?.price?.toLocaleString()} VNĐ</Item>
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
                    <FormItem name="name" label="Họ và tên" rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}>
                      <Input id="name" />
                    </FormItem>
                  </Col>
                  <Col md={12} xs={24}>
                    <FormItem name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}>
                      <Input id="email" />
                    </FormItem>
                  </Col>
                  
                  <Col md={12} xs={24}>
                    <FormItem name="checkInDateTime" label="Ngày nhận phòng" rules={[{ required: true, message: 'Chọn ngày và giờ nhận phòng!' }]}>
                      <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
                    </FormItem>
                  </Col>
                  <Col md ={ 12} xs={24}>
                    <FormItem name="checkOutDateTime" label="Ngày trả phòng" rules={[{ required: true, message: 'Chọn ngày và giờ trả phòng!' }]}>
                      <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
                    </FormItem>
                  </Col>  
                  <Col md={12} xs={24}>
                    <FormItem name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                      <Input id="phone" />
                    </FormItem>
                  </Col>
                  <Col md={12} xs={24}>
                    <FormItem name="note" label="Ghi chú">
                      <Input id="note" />
                    </FormItem>
                  </Col>
                </Row>
                <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
                  Xác nhận đặt phòng
                </Button>
              </Form>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RoomDetailsPage; 