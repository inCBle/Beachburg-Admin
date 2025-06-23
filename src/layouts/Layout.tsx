import React, { Suspense, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme, type MenuProps } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import logo from '@/assets/react.svg';
import { basicRouter } from '@/router/basicRouter';
import type { MenuRecordRaw } from '@/router/types';

const { Header, Sider, Content } = Layout;

const sortByMenus = (routes: MenuRecordRaw[] = []) => routes.sort((a, b) => (a?.order ?? 999) - (b?.order ?? 999));

const getMenuItem = (routes: MenuRecordRaw[] = []): MenuProps['items'] => {
  if (!routes.length) return [];
  routes = routes.filter((item) => item.show !== false);
  routes = sortByMenus(routes);

  const menus: MenuProps['items'] = [];

  for (const item of routes) {
    if (item.path === '/') {
      const children = sortByMenus(item.children);
      return getMenuItem(children);
    }

    menus.push({
      key: item.path!,
      icon: item.icon,
      disabled: item.disabled,
      title: item.name,
      label: <NavLink to={item.path!}>{item.name}</NavLink>,
      children: item.children ? getMenuItem(item.children) : undefined,
    });
  }

  return menus;
};

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = getMenuItem(basicRouter);

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
