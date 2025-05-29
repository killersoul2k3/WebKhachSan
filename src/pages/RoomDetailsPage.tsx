import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Form, Input, message, DatePicker, Carousel, Spin, Row, Col, Card, Typography, Descriptions, Space, Tag } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { mockRooms } from './RoomTypesPage'; // Assuming mockRooms is exported from here
import { mockBookings } from '../mockData'; // Assuming mockBookings is here
import moment from 'moment'; // Import moment for date handling

const { Title, Paragraph, Text } = Typography; // Destructure Text
const { Item: FormItem } = Form;
const { RangePicker } = DatePicker; // Destructure RangePicker
const { Item: DescriptionItem } = Descriptions;

// Define interfaces for data structures
interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
  description: string;
  images: string[];
  amenities: string[];
  status: string;
}

interface BookingData {
  name: string;
  email: string;
  phone: string;
  checkInDateTime: moment.Moment; // Use moment.Moment type
  checkOutDateTime: moment.Moment; // Use moment.Moment type
  note?: string;
}

const RoomDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation(); // To access potential state like selected dates
  const [roomDetails, setRoomDetails] = useState<Room | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookingDates, setBookingDates] = useState<[moment.Moment | null, moment.Moment | null] | null>(null); // State for selected dates

  useEffect(() => {
    // Simulate fetching room details based on ID
    const room = mockRooms.find(r => r.id === parseInt(id || '', 10));
    if (room) {
      setRoomDetails(room);
    }
    setLoading(false);

    // Check if booking dates are passed via location state
    if (location.state?.selectedDates) {
        const dates = location.state.selectedDates.map((date: string) => moment(date));
        if (dates.length === 2) {
             setBookingDates([dates[0], dates[1]]);
        }
    }

  }, [id, location.state]); // Depend on id and location.state

  const onFinish = (values: BookingData) => {
    console.log('Booking details:', values);

    // Add room ID to booking details
    const bookingDetailsWithRoom = { ...values, roomId: roomDetails?.id, roomName: roomDetails?.name };

    // Simulate booking submission
    setLoading(true); // Set loading for booking
    setTimeout(() => {
        setLoading(false); // Stop loading
        message.success('Yêu cầu đặt phòng của bạn đã được gửi!');

        // Redirect to a transaction/confirmation page, passing data
         navigate('/transaction', { state: { bookingInfo: bookingDetailsWithRoom } });

    }, 2000); // Simulate API call duration
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Vui lòng điền đầy đủ thông tin.');
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

  if (!roomDetails) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <Title level={3}>Không tìm thấy thông tin phòng này.</Title>
        <Button type="primary" onClick={() => navigate('/rooms')} style={{ marginTop: 20 }}>
          <ArrowLeftOutlined /> Về danh sách phòng
        </Button>
      </div>
    );
  }

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return moment(dateString).format('DD/MM/YYYY HH:mm');
  };


  return (
    <div style={{ padding: 32, background: '#f5f6fa', minHeight: '100vh' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Space>
            <Button icon={<HomeOutlined />} onClick={() => navigate('/')} style={{ marginRight: 16 }}>
              Về trang chủ
            </Button>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/rooms')}>
              Về danh sách phòng
            </Button>
          </Space>
        </Col>
        <Col>
          <Title level={2}>{roomDetails.name}</Title>
        </Col>
      </Row>

      <Row gutter={[32, 32]}>
        <Col xs={24} md={14}>
          {roomDetails.images && roomDetails.images.length > 0 && (
            <Card bordered={false}>
              <Carousel autoplay>
                {roomDetails.images.map((img: string, idx: number) => (
                  <div key={idx}>
                    <img src={img} alt={`Ảnh phòng ${roomDetails.name} ${idx + 1}`} style={{ width: '100%', maxHeight: 500, objectFit: 'cover' }} />
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
              <DescriptionItem label="Loại phòng">{roomDetails.type}</DescriptionItem>
              <DescriptionItem label="Giá">{roomDetails.price.toLocaleString()} VNĐ / đêm</DescriptionItem>
              <DescriptionItem label="Trạng thái">{roomDetails.status === 'Available' ? 'Trống' : 'Đang sử dụng'}</DescriptionItem>
               <DescriptionItem label="Mô tả">{roomDetails.description}</DescriptionItem>
               <DescriptionItem label="Tiện nghi">
                 <Space wrap>
                   {roomDetails.amenities.map((amenity, index) => (
                      <Tag key={index}>{amenity}</Tag>
                   ))}
                 </Space>
               </DescriptionItem>
            </Descriptions>

            {roomDetails.status === 'Available' && (
              <div className="section booking-section" style={{ marginTop: 32 }}>
                <h2>Thông tin đặt phòng</h2>
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  className="booking-form"
                  initialValues={{
                    checkInDateTime: bookingDates ? bookingDates[0] : undefined,
                    checkOutDateTime: bookingDates ? bookingDates[1] : undefined,
                   }}
                >
                  <Row gutter={16}>
                    <Col md={12} xs={24}>
                      <FormItem name="name" label="Họ và tên" rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}>
                        <Input id="name"/>
                      </FormItem>
                    </Col>
                    <Col md={12} xs={24}>
                      <FormItem name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}>
                        <Input id="email"/>
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
                        <Input id="phone"/>
                      </FormItem>
                    </Col>
                    <Col md={12} xs={24}>
                      <FormItem name="note" label="Ghi chú">
                        <Input.TextArea rows={3} id="note"/>
                      </FormItem>
                    </Col>
                  </Row>
                  <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
                    Xác nhận đặt phòng
                  </Button>
                </Form>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RoomDetailsPage; 