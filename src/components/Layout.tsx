import React, { Suspense, useState } from 'react';
import { Layout, theme } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import logo from '@/assets/react.svg';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical">
          <img src={logo} alt="logo" />
        </div>
        <nav className="flex flex-col justify-center">
          <NavLink to={'/'} end>
            Home
          </NavLink>
          <NavLink to={'/about'}>About</NavLink>
        </nav>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>头部</Header>
        <Content style={{ margin: '16px' }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
