import React, { useState, useEffect } from 'react';
import { Typography, Table, Input, Space, Button, Modal, Descriptions } from 'antd';
import { mockUserRoles } from '../../mockData'; // Import mock user role data

// Define UserRole interface based on the structure in mockData.ts
interface UserRole {
  id: number;
  username: string;
  role: string;
  email: string;
  department: string;
  password?: string;
  canEdit?: boolean;
}

const { Title } = Typography;
const { Search } = Input;

const UserRoleManagementPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredUserRoles, setFilteredUserRoles] = useState<UserRole[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRole | null>(null);

  // Update filtered user roles when mockUserRoles or searchText changes
  useEffect(() => {
    const lowercasedSearchText = searchText.toLowerCase();
    const { updatedMockUserRoles } = require('../../mockData'); // Assuming commonJS or similar import

    const filteredData = updatedMockUserRoles.filter((user: UserRole) =>
      user.username.toLowerCase().includes(lowercasedSearchText) ||
      user.role.toLowerCase().includes(lowercasedSearchText) ||
      user.email.toLowerCase().includes(lowercasedSearchText)
    );
    setFilteredUserRoles(filteredData);
  }, [searchText]); // Depend on searchText and mockUserRoles (though mockUserRoles is static here)

  // Define table columns
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Bộ phận',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: UserRole) => (
        <Space size="middle">
          <Button type="link" onClick={() => showUserDetails(record)}>Xem chi tiết</Button>
          {record.canEdit && <Button type="link">Sửa</Button>}
        </Space>
      ),
    },
  ];

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const showUserDetails = (user: UserRole) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Phân quyền người dùng</Title>

      {/* Search Bar */}
      <Space style={{ marginBottom: 16, width: '100%' }}>
        <Search
          placeholder="Tìm kiếm theo tên người dùng, vai trò..."
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

      {/* User Details Modal */}
      <Modal
        title="Chi tiết người dùng"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedUser ? (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="ID">{selectedUser.id}</Descriptions.Item>
            <Descriptions.Item label="Tên người dùng">{selectedUser.username}</Descriptions.Item>
            <Descriptions.Item label="Vai trò">{selectedUser.role}</Descriptions.Item>
            <Descriptions.Item label="Bộ phận">{selectedUser.department}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedUser.email}</Descriptions.Item>
            {selectedUser.password && <Descriptions.Item label="Mật khẩu (Tạm thời)">{selectedUser.password}</Descriptions.Item>}
          </Descriptions>
        ) : (
          <p>Đang tải chi tiết người dùng...</p>
        )}
      </Modal>
    </div>
  );
};

export default UserRoleManagementPage; 