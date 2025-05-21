import React, { useState, useEffect } from 'react';
import { Typography, Table, Input, Space } from 'antd';
import { mockServices } from '../../mockData'; // Import mock service data

// Define Service interface based on the structure in mockData.ts
interface Service {
  id: number;
  name: string;
  price: number;
  description: string;
}

const { Title } = Typography;
const { Search } = Input;

const ServiceManagementPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredServices, setFilteredServices] = useState<Service[]>(mockServices);

  // Update filtered services when mockServices or searchText changes
  useEffect(() => {
    const lowercasedSearchText = searchText.toLowerCase();
    const filteredData = mockServices.filter((service: Service) =>
      service.name.toLowerCase().includes(lowercasedSearchText) ||
      service.description.toLowerCase().includes(lowercasedSearchText) ||
      service.price.toString().includes(lowercasedSearchText) // Allow searching by price as well
    );
    setFilteredServices(filteredData);
  }, [searchText]); // Depend on searchText and mockServices (though mockServices is static here)

  // Define table columns
  const columns = [
    { title: 'ID Dịch vụ', dataIndex: 'id', key: 'id' },
    { title: 'Tên dịch vụ', dataIndex: 'name', key: 'name' },
    { title: 'Giá', dataIndex: 'price', key: 'price', render: (price: number) => price === 0 ? 'Miễn phí' : `${price.toLocaleString()} VNĐ` },
    { title: 'Mô tả', dataIndex: 'description', key: 'description' },
    // Add more columns as needed
  ];

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  return (
    <div>
      <Title level={2}>Quản lý dịch vụ</Title>

      {/* Search Bar */}
      <Space style={{ marginBottom: 16, width: '100%' }}>
        <Search
          placeholder="Tìm kiếm theo tên, mô tả, hoặc giá"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)} // Filter as user types
          style={{ width: 400 }}
        />
      </Space>

      {/* Display service data in a Table */}
      <Table
        dataSource={filteredServices} // Use the filtered service data
        columns={columns}
        rowKey="id" // Use a unique key for each row
        pagination={{ pageSize: 10 }} // Add pagination with 10 items per page
      />
    </div>
  );
};

export default ServiceManagementPage; 