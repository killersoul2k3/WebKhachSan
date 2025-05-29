import React, { useState, useEffect } from 'react';
import { Typography, Table, Tag, Input, Space, Select } from 'antd';
import { mockRooms } from '../RoomTypesPage'; // Import mock room data
// Import specific types from Ant Design if available
// import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select; // Destructure Option from Select

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
  status: string; // Add status property for filtering/display
}

const RoomManagementPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined); // State for status filter
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]); // Explicitly type the state

  // For demonstration, let's assume rooms with odd IDs are occupied and even are available.
  // In a real app, you would determine status based on bookings.
  const roomsWithStatus: Room[] = mockRooms.map(room => ({
    ...room,
    status: room.id % 2 === 0 ? 'Available' : 'Occupied' // Assuming 'Available' and 'Occupied' are the statuses
  }));

  // Update filtered rooms when roomsWithStatus, searchText or filterStatus changes
  useEffect(() => {
    const lowercasedSearchText = searchText.toLowerCase();
    const filteredData = roomsWithStatus.filter(room => {
      const matchesSearch = room.name.toLowerCase().includes(lowercasedSearchText) ||
        room.type.toLowerCase().includes(lowercasedSearchText) ||
        room.location.toLowerCase().includes(lowercasedSearchText);

      const matchesStatus = filterStatus ? room.status === filterStatus : true;

      return matchesSearch && matchesStatus;
    });
    setFilteredRooms(filteredData);
  }, [searchText, filterStatus, roomsWithStatus]);

  // Function to handle search input change (for onChange)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Function to handle search button click/Enter (for onSearch - receives value directly)
  const handleSearch = (value: string) => {
    // The actual filtering is done in useEffect based on searchText state
    console.log("Search triggered with:", value);
  };

  // Function to handle status filter change
  const handleStatusChange = (value: string | undefined) => {
    setFilterStatus(value);
  };

  // Define table columns with more specific types if possible, or cast as a last resort
  // Based on Ant Design docs, columns can be an array of ColumnType or ColumnsType
  // For simplicity and to address current errors, we might still need a temporary 'any'
  const columns: any[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: Room, b: Room) => a.id - b.id, // Example sorter
    },
    {
      title: 'Tên phòng',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Room, b: Room) => a.name.localeCompare(b.name), // Example sorter
    },
    {
      title: 'Loại phòng',
      dataIndex: 'type',
      key: 'type',
      sorter: (a: Room, b: Room) => a.type.localeCompare(b.type), // Example sorter
    },
    {
      title: 'Giá/đêm (VNĐ)',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => price.toLocaleString(),
      sorter: (a: Room, b: Room) => a.price - b.price, // Example sorter
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Available' ? 'green' : 'volcano'}>
          {status === 'Available' ? 'Trống' : 'Đang sử dụng'}
        </Tag>
      ),
      sorter: (a: Room, b: Room) => a.status.localeCompare(b.status), // Example sorter
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Quản lý phòng</Title>

       {/* Filter and Search Bar */}
       <Space style={{ marginBottom: 16, width: '100%' }}>
         {/* Status Filter */}
         <Select
           allowClear
           placeholder="Lọc theo trạng thái"
           style={{ width: 180 }}
           onChange={handleStatusChange}
           value={filterStatus}
           // Add a key prop if needed, though usually not necessary for Select/Option
         >
           <Option value="Available" key="available">Trống</Option>
           <Option value="Occupied" key="occupied">Đang sử dụng</Option>
         </Select>

        <Search
          placeholder="Tìm kiếm theo tên, loại phòng, địa điểm"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={handleSearch}
          onChange={handleInputChange} // Use the new input change handler
          style={{ width: 400 }}
        />
      </Space>

      {/* Display room data in a Table */}
      <Table
        dataSource={filteredRooms} // Use the filtered room data
        columns={columns} // Use the typed columns (casted if necessary)
        rowKey="id" // Use a unique key for each row, string literal 'id' is correct here
        pagination={{ pageSize: 10 }} // Add pagination with 10 items per page
      />
    </div>
  );
};

export default RoomManagementPage; 