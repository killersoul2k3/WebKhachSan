import React, { useState, useEffect } from 'react';
import { Typography, Table, Input, Space, Modal, Descriptions } from 'antd';
import { mockCustomers } from '../../mockData'; // Import mock customer data

const { Title } = Typography;
const { Search } = Input;
const { Item } = Descriptions; // Import Item from Descriptions

const CustomerManagementPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(mockCustomers);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null); // State for selected customer data

  // Update filtered customers when mockCustomers or searchText changes
  useEffect(() => {
    const lowercasedSearchText = searchText.toLowerCase();
    const filteredData = mockCustomers.filter(customer =>
      customer.name.toLowerCase().includes(lowercasedSearchText) ||
      customer.phone.includes(lowercasedSearchText) ||
      customer.email.toLowerCase().includes(lowercasedSearchText)
    );
    setFilteredCustomers(filteredData);
  }, [searchText]); // Depend on searchText and mockCustomers (though mockCustomers is static here)


  // Handle click on customer name to show details
  const showCustomerDetails = (customer: any) => {
    setSelectedCustomer(customer);
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedCustomer(null);
  };


  // Define table columns
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <a onClick={() => showCustomerDetails(record)}>{text}</a> // Make name clickable
      ),
    },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Số lần lưu trú', dataIndex: 'totalStays', key: 'totalStays' },
    { title: 'Ghi chú đặc biệt', dataIndex: 'notes', key: 'notes' },
    // You can add more columns here for other customer details if needed
  ];

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  return (
    <div>
      <Title level={2}>Quản lý khách hàng</Title>

      {/* Search Bar */}
      <Space style={{ marginBottom: 16, width: '100%' }}>
        <Search
          placeholder="Tìm kiếm theo tên, SĐT, Email"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)} // Filter as user types
          style={{ width: 300 }}
        />
      </Space>

      {/* Display customer data in a Table */}
      <Table
        dataSource={filteredCustomers} // Use the filtered customer data
        columns={columns}
        rowKey="id" // Use a unique key for each row
        pagination={{ pageSize: 10 }} // Add pagination
      />

      {/* Customer Details Modal */}
      <Modal
        title="Chi tiết khách hàng"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null} // No footer buttons needed
      >
        {selectedCustomer ? (
          <Descriptions bordered column={1}>
            <Item label="ID">{selectedCustomer.id}</Item>
            <Item label="Họ và tên">{selectedCustomer.name}</Item>
            <Item label="Số điện thoại">{selectedCustomer.phone}</Item>
            <Item label="Email">{selectedCustomer.email}</Item>
            <Item label="Số lần lưu trú">{selectedCustomer.totalStays}</Item>
            <Item label="Ghi chú đặc biệt">{selectedCustomer.notes || 'Không có ghi chú'}</Item>
            {/* Add more details here, e.g., booking history */}
          </Descriptions>
        ) : (
          <p>Loading customer details...</p> // Should not happen with current logic, but good practice
        )}
      </Modal>
    </div>
  );
};

export default CustomerManagementPage; 