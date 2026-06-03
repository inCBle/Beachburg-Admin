import React from 'react';
import { Card, Typography, List, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
];

function PracticeUsers() {
  const navigate = useNavigate();

  const handleCreateUser = () => {
    // 模拟创建用户
    alert('创建用户功能');
  };

  return (
    <Card title="用户列表">
      <Title level={3}>用户管理</Title>
      <Button type="primary" onClick={handleCreateUser} style={{ marginBottom: '20px' }}>
        创建用户
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={users}
        renderItem={(user) => (
          <List.Item
            actions={[
              <Link to={`/practice/users/${user.id}`} key="view">
                查看详情
              </Link>,
            ]}
          >
            <List.Item.Meta
              title={user.name}
              description={user.email}
            />
          </List.Item>
        )}
      />
      <div style={{ marginTop: '20px' }}>
        <Link to="/practice">返回练习首页</Link>
      </div>
    </Card>
  );
}

export default PracticeUsers;