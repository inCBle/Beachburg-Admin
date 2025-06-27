import React, { Suspense, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, theme, type MenuProps } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import logo from '@/assets/react.svg';
import { basicRouter } from '@/router/basicRouter';
import type { MenuRecordRaw } from '@/router/types';

const { Header, Sider, Content } = Layout;

const sortByMenus = (routes: MenuRecordRaw[] = []) => routes.sort((a, b) => (a?.order ?? 999) - (b?.order ?? 999));

const getPath = (path: string | undefined) => {
  if (!path) return '';

  path = path.replace(/\/:[\w-]+/g, '');
  path = path.startsWith('/') ? path : '/' + path;
  path = path.endsWith('/') ? path.slice(0, -1) : path;

  return path;
};

const getMenuItem = (routes: MenuRecordRaw[] = [], parentPath: string = ''): MenuProps['items'] => {
  if (!routes.length) return [];
  routes = routes.filter((item) => item.show !== false);
  routes = sortByMenus(routes);

  const menus: MenuProps['items'] = [];
  for (const item of routes) {
    let path: string = parentPath;
    let children: MenuProps['items'];
    path += getPath(item.path);

    if (item.children) {
      children = getMenuItem(item.children, path);
    }
    if (!path) {
      menus.push(...(children ?? []));
      continue;
    }

    menus.push({
      key: path,
      icon: item.icon,
      disabled: item.disabled,
      title: item.name,
      label: <NavLink to={path}>{item.name}</NavLink>,
      children,
    });
  }

  return menus;
};

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const username = 'admin';
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = getMenuItem(basicRouter);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <NavLink className="flex items-center justify-center my-2" to="/home">
          <img className="w-[40px] h-[40px]" src={logo} alt="logo" />
          {!collapsed && <span className="text-xl font-bold text-white ml-1">比奇堡考勤系统</span>}
        </NavLink>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['/home']} items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <section className="flex items-center justify-between">
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
            <section>
              <Avatar className="!bg-[#87d068] !mr-4 cursor-pointer">{username}</Avatar>
            </section>
          </section>
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
