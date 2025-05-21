import React, { useState, useEffect } from 'react';
import { Typography, Table, Input, Space } from 'antd';
import { mockUserRoles } from '../../mockData'; // Import mock user role data

// Define UserRole interface based on the structure in mockData.ts
interface UserRole {
  id: number;
  username: string;
  role: string;
  email: string;
}

const { Title } = Typography;
const { Search } = Input;

const UserRoleManagementPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredUserRoles, setFilteredUserRoles] = useState<UserRole[]>(mockUserRoles);

  // Update filtered user roles when mockUserRoles or searchText changes
  useEffect(() => {
    const lowercasedSearchText = searchText.toLowerCase();
    const filteredData = mockUserRoles.filter((user: UserRole) =>
      user.username.toLowerCase().includes(lowercasedSearchText) ||
      user.role.toLowerCase().includes(lowercasedSearchText) ||
      user.email.toLowerCase().includes(lowercasedSearchText)
    );
    setFilteredUserRoles(filteredData);
  }, [searchText]); // Depend on searchText and mockUserRoles (though mockUserRoles is static here)

  // Define table columns
  const columns = [
    { title: 'ID Người dùng', dataIndex: 'id', key: 'id' },
    { title: 'Tên đăng nhập', dataIndex: 'username', key: 'username' },
    { title: 'Vai trò', dataIndex: 'role', key: 'role' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    // Add more columns as needed
  ];

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  return (
    <div>
      <Title level={2}>Phân quyền người dùng</Title>

      {/* Search Bar */}
      <Space style={{ marginBottom: 16, width: '100%' }}>
        <Search
          placeholder="Tìm kiếm theo tên đăng nhập, vai trò, hoặc email"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)} // Filter as user types
          style={{ width: 400 }}
        />
      </Space>

      {/* Display user role data in a Table */}
      <Table
        dataSource={filteredUserRoles} // Use the filtered user role data
        columns={columns}
        rowKey="id" // Use a unique key for each row
        pagination={{ pageSize: 10 }} // Add pagination with 10 items per page
      />
    </div>
  );
};

export default UserRoleManagementPage; 