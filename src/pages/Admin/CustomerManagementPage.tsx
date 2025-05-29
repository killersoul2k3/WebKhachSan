import React, { useState, useEffect } from 'react';
import { Typography, Table, Tag, Input, Space, Modal, Descriptions, Button, type TableProps } from 'antd';
import { mockCustomers } from '../../mockData'; // Import mock customer data
import { mockBookings } from '../../mockData'; // Import mock booking data

const { Title } = Typography;
const { Search } = Input;
const { Item: DescriptionItem } = Descriptions;

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  bookings: number[]; // Array of booking IDs
}

interface Booking {
    id: number;
    room_id: number;
    check_in: string;
    check_out: string;
    total_price: number;
    status: string;
}

// Define a type that extends Customer to include booking details
interface CustomerWithBookingDetails extends Customer {
  bookingDetails: Booking[];
}

const CustomerManagementPage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerWithBookingDetails[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerWithBookingDetails | null>(null);

  // Effect to filter customers when mock data or search text changes
  useEffect(() => {
    // Simulate joining customer data with their booking details
    const customersWithBookings: CustomerWithBookingDetails[] = mockCustomers.map(customer => {
        const bookingDetails = mockBookings.filter(booking => customer.bookings.includes(booking.id));
        return { ...customer, bookingDetails };
    });
    
    const lowercasedSearchText = searchText.toLowerCase();
    const data = customersWithBookings.filter(customer =>
      customer.name.toLowerCase().includes(lowercasedSearchText) ||
      customer.phone.includes(lowercasedSearchText) ||
      customer.email.toLowerCase().includes(lowercasedSearchText)
    );
    setFilteredCustomers(data);
  }, [searchText]); // Depend on searchText

  const showCustomerDetails = (customer: CustomerWithBookingDetails) => {
    setSelectedCustomer(customer);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedCustomer(null);
  };

  // Define table columns with explicit type annotation for clarity
  const columns: TableProps<Customer>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },\n    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: CustomerWithBookingDetails) => (
        <Space size="middle">
          <Button type="link" onClick={() => showCustomerDetails(record)}>Xem chi tiết</Button>
          {/* Add other actions like Edit/Delete here */}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Quản lý khách hàng</Title>

      {/* Search Bar */}
      <Space style={{ marginBottom: 16, width: '100%' }}>
        <Search
          placeholder="Tìm kiếm theo tên, SĐT, Email"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={setSearchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
      </Space>

      {/* Display customer data in a Table */}
      <Table
        dataSource={filteredCustomers} // Use the filtered customer data
        columns={columns} as any // Explicitly type columns, cast if needed
        rowKey="id" // Use a unique key for each row
        pagination={{ pageSize: 10 }} // Add pagination with 10 items per page
      />

      {/* Customer Details Modal */}
      <Modal
        title="Chi tiết khách hàng"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null} // Hide default footer buttons
      >
        {selectedCustomer && (
          <Descriptions bordered column={1}>
            <DescriptionItem label="ID">{selectedCustomer.id}</DescriptionItem>
            <DescriptionItem label="Tên">{selectedCustomer.name}</DescriptionItem>
            <DescriptionItem label="SĐT">{selectedCustomer.phone}</DescriptionItem>
            <DescriptionItem label="Email">{selectedCustomer.email}</DescriptionItem>
            <DescriptionItem label="Booking IDs">{selectedCustomer.bookings.join(', ')}</DescriptionItem>
            {/* Display booking details if available */}
            {selectedCustomer.bookingDetails && selectedCustomer.bookingDetails.length > 0 && (
                <DescriptionItem label="Chi tiết Booking">
                    {
                        selectedCustomer.bookingDetails.map(booking => (
                            <div key={booking.id} style={{ marginBottom: 10, padding: 10, border: '1px solid #f0f0f0' }}>
                                <p><b>Booking ID:</b> {booking.id}</p>
                                <p><b>Phòng ID:</b> {booking.room_id}</p>
                                <p><b>Check-in:</b> {booking.check_in}</p>
                                <p><b>Check-out:</b> {booking.check_out}</p>
                                <p><b>Tổng giá:</b> {booking.total_price.toLocaleString()} VNĐ</p>
                                <p><b>Trạng thái:</b> <Tag color={booking.status === 'Đã xác nhận' ? 'green' : 'gold'}>{booking.status}</Tag></p>
                            </div>
                        ))
                    }
                </DescriptionItem>
            )}
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default CustomerManagementPage; 