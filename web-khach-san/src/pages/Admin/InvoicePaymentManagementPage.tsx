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

  // Function to get booking details by ID (for demonstration)
  const getBookingDetails = (bookingId: number) => {
    return mockBookings.find(booking => booking.id === bookingId);
  };

  // Function to get customer name by ID
  const getCustomerName = (customerId: number): string => {
    const customer = mockCustomers.find(c => c.id === customerId);
    return customer ? customer.name : 'N/A';
  };

  // Update filtered invoices when mockInvoices or searchText changes
  useEffect(() => {
    const lowercasedSearchText = searchText.toLowerCase();
    const filteredData = mockInvoices.filter((invoice: Invoice) => {
      const customerName = getCustomerName(invoice.customerId).toLowerCase();

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
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Booking ID',
      dataIndex: 'bookingId',
      key: 'bookingId',
      render: (bookingId: number) => bookingId,
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customerId',
      key: 'customerId',
      render: (customerId: number) => getCustomerName(customerId),
    },
    {
      title: 'Tổng tiền (VNĐ)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => amount.toLocaleString(),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = status === 'Đã thanh toán' ? 'green' : 'volcano';
        return (
          <Tag color={color}>
            {status}
          </Tag>
        );
      },
    },
  ];

  // Function to handle search input change
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Quản lý hóa đơn & thanh toán</Title>

      {/* Search Bar */}
      <Space style={{ marginBottom: 16, width: '100%' }}>
        <Search
          placeholder="Tìm kiếm theo ID, Booking ID, khách hàng, trạng thái..."
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