import React, { useState, useEffect } from 'react';
import { Typography, Table, Tag, Input, Space, Button, Modal, Form, message } from 'antd';
import { mockServices } from '../../mockData'; // Import mock service data

// Define Service interface based on the structure in mockData.ts
interface Service {
  id: number;
  name: string;
  price: number;
  description: string;
  image?: string; // Thêm trường ảnh, có thể là URL
}

const { Title } = Typography;
const { Search } = Input;
const { Item: FormItem } = Form; // Alias Form.Item to avoid conflict if needed later

const ServiceManagementPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [serviceList, setServiceList] = useState<Service[]>(mockServices); // State to hold mutable service data
  const [filteredServices, setFilteredServices] = useState<Service[]>([]); // State for filtered list
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [form] = Form.useForm(); // Create a form instance

  // Update filtered services when serviceList or searchText changes
  useEffect(() => {
    const lowercasedSearchText = searchText.toLowerCase();
    const filteredData = serviceList.filter((service: Service) =>
      service.name.toLowerCase().includes(lowercasedSearchText) ||
      service.description.toLowerCase().includes(lowercasedSearchText) ||
      service.price.toString().includes(lowercasedSearchText) // Allow searching by price as well
    );
    setFilteredServices(filteredData);
  }, [searchText, serviceList]); // Depend on searchText and serviceList

  // Handlers for CRUD operations
  const handleAdd = () => {
    setEditingService(null); // Clear any previous editing data
    setIsModalVisible(true);
    form.resetFields(); // Reset form fields
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsModalVisible(true);
    form.setFieldsValue(service); // Set form fields with service data
  };

  const handleDelete = (serviceId: number) => {
    // In a real app, you would call an API here
    const updatedList = serviceList.filter(service => service.id !== serviceId);
    setServiceList(updatedList); // Update state
    message.success('Dịch vụ đã được xóa.'); // Provide feedback
  };

  const handleSave = (values: Service) => {
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
    form.resetFields(); // Reset form on cancel
  };

  // Function to handle search input change
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const defaultImage = 'https://via.placeholder.com/80x60?text=No+Image'; // Ảnh mặc định

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image: string | undefined) => (
        <img
          src={image || defaultImage}
          alt="service"
          style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 4, border: '1px solid #eee' }}
        />
      ),
    },
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
      title: 'Giá (VNĐ)',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => price.toLocaleString(),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Service) => (
        <Space size="small">
          <Button type="link" onClick={() => handleEdit(record)}>Sửa</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Quản lý dịch vụ</Title>

      {/* Search Bar */}
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
        <Search
          placeholder="Tìm kiếm theo tên dịch vụ..."
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)} // Filter as user types
          style={{ width: 400 }}
        />
        <Button type="primary" onClick={handleAdd}>Thêm mới</Button>
      </Space>

      {/* Display service data in a Table */}
      <Table
        dataSource={filteredServices} // Use the filtered service data
        columns={columns}
        rowKey="id" // Use a unique key for each row
        pagination={{ pageSize: 10 }} // Add pagination with 10 items per page
      />

      {/* Add/Edit Service Modal */}
      <Modal
        title={editingService ? 'Chỉnh sửa dịch vụ' : 'Thêm mới dịch vụ'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
        >
          <Form.Item
            name="name"
            label="Tên dịch vụ"
            rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="image"
            label="Link ảnh (URL)"
            rules={[
              { required: true, message: 'Vui lòng nhập link ảnh!' },
              { type: 'url', message: 'Link ảnh không hợp lệ!' },
            ]}
            initialValue={defaultImage}
          >
            <Input placeholder="https://..." />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={handleCancel}>Hủy</Button>
              <Button type="primary" htmlType="submit">Lưu</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceManagementPage;