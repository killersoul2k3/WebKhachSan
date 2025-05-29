import React, { useState, useEffect } from 'react';
import { Typography, Table, Input, Space, Button, Modal, Descriptions, Tag } from 'antd';
import { mockUserRoles } from '../../mockData'; // Import mock user role data
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Search } = Input;
const { Item: DescriptionItem } = Descriptions;

// Define UserRole interface based on the structure in mockData.ts
interface UserRole {
  id: number;
  username: string;
  role: string; // e.g., 'admin', 'letan'
  permissions: string[]; // e.g., ['read_bookings', 'manage_rooms']
  canEdit: boolean; // Indicates if this user role can be edited/deleted (for demo)
}

const UserRoleManagementPage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredUserRoles, setFilteredUserRoles] = useState<UserRole[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserRole | null>(null);

  // Effect to filter user roles when mock data or search text changes
  useEffect(() => {
    const lowercasedSearchText = searchText.toLowerCase();
    const data = mockUserRoles.filter(user =>
      user.username.toLowerCase().includes(lowercasedSearchText) ||
      user.role.toLowerCase().includes(lowercasedSearchText) ||
      user.permissions.some(permission => permission.toLowerCase().includes(lowercasedSearchText))
    );
    setFilteredUserRoles(data);
  }, [searchText]); // Depend on searchText

  const showUserDetails = (user: UserRole) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  // Define table columns with explicit type annotation
  const columns: ColumnsType<UserRole> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Quyền',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Quyền hạn',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions: string[]) => (
        <>
          {permissions.map(permission => (
            <Tag key={permission}>{permission}</Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: UserRole) => (
        <Space size="middle">
          <Button type="link" onClick={() => showUserDetails(record)}>Xem chi tiết</Button>
          {record.canEdit && <Button type="link">Sửa</Button>}
          {record.canEdit && <Button type="link" danger>Xóa</Button>}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Quản lý Người dùng và Quyền</Title>

      {/* Search Bar */}
      <Space style={{ marginBottom: 16, width: '100%' }}>
        <Search
          placeholder="Tìm kiếm theo tên đăng nhập, quyền, quyền hạn..."
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={setSearchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 400 }}
        />
      </Space>

      {/* Display user role data in a Table */}
      <Table
        dataSource={filteredUserRoles} // Use the filtered user role data
        columns={columns} as any // Cast to any temporarily if type issues persist
        rowKey="id" // Use a unique key for each row
        pagination={{ pageSize: 10 }} // Add pagination with 10 items per page
      />

      {/* User Details Modal */}
      <Modal
        title="Chi tiết người dùng"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null} // Hide default footer buttons
      >
        {selectedUser && (
          <Descriptions bordered column={1}>
            <DescriptionItem label="ID">{selectedUser.id}</DescriptionItem>
            <DescriptionItem label="Tên đăng nhập">{selectedUser.username}</DescriptionItem>
            <DescriptionItem label="Quyền">{selectedUser.role}</DescriptionItem>
            <DescriptionItem label="Quyền hạn">
              <Space wrap>
                {selectedUser.permissions.map(permission => (
                  <Tag key={permission}>{permission}</Tag>
                ))}
              </Space>
            </DescriptionItem>
             <DescriptionItem label="Có thể chỉnh sửa">{selectedUser.canEdit ? 'Có' : 'Không'}</DescriptionItem>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default UserRoleManagementPage; 