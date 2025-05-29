import React from 'react';
import { Card, Col, Row, Typography, Statistic, Table } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
// import { Line, Bar } from 'react-chartjs-2';
// import { 
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title as ChartTitle,
//   Tooltip,
//   Legend
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ChartTitle,
//   Tooltip,
//   Legend
// );

// Dummy data for the dashboard
const revenueToday = 15000000; // Example revenue
const revenueThisMonth = 350000000; // Example revenue
const occupancyRateToday = 85; // Percentage
const occupancyRateThisWeek = 78; // Percentage
const pendingBookings = 15; // Number of pending bookings
const confirmedBookings = 85; // Number of confirmed bookings

// Dummy data for room status table
const roomStatusData = [
  { key: '1', roomNumber: '101', type: 'Standard', status: 'Available' },
  { key: '2', roomNumber: '102', type: 'Standard', status: 'Occupied' },
  { key: '3', roomNumber: '201', type: 'Deluxe', status: 'Available' },
  { key: '4', roomNumber: '202', type: 'Deluxe', status: 'Available' },
  { key: '5', roomNumber: '301', type: 'Suite', status: 'Occupied' },
];

// Columns for room status table
const roomStatusColumns = [
  {
    title: 'Số phòng',
    dataIndex: 'roomNumber',
    key: 'roomNumber',
  },
  {
    title: 'Loại phòng',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Typography.Text type={status === 'Available' ? 'success' : 'danger'}>
        {status === 'Available' ? 'Trống' : 'Đang sử dụng'}
      </Typography.Text>
    ),
  },
];

const { Title } = Typography;

const DashboardPage: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Dashboard Tổng quan</Title>

      {/* Quick Statistics */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Tỷ lệ lấp đầy (Hôm nay)"
              value={occupancyRateToday}
              formatter={(value) => `${value}%`}
              valueStyle={{ color: occupancyRateToday > 70 ? '#3f8600' : '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Tỷ lệ lấp đầy (Tuần này)"
              value={occupancyRateThisWeek}
              formatter={(value) => `${value}%`}
              valueStyle={{ color: occupancyRateThisWeek > 65 ? '#3f8600' : '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Booking đang xử lý"
              value={pendingBookings}
              valueStyle={{ color: pendingBookings > 0 ? '#faad14' : '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Booking đã xác nhận"
              value={confirmedBookings}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Doanh thu (Hôm nay)"
              value={revenueToday.toLocaleString()}
              formatter={(value) => `${value} VNĐ`}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Doanh thu (Tháng này)"
              value={revenueThisMonth.toLocaleString()}
              formatter={(value) => `${value} VNĐ`}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Room Status Table */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Bảng trạng thái phòng">
            <Table
              columns={roomStatusColumns as any} // Cast columns to any temporarily
              dataSource={roomStatusData}
              pagination={false}
              rowKey="key" // Use a unique key for each row
            />
          </Card>
        </Col>
      </Row>

      {/* Add more sections for charts or other info as needed */}

    </div>
  );
};

export default DashboardPage; 