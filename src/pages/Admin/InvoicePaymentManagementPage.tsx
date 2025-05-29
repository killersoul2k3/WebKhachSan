import React, { useState, useEffect } from 'react';
import { Typography, Table, Tag, Input, Space, Button } from 'antd';
import { mockInvoices, mockBookings, mockCustomers } from '../../mockData'; // Import mock invoice data
import type { ColumnsType } from 'antd/es/table'; // Import ColumnsType

// Define Invoice interface based on the structure in mockData.ts
interface Invoice {
  id: number;
  booking_id: number;
  customer_id: number;
  amount: number;
  payment_date: string; // Or Date if you parse it
  status: string; // e.g., 'Paid', 'Pending'
}

interface Booking {
    id: number;
    // Add other relevant booking properties if needed for display
}

interface Customer {
    id: number;
    name: string;
}

// Interface for data combined with details
interface InvoiceWithDetails extends Invoice {
    customerName: string; // Add customer name
}

const { Title } = Typography;
const { Search } = Input;

const InvoicePaymentManagementPage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [invoices, setInvoices] = useState<InvoiceWithDetails[]>([]);

  useEffect(() => {
    // Simulate fetching and joining data
    const combinedInvoices: InvoiceWithDetails[] = mockInvoices.map(invoice => {
        const customer = mockCustomers.find(cust => cust.id === invoice.customer_id);
        return { ...invoice, customerName: customer ? customer.name : 'N/A' };
    });
    setInvoices(combinedInvoices);
  }, []); // Empty dependency array means this runs once on mount

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
    invoice.status.toLowerCase().includes(searchText.toLowerCase()) ||
    invoice.id.toString().includes(searchText) // Also search by invoice ID
  );

  // Define table columns with explicit type annotation
  const columns: ColumnsType<InvoiceWithDetails> = [
    {
      title: 'ID Hóa đơn',
      dataIndex: 'id',
      key: 'id',
    },
    {
        title: 'ID Đặt phòng',
        dataIndex: 'booking_id',
        key: 'booking_id',
        // Optional: Render as a link to booking details page
        // render: (bookingId: number) => <Link to={`/admin/bookings/${bookingId}`}>{bookingId}</Link>,
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `${amount.toLocaleString()} VNĐ`,
    },
    {
      title: 'Ngày thanh toán',
      dataIndex: 'payment_date',
      key: 'payment_date',
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
    {
        title: 'Hành động',
        key: 'action',
        render: (_: any, record: InvoiceWithDetails) => (
            <Space size="middle">
                {/* Add action buttons here, e.g., View Details, Mark as Paid */}
                {/* <Button type="link">Xem chi tiết</Button> */}
                {/* {record.status !== 'Đã thanh toán' && (
                    <Button type="link">Mark as Paid</Button>
                )} */}
            </Space>
        ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Quản lý Hóa đơn và Thanh toán</Title>

      {/* Search and Filter */}
      <Space style={{ marginBottom: 16, width: '100%' }}>
        <Search
          placeholder="Tìm kiếm theo khách hàng, trạng thái, ID..."
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
        columns={columns} as any // Cast to any temporarily if type issues persist
        rowKey="id" // Use a unique key for each row
        pagination={{ pageSize: 10 }} // Add pagination with 10 items per page
      />
    </div>
  );
};

export default InvoicePaymentManagementPage; 