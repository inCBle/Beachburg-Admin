import React from 'react';
import { Card, Typography, Descriptions, Button } from 'antd';
import { useParams, useNavigate, Link } from 'react-router-dom';

const { Title } = Typography;

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    address: '123 Main St, City'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '987-654-3210',
    address: '456 Oak Ave, Town'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '555-555-5555',
    address: '789 Pine Rd, Village'
  },
];

function PracticeUserDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = users.find(u => u.id === id);

  if (!user) {
    return (
      <Card title="用户详情">
        <Title level={3}>用户不存在</Title>
        <Button onClick={() => navigate('/practice/users')}>返回用户列表</Button>
      </Card>
    );
  }

  return (
    <Card title="用户详情">
      <Title level={3}>{user.name}</Title>
      <Descriptions bordered>
        <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
        <Descriptions.Item label="Address">{user.address}</Descriptions.Item>
      </Descriptions>
      <div style={{ marginTop: '20px' }}>
        <Button onClick={() => navigate('/practice/users')}>返回用户列表</Button>
        <Link to="/practice" style={{ marginLeft: '10px' }}>返回练习首页</Link>
      </div>
    </Card>
  );
}

export default PracticeUserDetails;
