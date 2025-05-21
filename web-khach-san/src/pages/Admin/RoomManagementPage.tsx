import React, { useState, useEffect } from 'react';
import { Typography, Table, Tag, Input, Space } from 'antd';
import { mockRooms } from '../RoomTypesPage'; // Import mock room data

const { Title } = Typography;
const { Search } = Input;

const RoomManagementPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredRooms, setFilteredRooms] = useState(mockRooms);

  // For demonstration, let's assume rooms with odd IDs are occupied and even are available.
  // In a real app, you would determine status based on bookings.
  const roomsWithStatus = mockRooms.map(room => ({
    ...room,
    status: room.id % 2 === 0 ? 'Available' : 'Occupied'
  }));

  // Update filtered rooms when roomsWithStatus or searchText changes
  useEffect(() => {
    const lowercasedSearchText = searchText.toLowerCase();
    const filteredData = roomsWithStatus.filter(room =>
      room.name.toLowerCase().includes(lowercasedSearchText) ||
      room.type.toLowerCase().includes(lowercasedSearchText) ||
      room.location.toLowerCase().includes(lowercasedSearchText) ||
      (room.status === 'Available' ? 'trống' : 'đang sử dụng').includes(lowercasedSearchText) // Search by localized status
    );
    setFilteredRooms(filteredData);
  }, [searchText, roomsWithStatus]); // Depend on searchText and roomsWithStatus


  // Define table columns
  const columns = [
    { title: 'ID Phòng', dataIndex: 'id', key: 'id' },
    { title: 'Loại phòng', dataIndex: 'type', key: 'type' },
    { title: 'Giá / đêm', dataIndex: 'price', key: 'price', render: (price: number) => `${price.toLocaleString()} VNĐ` },
    { title: 'Địa điểm', dataIndex: 'location', key: 'location' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Available' ? 'green' : 'volcano'}>
          {status === 'Available' ? 'Trống' : 'Đang sử dụng'}
        </Tag>
      ),
    },
    // You can add more columns here for other room details if needed
  ];

  const handleSearch = (value: string) => {
    setSearchText(value);
  };


  return (
    <div>
      <Title level={2}>Quản lý phòng</Title>

       {/* Search Bar */}
       <Space style={{ marginBottom: 16, width: '100%' }}>
        <Search
          placeholder="Tìm kiếm theo tên, loại phòng, địa điểm, trạng thái"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)} // Filter as user types
          style={{ width: 400 }}
        />
      </Space>

      {/* Display room data in a Table */}
      <Table
        dataSource={filteredRooms} // Use the filtered room data
        columns={columns}
        rowKey="id" // Use a unique key for each row
        pagination={{ pageSize: 10 }} // Add pagination with 10 items per page
      />
    </div>
  );
};

export default RoomManagementPage; 