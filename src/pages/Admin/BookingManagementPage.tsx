import React, { useState, useEffect } from 'react';
import { Typography, Table, Tag, Input, Space, Select } from 'antd';
import { mockBookings, mockCustomers } from '../../mockData'; // Import mock booking and customer data
import { mockRooms } from '../RoomTypesPage'; // Import mock room data

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

// Define interfaces for data structures
interface Booking {
  id: number;
  customer_id: number;
  room_id: number; // Assuming room_id exists based on usage
  check_in: string; // Use string for date/time as per mock data structure
  check_out: string; // Use string for date/time
  total_price: number;
  status: string;
}

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
}

interface Room {
  id: number;
  name: string; // Assuming room has a name based on usage
}

interface BookingWithDetails extends Booking {
  customerName: string;
  roomName: string;
}

const BookingManagementPage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);
  const [bookingList, setBookingList] = useState<Booking[]>([]);

  // Fetch and combine data (simulate fetching and joining data)
  useEffect(() => {
    // In a real application, you would fetch data from an API.
    // Here, we combine mock data.
    const combinedBookings: BookingWithDetails[] = mockBookings.map((booking: Booking) => {
      const customer = mockCustomers.find(cust => cust.id === booking.customer_id);
      const room = mockRooms.find(r => r.id === booking.room_id);

      return {
        ...booking,
        customerName: customer ? customer.name : 'N/A',
        roomName: room ? room.name : 'N/A',
      };
    });
    setBookingList(combinedBookings as any);
  }, []); // Empty dependency array means this runs once on mount

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleStatusFilter = (value: string | undefined) => {
    setFilterStatus(value);
  };

  // Filter bookings based on search text and status
  const filteredBookings = bookingList.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
                          booking.roomName.toLowerCase().includes(searchText.toLowerCase()) ||
                          booking.status.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filterStatus ? booking.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  // Define table columns
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Phòng',
      dataIndex: 'roomName',
      key: 'roomName',
    },
    {
      title: 'Ngày nhận phòng',
      dataIndex: 'check_in',
      key: 'check_in',
    },
    {
      title: 'Ngày trả phòng',
      dataIndex: 'check_out',
      key: 'check_out',
    },
    {
      title: 'Tổng giá',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (price: number) => `${price.toLocaleString()} VNĐ`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'gold'; // Đang xử lý
        if (status === 'Đã xác nhận') color = 'green';
        else if (status === 'Đã hủy') color = 'volcano';
        else if (status === 'Đã hoàn thành') color = 'blue';
        return (
          <Tag color={color}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: BookingWithDetails) => (
        <Space size="middle">
          {/* Add action buttons here, e.g., Edit, View Details, Cancel */}
          {/* <Button type="link">Xem chi tiết</Button> */}
          {/* <Button type="link">Hủy</Button> */}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Quản lý đặt phòng</Title>

      <Space style={{ marginBottom: 16, width: '100%' }}>
        {/* Status Filter */}
        <Select
          allowClear
          placeholder="Lọc theo trạng thái"
          style={{ width: 180 }}
          onChange={handleStatusFilter}
          value={filterStatus}
        >
          <Option value="Đang xử lý">Đang xử lý</Option>
          <Option value="Đã xác nhận">Đã xác nhận</Option>
          <Option value="Đã hủy">Đã hủy</Option>
          <Option value="Đã hoàn thành">Đã hoàn thành</Option>
        </Select>

        <Search
          placeholder="Tìm kiếm theo khách hàng, phòng, trạng thái"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)} // Filter as user types
          style={{ width: 400 }}
        />
      </Space>

      <Table
        dataSource={filteredBookings} // Use the filtered booking data
        columns={columns as any} // Cast columns to any temporarily if TS errors persist due to type mismatch
        rowKey={(record) => record.id.toString()} // Use a function to get the key from the record
        pagination={{ pageSize: 10 }} // Add pagination with 10 items per page
      />
    </div>
  );
};

export default BookingManagementPage; 