import React, { useState, useEffect } from 'react';
import { Typography, Table, Tag, Input, Space } from 'antd';
import { mockBookings, mockCustomers } from '../../mockData'; // Import mock booking and customer data
import { mockRooms } from '../RoomTypesPage'; // Import mock room data

// Define Room interface based on the structure in RoomTypesPage.tsx
interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
  location: string;
  image: string;
  season: string;
  description: string;
  images: string[];
  interior: string[];
  view: string;
  notes?: string;
  status: string; // Add status property
}

const { Title } = Typography;
const { Search } = Input;

const BookingManagementPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredBookings, setFilteredBookings] = useState(mockBookings);

  // Update filtered bookings when mockBookings or searchText changes
  useEffect(() => {
    const lowercasedSearchText = searchText.toLowerCase();
    const filteredData = mockBookings.filter(booking => {
      const customerName = mockCustomers.find(c => c.id === booking.customerId)?.name.toLowerCase() || '';
      const room = mockRooms.find((r: Room) => r.id === booking.roomId);
      const roomIdentifier = room ? `${room.name} ${room.type}`.toLowerCase() : '';

      return (
        booking.id.toString().includes(lowercasedSearchText) ||
        customerName.includes(lowercasedSearchText) ||
        roomIdentifier.includes(lowercasedSearchText) ||
        booking.status.toLowerCase().includes(lowercasedSearchText)
      );
    });
    setFilteredBookings(filteredData);
  }, [searchText]); // Depend on searchText and mockBookings (though mockBookings is static here)

  // Define table columns
  const columns = [
    { title: 'ID Booking', dataIndex: 'id', key: 'id' },
    {
      title: 'Khách hàng',
      dataIndex: 'customerId',
      key: 'customerName',
      render: (customerId: number) => mockCustomers.find(c => c.id === customerId)?.name || 'N/A',
    },
    {
      title: 'Phòng',
      dataIndex: 'roomId',
      key: 'room',
      render: (roomId: number) => {
        // Find the room using the locally defined Room interface
        const room = mockRooms.find((r: Room) => r.id === roomId);
        return room ? `${room.name} (${room.type})` : 'N/A';
      }
    },
    { title: 'Ngày nhận phòng', dataIndex: 'checkInDate', key: 'checkInDate' },
    { title: 'Ngày trả phòng', dataIndex: 'checkOutDate', key: 'checkOutDate' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color;
        if (status === 'Đã xác nhận') {
          color = 'green';
        } else if (status === 'Đang xử lý') {
          color = 'volcano';
        } else if (status === 'Đã hoàn thành') {
          color = 'blue'; // Color for completed bookings
        } else {
          color = 'default';
        }
        return (
          <Tag color={color}>
            {status}
          </Tag>
        );
      },
    },
    { title: 'Yêu cầu đặc biệt', dataIndex: 'requestedFeatures', key: 'requestedFeatures' },
    // Add more columns as needed, e.g., price, payment status
  ];

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  return (
    <div>
      <Title level={2}>Quản lý đặt phòng</Title>

      {/* Search Bar */}
      <Space style={{ marginBottom: 16, width: '100%' }}>
        <Search
          placeholder="Tìm kiếm theo ID booking, khách hàng, phòng, trạng thái"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)} // Filter as user types
          style={{ width: 400 }}
        />
      </Space>

      {/* Display booking data in a Table */}
      <Table
        dataSource={filteredBookings} // Use the filtered booking data
        columns={columns}
        rowKey="id" // Use a unique key for each row
        pagination={{ pageSize: 10 }} // Add pagination with 10 items per page
      />
    </div>
  );
};

export default BookingManagementPage;