import React, { useState, useEffect } from 'react';
import { Typography, Table, Tag, Input, Space, Button, Modal, Form, message } from 'antd'; // Import message
import { mockServices } from '../../mockData'; // Import mock service data
import type { ColumnsType } from 'antd/es/table'; // Import ColumnsType

const { Title } = Typography;
const { Search, TextArea } = Input; // Destructure TextArea
const { Item: FormItem } = Form; // Alias Form.Item to avoid conflict if needed later

// Define Service interface based on the structure in mockData.ts
interface Service {
  id: number;
  name: string;
  price: number;
  description?: string;
}

const ServiceManagementPage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [serviceList, setServiceList] = useState<Service[]>(mockServices);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [form] = Form.useForm(); // Create a form instance

  // Update filtered services when serviceList or searchText changes
  const filteredServices = serviceList.filter(service =>
    service.name.toLowerCase().includes(searchText.toLowerCase()) ||
    (service.description?.toLowerCase().includes(searchText.toLowerCase()) || false) ||
    service.price.toString().includes(searchText) // Allow searching by price as well
  );

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleAdd = () => {
    setEditingService(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    form.setFieldsValue(service);
    setIsModalVisible(true);
  };

  const handleDelete = (serviceId: number) => {
    // In a real app, you'd call an API here
    const updatedList = serviceList.filter(service => service.id !== serviceId);
    setServiceList(updatedList); // Update state
    message.success('Dịch vụ đã được xóa.'); // Provide feedback
  };

  const handleSave = (values: Service) => {
    // In a real app, you'd call an API here
    if (editingService) {
      // Update existing service
      const updatedList = serviceList.map(service =>
        service.id === editingService.id ? { ...service, ...values } : service
      );
      setServiceList(updatedList);
      message.success('Thông tin dịch vụ đã được cập nhật.');
    } else {
      // Add new service
      const newService = { ...values, id: serviceList.length > 0 ? Math.max(...serviceList.map(s => s.id)) + 1 : 1 }; // Simple ID generation
      setServiceList([...serviceList, newService]);
      message.success('Dịch vụ mới đã được thêm.');
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingService(null);
    form.resetFields();
  };

  // Define table columns with explicit type annotation
  const columns: ColumnsType<Service> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price.toLocaleString()} VNĐ`,
    },
     {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {\n      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Service) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>Sửa</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Quản lý Dịch vụ</Title>

      {/* Search and Add Button */}
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
        <Search
          placeholder="Tìm kiếm theo tên, mô tả, giá..."
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)} // Filter as user types
          style={{ width: 400 }}
        />
        <Button type="primary" onClick={handleAdd}>Thêm mới dịch vụ</Button>
      </Space>

      {/* Display service data in a Table */}
      <Table
        dataSource={filteredServices} // Use the filtered service data
        columns={columns} as any // Cast to any temporarily if type issues persist
        rowKey="id" // Use a unique key for each row
        pagination={{ pageSize: 10 }} // Add pagination with 10 items per page
      />

      {/* Add/Edit Service Modal */}
      <Modal
        title={editingService ? 'Chỉnh sửa dịch vụ' : 'Thêm mới dịch vụ'}
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
            name="name"
            label="Tên dịch vụ"
            rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ!' }]}
          >
            <Input id="service-name"/>
          </FormItem>
          <FormItem
            name="price"
            label="Giá"
            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
          >
            <Input type="number" id="service-price"/>
          </FormItem>
          <FormItem
            name="description"
            label="Mô tả"
          >
            <TextArea rows={3} id="service-description"/>
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

export default ServiceManagementPage; 