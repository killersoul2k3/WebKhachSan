import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, Card, Row, Col, Result, message, Spin, Form, Input, Radio, Descriptions, Carousel } from 'antd';
import { SmileOutlined, CloseCircleOutlined, HomeOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { mockRooms } from './RoomTypesPage'; // Import mockRooms

const { Title, Text, Paragraph } = Typography;
const { Item } = Descriptions;

const TransactionPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId, roomName, roomPrice, bookingDetails } = location.state as { roomId?: number, roomName?: string, roomPrice?: number, bookingDetails?: any };

  const [paymentStatus, setPaymentStatus] = useState('pending'); // 'pending', 'success', 'failed'
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [roomDetails, setRoomDetails] = useState<any>(null);

  useEffect(() => {
    if (roomId) {
      const foundRoom = mockRooms.find(room => room.id === roomId);
      setRoomDetails(foundRoom);
    }
  }, [roomId]);

  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      message.warning('Vui lòng chọn phương thức thanh toán.');
      return;
    }
    setLoading(true);
    // Simulate payment process
    setTimeout(() => {
      // In a real app, you would call a payment API here
      const isSuccess = Math.random() > 0.2; // Simulate 80% success rate

      if (isSuccess) {
        setPaymentStatus('success');
        message.success('Thanh toán thành công!');
        // Simulate sending confirmation email/receipt
        console.log(`Simulating sending confirmation for booking ID ${Date.now()} to ${bookingDetails?.email}`);
      } else {
        setPaymentStatus('failed');
        message.error('Thanh toán thất bại.');
      }
      setLoading(false);
    }, 2000); // Simulate 2 second payment process
  };

  const navigateToHome = () => {
    navigate('/');
  };

  if (!bookingDetails || !roomDetails) {
      return (
          <Result
              status="warning"
              title="Không tìm thấy thông tin đặt phòng hoặc phòng."
              extra={
                  <Button type="primary" onClick={navigateToHome}>Về trang chủ</Button>
              }
          />
      );
  }

  if (paymentStatus === 'success') {
    return (
      <Result
        status="success"
        title="Đặt phòng và thanh toán thành công!"
        subTitle={
          <>
            <Paragraph>Bạn đã đặt phòng thành công với thông tin sau:</Paragraph>
            <Card size="small" style={{ marginBottom: 16 }}>
                {roomDetails.images && roomDetails.images.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                        <img src={roomDetails.images[0]} alt={roomDetails.name} style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }} />
                    </div>
                )}
                <Descriptions column={1} size="small">
                    <Item label="Phòng">{roomDetails.name}</Item>
                    <Item label="Loại">{roomDetails.type}</Item>
                    <Item label="Giá">{roomDetails.price.toLocaleString()} VNĐ / đêm</Item>
                    <Item label="Địa điểm">{roomDetails.location}</Item>
                </Descriptions>
            </Card>
            <Card size="small" title="Thông tin khách hàng" bordered={false}>
                 <Descriptions column={1} size="small">
                    <Item label="Họ và tên">{bookingDetails.name}</Item>
                    <Item label="Email">{bookingDetails.email}</Item>
                    <Item label="Số điện thoại">{bookingDetails.phone}</Item>
                    <Item label="Ngày nhận phòng">{bookingDetails.date}</Item>
                    <Item label="Ghi chú">{bookingDetails.note || 'Không có'}</Item>
                </Descriptions>
            </Card>
             <Paragraph style={{ marginTop: 16 }}>Phiếu xác nhận và thông tin thanh toán đã được gửi đến email của bạn.</Paragraph>
          </>
        }
        extra={[
          <Button type="primary" key="home" onClick={navigateToHome}>
            Về trang chủ
          </Button>,
        ]}
      />
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <Result
        status="error"
        title="Thanh toán thất bại"
        subTitle={
           <>
            <Paragraph>Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng kiểm tra lại thông tin hoặc thử lại.</Paragraph>
             <Card size="small" style={{ marginBottom: 16 }}>
                {roomDetails.images && roomDetails.images.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                        <img src={roomDetails.images[0]} alt={roomDetails.name} style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }} />
                    </div>
                )}
                <Descriptions column={1} size="small">
                    <Item label="Phòng">{roomDetails.name}</Item>
                    <Item label="Loại">{roomDetails.type}</Item>
                    <Item label="Giá">{roomDetails.price.toLocaleString()} VNĐ / đêm</Item>
                    <Item label="Địa điểm">{roomDetails.location}</Item>
                </Descriptions>
            </Card>
            <Card size="small" title="Thông tin khách hàng" bordered={false}>
                 <Descriptions column={1} size="small">
                    <Item label="Họ và tên">{bookingDetails.name}</Item>
                    <Item label="Email">{bookingDetails.email}</Item>
                    <Item label="Số điện thoại">{bookingDetails.phone}</Item>
                    <Item label="Ngày nhận phòng">{bookingDetails.date}</Item>
                    <Item label="Ghi chú">{bookingDetails.note || 'Không có'}</Item>
                </Descriptions>
            </Card>
          </>
        }
        extra={[
          <Button type="primary" key="retry" onClick={() => setPaymentStatus('pending')}>
            Thử lại
          </Button>,
          <Button key="home" onClick={navigateToHome}>
            Về trang chủ
          </Button>,
        ]}
      />
    );
  }

  return (
    <div style={{ padding: 32, background: '#f5f6fa', minHeight: '100vh' }}>
      <Row justify="center" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2}>Xác nhận và Thanh toán</Title>
        </Col>
      </Row>

      <Row justify="center">
        <Col xs={24} md={16}>
          <Card title="Thông tin đặt phòng" bordered={false} style={{ marginBottom: 24 }}>
            {roomDetails.images && roomDetails.images.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                     <Carousel autoplay>
                        {roomDetails.images.map((img: string, idx: number) => (
                           <div key={idx}>
                                <img src={img} alt={`Ảnh phòng ${roomDetails.name} ${idx + 1}`} style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }} />
                           </div>
                        ))}
                    </Carousel>
                </div>
            )}
            <Descriptions column={1} bordered>
                <Item label="Phòng">{roomDetails.name}</Item>
                <Item label="Loại">{roomDetails.type}</Item>
                <Item label="Giá">{roomDetails.price.toLocaleString()} VNĐ / đêm</Item>
                <Item label="Địa điểm">{roomDetails.location}</Item>
            </Descriptions>
          </Card>

           <Card title="Thông tin khách hàng và yêu cầu" bordered={false} style={{ marginBottom: 24 }}>
                 <Descriptions column={1} bordered>
                    <Item label="Họ và tên">{bookingDetails.name}</Item>
                    <Item label="Email">{bookingDetails.email}</Item>
                    <Item label="Số điện thoại">{bookingDetails.phone}</Item>
                    <Item label="Ngày nhận phòng">{bookingDetails.date}</Item>
                    <Item label="Ghi chú">{bookingDetails.note || 'Không có'}</Item>
                </Descriptions>
            </Card>

          <Card title="Chọn phương thức thanh toán" bordered={false}>
            <Form layout="vertical">
              <Form.Item label="Phương thức">
                <Radio.Group onChange={e => setSelectedPaymentMethod(e.target.value)} value={selectedPaymentMethod}>
                  <Radio value="cash">Tiền mặt</Radio>
                  <Radio value="card">Thẻ Tín dụng/Ghi nợ</Radio>
                  <Radio value="transfer">Chuyển khoản ngân hàng</Radio>
                  <Radio value="online">Thanh toán Online (VNPay, Momo...)</Radio>
                </Radio.Group>
              </Form.Item>
            </Form>

            <Button type="primary" size="large" onClick={handlePayment} loading={loading} style={{ marginTop: 16 }}>
              {loading ? 'Đang xử lý...' : 'Xác nhận Thanh toán'}
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TransactionPage; 