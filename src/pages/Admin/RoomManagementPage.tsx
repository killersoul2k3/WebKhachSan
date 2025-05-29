import React, { useState, useEffect } from 'react';
import { Typography, Table, Tag, Input, Space, Select, Button, Modal, Form } from 'antd';
import { mockRooms } from '../RoomTypesPage'; // Import mock room data
import { mockRoomTypes } from '../../mockData'; // Import mock room types
import type { ColumnsType } from 'antd/es/table'; // Import ColumnsType

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;
const { Item: FormItem } = Form;

interface Room {
  id: number;
  roomNumber: string;
  type: string; // Corresponds to room type name
  status: 'Available' | 'Occupied' | 'Maintenance'; // Example statuses
  price: number;
  description?: string;
}

// Assuming mockRooms has the structure:
// [{ id: 1, roomNumber: '101', type: 'Standard', status: 'Available', price: 1000000 }, ...]

const RoomManagementPage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);
  const [filterType, setFilterType] = useState<string | undefined>(undefined);
  const [roomList, setRoomList] = useState<Room[]>(mockRooms);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [form] = Form.useForm();

  // Filter rooms based on search text, status, and type
  const filteredRooms = roomList.filter(room => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchText.toLowerCase()) ||
                          room.type.toLowerCase().includes(searchText.toLowerCase()) ||
                          (room.description?.toLowerCase().includes(searchText.toLowerCase()) || false);
    const matchesStatus = filterStatus ? room.status === filterStatus : true;
    const matchesType = filterType ? room.type === filterType : true;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleStatusFilter = (value: string | undefined) => {
    setFilterStatus(value);
  };

  const handleTypeFilter = (value: string | undefined) => {
    setFilterType(value);
  };

  const handleAdd = () => {
    setEditingRoom(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
    form.setFieldsValue(room);
    setIsModalVisible(true);
  };

  const handleDelete = (roomId: number) => {
    // In a real app, you'd call an API here
    const updatedList = roomList.filter(room => room.id !== roomId);
    setRoomList(updatedList); // Update state
    // message.success('Phòng đã được xóa.'); // Use message component if available
    alert('Phòng đã được xóa.'); // Fallback to alert
  };

  const handleSave = (values: Room) => {
    // In a real app, you'd call an API here
    if (editingRoom) {
      // Update existing room
      const updatedList = roomList.map(room =>
        room.id === editingRoom.id ? { ...room, ...values } : room
      );
      setRoomList(updatedList);
      // message.success('Thông tin phòng đã được cập nhật.'); // Use message component if available
      alert('Thông tin phòng đã được cập nhật.'); // Fallback to alert
    } else {
      // Add new room
      const newRoom = { ...values, id: roomList.length > 0 ? Math.max(...roomList.map(r => r.id)) + 1 : 1 }; // Simple ID generation
      setRoomList([...roomList, newRoom]);
      // message.success('Phòng mới đã được thêm.'); // Use message component if available
      alert('Phòng mới đã được thêm.'); // Fallback to alert
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRoom(null);
    form.resetFields();
  };

  // Define table columns with explicit type annotation
  const columns: ColumnsType<Room> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
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
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price.toLocaleString()} VNĐ`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Available' ? 'green' : status === 'Occupied' ? 'volcano' : 'blue'}>
          {status === 'Available' ? 'Trống' : status === 'Occupied' ? 'Đang sử dụng' : 'Bảo trì'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Room) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>Sửa</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Quản lý Phòng</Title>

      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
        {/* Filters */}
        <Space>
          {/* Status Filter */}
          <Select
            allowClear
            placeholder="Lọc theo trạng thái"
            style={{ width: 180 }}
            onChange={handleStatusFilter}
            value={filterStatus}
          >
            <Option value="Available">Trống</Option>
            <Option value="Occupied">Đang sử dụng</Option>
            <Option value="Maintenance">Bảo trì</Option>
          </Select>

          {/* Type Filter */}
           <Select
            allowClear
            placeholder="Lọc theo loại phòng"
            style={{ width: 180 }}
            onChange={handleTypeFilter}
            value={filterType}
          >
            {mockRoomTypes.map(type => <Option key={type.id} value={type.name}>{type.name}</Option>)}
          </Select>

          {/* Search Bar */}
          <Search
            placeholder="Tìm kiếm theo số phòng, loại, mô tả..."
            allowClear
            enterButton="Tìm kiếm"
            size="large"
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 300 }}
          />
        </Space>

        {/* Add New Room Button */}
        <Button type="primary" onClick={handleAdd}>Thêm mới phòng</Button>
      </Space>

      {/* Display room data in a Table */}
      <Table
        dataSource={filteredRooms} // Use the filtered room data
        columns={columns} as any // Cast to any temporarily if type issues persist
        rowKey="id" // Use a unique key for each row
        pagination={{ pageSize: 10 }} // Add pagination with 10 items per page
      />

      {/* Add/Edit Room Modal */}
      <Modal
        title={editingRoom ? 'Chỉnh sửa thông tin phòng' : 'Thêm mới phòng'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Hide default footer buttons
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
        >
          <FormItem
            name="roomNumber"
            label="Số phòng"
            rules={[{ required: true, message: 'Vui lòng nhập số phòng!' }]}
          >
            <Input />
          </FormItem>
          <FormItem
            name="type"
            label="Loại phòng"
             rules={[{ required: true, message: 'Vui lòng chọn loại phòng!' }]}
          >
            <Select placeholder="Chọn loại phòng">
              {mockRoomTypes.map(type => <Option key={type.id} value={type.name}>{type.name}</Option>)}
            </Select>
          </FormItem>
          <FormItem
            name="price"
            label="Giá"
            rules={[{ required: true, message: 'Vui lòng chọn mức giá!' }]}
          >
            <Select placeholder="Chọn mức giá">
              <Option value={500000}>500.000 VNĐ</Option>
              <Option value={1000000}>1.000.000 VNĐ</Option>
              <Option value={2000000}>2.000.000 VNĐ</Option>
              <Option value={3000000}>3.000.000 VNĐ</Option>
              <Option value={5000000}>5.000.000 VNĐ</Option>
              <Option value={10000000}>10.000.000 VNĐ</Option>
            </Select>
          </FormItem>
           <FormItem
            name="status"
            label="Trạng thái"
             rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select placeholder="Chọn trạng thái">
                <Option value="Available">Trống</Option>
                <Option value="Occupied">Đang sử dụng</Option>
                <Option value="Maintenance">Bảo trì</Option>
            </Select>
          </FormItem>
          <FormItem
            name="description"
            label="Mô tả"
          >
            <Input.TextArea rows={3} />
          </FormItem>
          <FormItem>
            <Space>
              <Button onClick={handleCancel}>Hủy</Button>
              <Button type="primary" htmlType="submit">Lưu</Button>
            </Space>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
};

export default RoomManagementPage; 