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
//   Title as ChartTitle,
//   Tooltip,
//   Legend,
//   BarElement,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,\n//   PointElement,
//   LineElement,
//   ChartTitle,
//   Tooltip,
//   Legend,
//   BarElement
// );

const { Title } = Typography;

const DashboardPage: React.FC = () => {
  // Mock Data (Replace with actual data fetching in a real application)
  const occupancyToday = 0.75; // 75%
  const occupancyThisWeek = 0.70; // 70%
  const pendingBookings = 15;
  const confirmedBookings = 85;
  const revenueToday = 15000000; // 15 million VND
  const revenueThisMonth = 250000000; // 250 million VND

  const roomStatusData = [
    { key: '1', status: 'Occupied', count: 45 },
    { key: '2', status: 'Vacant', count: 10 },
    { key: '3', status: 'Cleaning', count: 3 },
    { key: '4', status: 'Maintenance', count: 2 },
  ];

  const roomStatusColumns = [
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    { title: 'Số lượng phòng', dataIndex: 'count', key: 'count' },
  ];

  // Mock data for charts - REMOVED
  // const monthlyRevenueData = {
  //   labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  //   datasets: [
  //     {
  //       label: 'Doanh thu hàng tháng (VNĐ)',
  //       data: [50000000, 60000000, 75000000, 90000000, 110000000, 130000000, 150000000, 160000000, 140000000, 180000000, 200000000, 250000000],
  //       borderColor: 'rgb(75, 192, 192)',
  //       tension: 0.1,
  //     },
  //   ],
  // };

  // const monthlyBookingData = {
  //   labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  //   datasets: [
  //     {
  //       label: 'Số lượt đặt phòng hàng tháng',
  //       data: [50, 65, 70, 80, 95, 110, 120, 130, 115, 140, 160, 180],
  //       backgroundColor: 'rgba(54, 162, 235, 0.5)',
  //     },
  //   ],
  // };

  // const chartOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top' as const,
  //     },
  //   },
  // };


  return (
    <div>
      <Title level={2}>Trang tổng quan</Title>

      {/* Quick Statistics */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Tỷ lệ lấp đầy (Hôm nay)"
              value={(occupancyToday * 100).toFixed(1)}
              formatter={(value) => `${value}%`}
              valueStyle={{ color: occupancyToday > 0.6 ? '#3f8600' : '#cf1322' }}
              prefix={occupancyToday > 0.6 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Tỷ lệ lấp đầy (Tuần này)"
              value={(occupancyThisWeek * 100).toFixed(1)}
              formatter={(value) => `${value}%`}
              valueStyle={{ color: occupancyThisWeek > 0.6 ? '#3f8600' : '#cf1322' }}
              prefix={occupancyThisWeek > 0.6 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Booking đang xử lý"
              value={pendingBookings}
              valueStyle={{ color: '#faad14' }}
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

      {/* Monthly Revenue Chart */}
      {/* Removed Chart Code */}

      {/* Monthly Booking Count Chart */}
      {/* Removed Chart Code */}

      {/* Room Status Table */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Bảng trạng thái phòng">
            <Table
              columns={roomStatusColumns}
              dataSource={roomStatusData}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage; 