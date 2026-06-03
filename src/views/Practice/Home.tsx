import React from 'react';
import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

function PracticeHome() {
  return (
    <Card title="练习首页">
      <Title level={3}>React Router 练习</Title>
      <Paragraph>
        这是一个使用 React Router v7 的练习页面。
      </Paragraph>
      <div style={{ marginTop: '20px' }}>
        <Link to="/practice/about">前往关于页面</Link>
        <br />
        <Link to="/practice/users">前往用户列表</Link>
      </div>
    </Card>
  );
}

export default PracticeHome;