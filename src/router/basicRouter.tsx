import { lazy } from 'react';
import { BookFilled, HomeFilled } from '@ant-design/icons';

import Layout from '@/layouts/Layout';
import type { MenuRecordRaw } from './types';

const NotFound = lazy(() => import('@/views/_core/fallback/NotFound.tsx'));

const Home = lazy(() => import('@/views/Home/Home.tsx'));
const About = lazy(() => import('@/views/About.tsx'));
const TestTable = lazy(() => import('@/views/TestTable.tsx'));
const UserList = lazy(() => import('@/views/UserManager/List.tsx'));
const UserDetails = lazy(() => import('@/views/UserManager/Details.tsx'));

export const basicRouter: MenuRecordRaw[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '*',
        element: <NotFound />,
        show: false,
      },
      {
        index: true,
        path: '/home',
        name: '首页',
        element: <Home />,
        icon: <HomeFilled />,
        order: 1,
      },
      {
        path: '/about',
        name: '关于我们',
        element: <About />,
        icon: <BookFilled />,
        order: 10,
      },
      {
        path: '/disablePage',
        disabled: true,
        name: '禁用菜单',
        element: <About />,
        icon: <BookFilled />,
        order: 9,
      },
      {
        path: '/userManager',
        name: '用户管理',
        children: [
          {
            path: 'list',
            name: '用户列表',
            element: <UserList />,
            icon: <BookFilled />,
          },
          {
            path: 'details',
            name: '用户详情',
            element: <UserDetails />,
            icon: <BookFilled />,
          },
        ],
      },
      {
        path: '/basicTable',
        name: '测试 table',
        element: <TestTable />,
        icon: <BookFilled />,
      },
    ],
  },
];
