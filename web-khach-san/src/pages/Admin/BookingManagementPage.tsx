import React, { useState, useEffect } from 'react';
import { Typography, Table, Tag, Input, Space, Select } from 'antd';
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

// Define Booking interface based on the structure in mockData.ts
interface Booking {
  id: number;
  customerId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  requestedFeatures?: string;
}

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select; // Destructure Option from Select

const BookingManagementPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined); // State for status filter
  const [filteredBookings, setFilteredBookings] = useState(mockBookings);

  // Function to get customer name by ID
  const getCustomerName = (customerId: number): string => {
    const customer = mockCustomers.find(c => c.id === customerId);
    return customer ? customer.name : 'N/A';
  };

  // Update filtered bookings when mockBookings, searchText or filterStatus changes
  useEffect(() => {
    const lowercasedSearchText = searchText.toLowerCase();
    const filteredData = mockBookings.filter(booking => {
      const customerName = getCustomerName(booking.customerId).toLowerCase();
      const room = mockRooms.find((r: Room) => r.id === booking.roomId);
      const roomIdentifier = room ? `${room.name} ${room.type}`.toLowerCase() : '';

      const matchesSearch = booking.id.toString().includes(lowercasedSearchText) ||
        booking.roomId.toString().includes(lowercasedSearchText) ||
        customerName.includes(lowercasedSearchText) ||
        roomIdentifier.includes(lowercasedSearchText); // Remove status from general search

      const matchesStatus = filterStatus ? booking.status === filterStatus : true;

      return matchesSearch && matchesStatus;
    });
    setFilteredBookings(filteredData);
  }, [searchText, filterStatus]); // Depend on searchText, filterStatus, and mockBookings (though mockBookings is static here)

  // Function to handle search input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

   // Function to handle search button click/Enter (for onSearch)
   const handleSearch = (value: string) => {
    // The actual filtering is done in useEffect based on searchText state
    console.log("Search triggered with:", value);
  };

   // Function to handle status filter change
   const handleStatusChange = (value: string | undefined) => {
    setFilterStatus(value);
  };

  // Define table columns
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Phòng ID',
      dataIndex: 'roomId',
      key: 'roomId',
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customerId',
      key: 'customerId',
      render: (customerId: number) => getCustomerName(customerId),
    },
    {
      title: 'Ngày nhận phòng',
      dataIndex: 'checkInDate',
      key: 'checkInDate',
    },
    {
      title: 'Ngày trả phòng',
      dataIndex: 'checkOutDate',
      key: 'checkOutDate',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = status === 'Đã xác nhận' ? 'green' : 'volcano';
        if (status === 'Đang xử lý') {
          color = 'gold';
        } else if (status === 'Đã hoàn thành') {
            color = 'blue';
        } else if (status === 'Đã hủy') {
            color = 'red';
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

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Quản lý đặt phòng</Title>

      {/* Filter and Search Bar */}
      <Space style={{ marginBottom: 16, width: '100%' }}>
        {/* Status Filter */}
        <Select
          allowClear
          placeholder="Lọc theo trạng thái"
          style={{ width: 180 }}
          onChange={handleStatusChange}
          value={filterStatus}
        >
          <Option value="Đang xử lý">Đang xử lý</Option>
          <Option value="Đã xác nhận">Đã xác nhận</Option>
          <Option value="Đã hủy">Đã hủy</Option>
          <Option value="Đã hoàn thành">Đã hoàn thành</Option>
        </Select>

        <Search
          placeholder="Tìm kiếm theo ID booking, khách hàng, phòng"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={handleSearch} // Use the new handleSearch that accepts string
          onChange={handleInputChange} // Use the handleInputChange that accepts event
          style={{ width: 400 }}
        />
      </Space>

      {/* Display booking data in a Table */}
      <Table
        dataSource={filteredBookings} // Use the filtered booking data
        columns={columns as any} // Cast columns to any temporarily if TS errors persist due to type mismatch
        rowKey="id" // Use a unique key for each row
        pagination={{ pageSize: 10 }} // Add pagination with 10 items per page
      />
    </div>
  );
};

export default BookingManagementPage;