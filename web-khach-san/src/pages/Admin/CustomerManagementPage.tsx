import React, { useState, useEffect } from 'react';
import { Typography, Table, Tag, Input, Space, Modal, Descriptions, Button, type TableProps } from 'antd';
import { mockCustomers } from '../../mockData'; // Import mock customer data

// const { Title } = Typography;
// const { Search } = Input;
// const { Item } = Descriptions; // Access Item directly from Descriptions

// Define Booking and Customer interfaces based on the structure in mockData.ts
interface Booking {
  bookingId: string;
  roomName: string;
  roomType: string;
  roomPrice: number;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  requestedFeatures?: string;
  promotion?: string;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalStays?: number;
  notes?: string;
  bookings?: Booking[];
}

const CustomerManagementPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]); // Initialize with empty array
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null); // State for selected customer data

  // Update filtered customers when mockCustomers or searchText changes
  useEffect(() => {
    const lowercasedSearchText = searchText.toLowerCase();
    // Import customersWithBookings here or pass it as a dependency if it were dynamic
    const { customersWithBookings } = require('../../mockData'); // Assuming commonJS or similar import

    const filteredData = customersWithBookings.filter(
      (customer: Customer) =>
        customer.name.toLowerCase().includes(lowercasedSearchText) ||
        customer.phone.includes(lowercasedSearchText) ||
        customer.email.toLowerCase().includes(lowercasedSearchText)
    );
    setFilteredCustomers(filteredData);
  }, [searchText]); // Depend on searchText and mockCustomers (though mockCustomers is static here)


  // Handle click on customer name to show details
  const showCustomerDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedCustomer(null);
  };


  // Define table columns
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Customer) => (
        <Space size="middle">
          <Button type="link" onClick={() => showCustomerDetails(record)}>Xem chi tiết</Button>
          {/* Add other actions like Edit/Delete here */}
        </Space>
      ),
    },
  ];

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  return (
    <div>
      <Typography.Title level={2}>Quản lý khách hàng</Typography.Title>

      {/* Search Bar */}
      <Space style={{ marginBottom: 16, width: '100%' }}>
        <Input.Search
          placeholder="Tìm kiếm theo tên, SĐT, Email"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={handleSearch}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
          style={{ width: 300 }}
        />
      </Space>

      {/* Display customer data in a Table */}
      <Table
        dataSource={filteredCustomers}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 10 }}
      />

      {/* Customer Details Modal */}
      <Modal
        title="Chi tiết khách hàng"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedCustomer ? (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="ID">{selectedCustomer.id}</Descriptions.Item>
            <Descriptions.Item label="Họ và tên">{selectedCustomer.name}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{selectedCustomer.phone}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedCustomer.email}</Descriptions.Item>
            <Descriptions.Item label="Số lần lưu trú">{selectedCustomer.totalStays}</Descriptions.Item>
            <Descriptions.Item label="Ghi chú đặc biệt">{selectedCustomer.notes || 'Không có ghi chú'}</Descriptions.Item>
            {/* Add booking history */}
            <Descriptions.Item label="Lịch sử đặt phòng">
              {
                selectedCustomer.bookings && selectedCustomer.bookings.length > 0 ? (
                  selectedCustomer.bookings.map(booking => (
                    <div key={booking.bookingId} style={{ marginBottom: 10, padding: 10, border: '1px solid #f0f0f0' }}>
                      <p><b>Phòng:</b> {booking.roomName} ({booking.roomType})</p>
                      <p><b>Giá:</b> {booking.roomPrice.toLocaleString()} VNĐ</p>
                      <p><b>Check-in:</b> {booking.checkInDate}</p>
                      <p><b>Check-out:</b> {booking.checkOutDate}</p>
                      <p><b>Trạng thái:</b> {booking.status}</p>
                      {booking.requestedFeatures && <p><b>Yêu cầu đặc biệt:</b> {booking.requestedFeatures}</p>}
                      {booking.promotion && <p><b>Ưu đãi:</b> {booking.promotion}</p>}
                    </div>
                  ))
                ) : (
                  <p>Không có lịch sử đặt phòng.</p>
                )
              }
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <p>Loading customer details...</p>
        )}
      </Modal>
    </div>
  );
};

export default CustomerManagementPage;