import React, { Suspense, useState } from 'react';
import { BookFilled, HomeFilled, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme, type MenuProps } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import logo from '@/assets/react.svg';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items: MenuProps['items'] = [
    {
      key: '/home',
      icon: <HomeFilled />,
      label: <NavLink to={'/home'}>首页</NavLink>,
    },
    {
      key: '/About',
      icon: <BookFilled />,
      label: <NavLink to={'/about'}>关于我们</NavLink>,
    },
    {
      key: '/Text',
      icon: <BookFilled />,
      label: <NavLink to={'/test'}>测试table</NavLink>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <NavLink className="flex items-center justify-center my-2" to="/home">
          <img className="w-[50px] h-[50px]" src={logo} alt="logo" />
        </NavLink>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['/home']} items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
