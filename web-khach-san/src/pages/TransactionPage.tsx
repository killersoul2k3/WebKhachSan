import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, Card, Row, Col, Result, message, Spin, Form, Input, Radio, Descriptions, Carousel, Switch } from 'antd';
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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [roomDetails, setRoomDetails] = useState<any>(null);
  const [includeSpecialRequests, setIncludeSpecialRequests] = useState(false);
  const [finalAmount, setFinalAmount] = useState(0);
  const [selectedBank, setSelectedBank] = useState<string | undefined>(undefined);
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);

  const { finalAmount: initialFinalAmount, hasSpecialRequest } = location.state as { finalAmount?: number, hasSpecialRequest?: boolean };

  useEffect(() => {
    if (roomId) {
      const foundRoom = mockRooms.find(room => room.id === roomId);
      setRoomDetails(foundRoom);
    }
  }, [roomId]);

  useEffect(() => {
    if (hasSpecialRequest !== undefined) {
      setIncludeSpecialRequests(hasSpecialRequest);
    }
  }, [hasSpecialRequest]);

  useEffect(() => {
    if (roomDetails) {
      let amount = roomDetails.price;
      if (includeSpecialRequests) {
        amount = amount * 1.15; // Add 15% for special requests
      }
      setFinalAmount(amount);
      setDiscountAmount(0); // Reset discount when base amount changes
      setAppliedPromoCode(null); // Reset applied promo code
    }
  }, [roomDetails, includeSpecialRequests]);

  // Define valid promo codes and their discounts
  const promoCodes: { [key: string]: number } = {
    'LUCY3010': 0.15, // 15% discount
    'LUCY3101': 0.20, // 20% discount
    'JHIN4YOU': 0.50, // 50% discount
  };

  const handleApplyPromo = () => {
    const upperCasePromoCode = promoCode.toUpperCase();
    if (promoCodes[upperCasePromoCode]) {
      const discountPercentage = promoCodes[upperCasePromoCode];
      const calculatedDiscount = finalAmount * discountPercentage;
      setDiscountAmount(calculatedDiscount);
      setAppliedPromoCode(upperCasePromoCode);
      message.success(`Áp dụng mã khuyến mãi ${upperCasePromoCode} thành công!`);
    } else {
      setDiscountAmount(0);
      setAppliedPromoCode(null);
      message.error('Mã khuyến mãi không hợp lệ.');
    }
  };

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
        console.log(`Total amount paid: ${finalAmount.toLocaleString()} VNĐ`); // Log the final amount
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
                    <Item label="Giá">
    {(finalAmount - discountAmount).toLocaleString()} VNĐ / đêm
  </Item>
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
                    <Item label="Giá">{roomDetails.price.toLocaleString()} VNĐ / ngày</Item>
                    <Item label="Địa điểm">{roomDetails.location}</Item>
                </Descriptions>
            </Card>
            <Card size="small" title="Thông tin khách hàng" bordered={false}>
                 <Descriptions column={1} size="small">
                    <Item label="Họ và tên">{bookingDetails.name}</Item>
                    <Item label="Email">{bookingDetails.email}</Item>
                    <Item label="Số điện thoại">{bookingDetails.phone}</Item>
                    <Item label="Ngày nhận phòng">{bookingDetails.date}</Item>
                    <Item label="Ngày trả phòng">{bookingDetails.date}</Item>
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
                <Item label="Giá">{roomDetails.price.toLocaleString()} VNĐ / ngày</Item>
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

            {/* Payment Amount Section */}
            {roomDetails && (
              <Card title="Xác nhận số tiền thanh toán" bordered={false} style={{ marginBottom: 24 }}>
                <Descriptions column={1}>
                  <Descriptions.Item label="Giá phòng gốc">
                    {roomDetails.price.toLocaleString()} VNĐ / Ngày
                  </Descriptions.Item>
                  {includeSpecialRequests && (
                    <Descriptions.Item label="Yêu cầu đặc biệt (+15%)">
                      {(roomDetails.price * 0.15).toLocaleString()} VNĐ
                    </Descriptions.Item>
                  )}
                  <Descriptions.Item label={<Title level={5} style={{ margin: 0 }}>Tổng tiền </Title>}>
                      <Text strong style={{ fontSize: '1.2em', color: '#faad14' }}>
                        {initialFinalAmount?.toLocaleString() || finalAmount.toLocaleString()} VNĐ
                      </Text>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            )}
            
          <Card title="Chọn phương thức thanh toán" bordered={false}>
            <Form layout="vertical">
              <Form.Item label="Phương thức">
                <Radio.Group onChange={(e) => setSelectedPaymentMethod(e.target?.value)} value={selectedPaymentMethod}>
                  <Radio value="cash">Tiền mặt</Radio>
                  <Radio value="card">Thẻ Tín dụng/Ghi nợ</Radio>
                  <Radio value="transfer">Chuyển khoản ngân hàng</Radio>
                  <Radio value="online">Thanh toán Online (VNPay, Momo...)</Radio>
                </Radio.Group>
              </Form.Item>
            </Form>
{/* Promo Code Section */}
<Card title="Mã khuyến mãi" bordered={false} style={{ marginBottom: 24 }}>
        <Form layout="inline" onFinish={handleApplyPromo}>
          <Form.Item label="Nhập mã khuyến mãi">
            <Input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Nhập mã tại đây"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Áp dụng</Button>
          </Form.Item>
        </Form>
        {appliedPromoCode && (
          <Paragraph style={{ marginTop: 10 }}>
            Mã khuyến mãi <Text code>{appliedPromoCode}</Text> đã được áp dụng.
          </Paragraph>
        )}
      </Card>

            {selectedPaymentMethod === 'transfer' && (
              <div style={{ marginTop: 24 }}>
                <Title level={4}>Thông tin chuyển khoản</Title>
                <Paragraph>Vui lòng chuyển khoản theo thông tin dưới đây:</Paragraph>
                
                <div style={{ marginBottom: 24 }}>
                  <Title level={5} style={{ marginBottom: 10 }}>Chọn ngân hàng:</Title>
                  <Radio.Group onChange={(e) => setSelectedBank(e.target.value)} value={selectedBank}>
                    <Radio value="Agribank">Agribank</Radio>
                    <Radio value="MBBank">MB Bank (Ngân hàng Quân đội)</Radio>
                    <Radio value="Vietcombank">Vietcombank</Radio>
                    <Radio value="BIDV">BIDV</Radio>
                  </Radio.Group>
                </div>

                {selectedBank && (
                  <>
                    <Card size="small" bordered style={{ marginBottom: 16 }}>
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label={`Ngân hàng ${selectedBank}`}>
                          {selectedBank}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số tài khoản">2209200331012000</Descriptions.Item>
                        <Descriptions.Item label="Chủ tài khoản">Hotel Luxury</Descriptions.Item>
                      </Descriptions>
                    </Card>
                     <Paragraph type="secondary" style={{ marginTop: 16 }}>
                        Nội dung chuyển khoản: Tên của bạn - Mã đặt phòng (Ví dụ: Nguyen Van A - 12345)
                     </Paragraph>
                  </>
                )}

              </div>
            )}

            <Button type="primary" size="large" onClick={handlePayment} loading={loading} style={{ marginTop: selectedPaymentMethod === 'transfer' ? 16 : 0 }}>
              {loading ? 'Đang xử lý...' : 'Xác nhận Thanh toán'}
            </Button>
          </Card>
        </Col>
      </Row>

      

      {/* Final Amount Section */}
      {roomDetails && (
        <Card title="Tổng cộng thanh toán" bordered={false} style={{ marginBottom: 24 }}>
          <Descriptions column={1}>
            {discountAmount > 0 && (
              <Descriptions.Item label="Giảm giá khuyến mãi">
                <Text type="danger">- {discountAmount.toLocaleString()} VNĐ</Text>
              </Descriptions.Item>
            )}
            {includeSpecialRequests && roomDetails && (
              <Descriptions.Item label="Phí yêu cầu đặc biệt (+15%)">
                {(roomDetails.price * 0.15).toLocaleString()} VNĐ
              </Descriptions.Item>
            )}
            <Descriptions.Item label={<Title level={4} style={{ margin: 0 }}>Tổng tiền đã thanh toán</Title>}>
              <Text strong style={{ fontSize: '1.5em', color: '#52c41a' }}>
                {(finalAmount - discountAmount).toLocaleString()} VNĐ
              </Text>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
    </div>
  );
};

export default TransactionPage;