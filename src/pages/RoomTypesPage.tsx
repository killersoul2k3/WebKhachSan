import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Input, Select, Button, Modal, Form, Pagination, Carousel, Descriptions, Typography, Space, Tag } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { mockRooms, mockRoomTypes } from '../../mockData'; // Import mockRoomTypes

const { Title, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;
const { Item: FormItem } = Form;
const { Item: DescriptionItem } = Descriptions;

// Define Room interface based on the structure in mockData.ts (assuming a more detailed structure based on usage)
interface Room {
    id: number;
    roomNumber: string;
    type: string;
    price: number;
    description?: string;
    status: 'Available' | 'Occupied'; // Assuming status is either Available or Occupied
    image: string; // Assuming an image field for the card cover
    location: string; // Assuming location field
    season: string; // Assuming season field
    amenities: string[]; // Assuming amenities field
}

interface RoomType {
    id: number;
    name: string;
}

const RoomTypesPage: React.FC = () => {
  const navigate = useNavigate();

  // State for filters and search
  const [search, setSearch] = useState<string>('');
  const [type, setType] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [season, setSeason] = useState<string | undefined>(undefined);

  // State for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [roomsPerPage] = useState<number>(10); // Number of rooms per page

  // Get unique filter options from mock data
  const roomTypes = [...new Set(mockRoomTypes.map(rt => rt.name))]; // Use mockRoomTypes
  const locations = [...new Set(mockRooms.map(room => room.location))];
  const seasons = [...new Set(mockRooms.map(room => room.season))];

  // Filter rooms based on search and filters
  const filteredRooms = mockRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = type ? room.type === type : true;
    const matchesLocation = location ? room.location === location : true;
    const matchesPrice = price ? room.price <= price : true;
    const matchesSeason = season ? room.season === season : true;
    return matchesSearch && matchesType && matchesLocation && matchesPrice && matchesSeason;
  });

  // Get current rooms for pagination
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: 32, background: '#f5f6fa', minHeight: '100vh' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Button icon={<HomeOutlined />} onClick={() => navigate('/')}>
            Về trang chủ
          </Button>
        </Col>
        <Col>
          <Title level={2}>Danh sách các loại phòng</Title>
        </Col>
      </Row>

      {/* Filters */}
      <Form layout="inline" style={{ marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <FormItem label="Tìm kiếm">
          <Search placeholder="Tên phòng..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: 180 }} enterButton />
        </FormItem>
        <FormItem label="Loại phòng">
          <Select allowClear placeholder="Chọn loại phòng" style={{ width: 150 }} value={type} onChange={(value: string | undefined) => setType(value)}>
            {roomTypes.map(rt => <Option key={rt} value={rt}>{rt}</Option>)}
          </Select>
        </FormItem>
        <FormItem label="Địa điểm">
          <Select allowClear placeholder="Chọn địa điểm" style={{ width: 150 }} value={location} onChange={(value: string | undefined) => setLocation(value)}>
            {locations.map(l => <Option key={l} value={l}>{l}</Option>)}
          </Select>
        </FormItem>
        <FormItem label="Giá tối đa">
          <Select
            allowClear
            placeholder="Chọn giá tối đa"
            style={{ width: 150 }}
            value={price}
            onChange={(value: number | undefined) => setPrice(value)}
          >
            <Option value={500000}>500.000 VNĐ</Option>
            <Option value={1000000}>1.000.000 VNĐ</Option>
            <Option value={2000000}>2.000.000 VNĐ</Option>
            <Option value={3000000}>3.000.000 VNĐ</Option>
            <Option value={5000000}>5.000.000 VNĐ</Option>
            <Option value={10000000}>10.000.000 VNĐ</Option>
          </Select>
        </FormItem>
        <FormItem label="Mùa du lịch">
          <Select allowClear placeholder="Chọn mùa" style={{ width: 150 }} value={season} onChange={(value: string | undefined) => setSeason(value)}>
            {seasons.map(s => <Option key={s} value={s}>{s}</Option>)}
          </Select>
        </FormItem>
      </Form>

      {/* Room Cards */}
      <Row gutter={[24, 24]}>
        {currentRooms.map(room => (
          <Col key={room.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable={room.status !== 'Occupied'}
              cover={<img alt={room.name} src={room.image} style={{ height: 180, objectFit: 'cover' }} />}
              onClick={() => navigate(`/rooms/${room.id}`)} // Navigate on card click
            >
              <Card.Meta
                title={room.name}
                description={
                  <>
                    <Paragraph>Loại: {room.type}</Paragraph>
                    <Paragraph>Giá: {room.price.toLocaleString()} VNĐ / đêm</Paragraph>
                    <Paragraph>Trạng thái: <Tag color={room.status === 'Available' ? 'green' : 'volcano'}>{room.status === 'Available' ? 'Trống' : 'Đang sử dụng'}</Tag></Paragraph>
                    <Paragraph>Địa điểm: {room.location}</Paragraph>
                    <Paragraph>Mùa: {room.season}</Paragraph>
                     {room.amenities && room.amenities.length > 0 && (
                        <Paragraph>
                            Tiện nghi: 
                            <Space wrap size={0}>
                                {room.amenities.map((amenity, index) => (
                                    <Tag key={index}>{amenity}</Tag>
                                ))}
                            </Space>
                        </Paragraph>
                     )}
                  </>
                }
              />
               {room.status !== 'Occupied' && (
                 <Button type="primary" style={{ marginTop: 10 }} onClick={(e) => { e.stopPropagation(); navigate(`/rooms/${room.id}`); }}>
                           Xem chi tiết & Đặt phòng
                         </Button>
                    )}
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={roomsPerPage}
        total={filteredRooms.length}
        onChange={handlePageChange}
        style={{ marginTop: 24, textAlign: 'center' }}
      />

      {/* Modal for room details if needed */}
      {/* You would typically use routing for details, but a modal is an option */}
      {/* <Modal
        title="Chi tiết phòng"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedRoom && (
          <Descriptions bordered column={1}>
             <DescriptionItem label="Số phòng">{selectedRoom.roomNumber}</DescriptionItem>
             <DescriptionItem label="Loại phòng">{selectedRoom.type}</DescriptionItem>
             <DescriptionItem label="Giá">{selectedRoom.price.toLocaleString()} VNĐ</DescriptionItem>
             <DescriptionItem label="Trạng thái">{selectedRoom.status}</DescriptionItem>
             <DescriptionItem label="Mô tả">{selectedRoom.description}</DescriptionItem>
             <DescriptionItem label="Tiện nghi"></DescriptionItem>
          </Descriptions>
        )}
      </Modal> */}
    </div>
  );
};

export default RoomTypesPage; 