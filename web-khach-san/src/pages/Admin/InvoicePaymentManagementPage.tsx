import React, { useState, useEffect } from 'react';
import { Typography, Table, Tag, Input, Space } from 'antd';
import { mockInvoices, mockBookings, mockCustomers } from '../../mockData'; // Import mock invoice data

// Define Invoice interface based on the structure in mockData.ts
interface Invoice {
  id: number;
  bookingId: number;
  customerId: number;
  amount: number;
  paymentMethod: string;
  status: string;
  invoiceDate: string;
  notes?: string;
}

const { Title } = Typography;
const { Search } = Input;

const InvoicePaymentManagementPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(mockInvoices);

  // Update filtered invoices when mockInvoices or searchText changes
  useEffect(() => {
    const lowercasedSearchText = searchText.toLowerCase();
    const filteredData = mockInvoices.filter((invoice: Invoice) => {
      const customerName = mockCustomers.find(c => c.id === invoice.customerId)?.name.toLowerCase() || '';

      return (
        invoice.id.toString().includes(lowercasedSearchText) ||
        invoice.bookingId.toString().includes(lowercasedSearchText) ||
        customerName.includes(lowercasedSearchText) ||
        invoice.paymentMethod.toLowerCase().includes(lowercasedSearchText) ||
        invoice.status.toLowerCase().includes(lowercasedSearchText)
      );
    });
    setFilteredInvoices(filteredData);
  }, [searchText]); // Depend on searchText and mockInvoices (though mockInvoices is static here)

  // Define table columns
  const columns = [
    { title: 'ID Hóa đơn', dataIndex: 'id', key: 'id' },
    {
      title: 'ID Booking',
      dataIndex: 'bookingId',
      key: 'bookingId',
      render: (bookingId: number) => bookingId,
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customerId',
      key: 'customerName',
      render: (customerId: number) => mockCustomers.find(c => c.id === customerId)?.name || 'N/A',
    },
    { title: 'Số tiền', dataIndex: 'amount', key: 'amount', render: (amount: number) => `${amount.toLocaleString()} VNĐ` },
    { title: 'Phương thức thanh toán', dataIndex: 'paymentMethod', key: 'paymentMethod' },
    {
      title: 'Trạng thái thanh toán',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color;
        if (status === 'Đã thanh toán') {
          color = 'green';
        } else if (status === 'Chờ thanh toán tiền mặt') {
          color = 'volcano';
        } else if (status === 'Chưa thanh toán') {
          color = 'red';
        } else if (status === 'Đã gia hạn') {
          color = 'blue'; // Or another color to indicate extension
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
    { title: 'Ngày tạo hóa đơn', dataIndex: 'invoiceDate', key: 'invoiceDate' },
    { title: 'Ghi chú', dataIndex: 'notes', key: 'notes' },
    // Add more columns as needed
  ];

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  return (
    <div>
      <Title level={2}>Quản lý hóa đơn & thanh toán</Title>

      {/* Search Bar */}
       <Space style={{ marginBottom: 16, width: '100%' }}>
        <Search
          placeholder="Tìm kiếm theo ID hóa đơn, ID booking, khách hàng, phương thức, trạng thái"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)} // Filter as user types
          style={{ width: 500 }}
        />
      </Space>

      {/* Display invoice data in a Table */}
      <Table
        dataSource={filteredInvoices} // Use the filtered invoice data
        columns={columns}
        rowKey="id" // Use a unique key for each row
        pagination={{ pageSize: 10 }} // Add pagination with 10 items per page
      />
    </div>
  );
};

export default InvoicePaymentManagementPage; 