import React from 'react';
import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

function PracticeAbout() {
  return (
    <Card title="练习关于">
      <Title level={3}>关于页面</Title>
      <Paragraph>
        这是一个关于页面，用于演示 React Router 的基本用法。
      </Paragraph>
      <div style={{ marginTop: '20px' }}>
        <Link to="/practice">返回练习首页</Link>
      </div>
    </Card>
  );
}

export default PracticeAbout;