import { lazy } from 'react';
import { BookFilled, HomeFilled } from '@ant-design/icons';

import Layout from '@/layouts/Layout';
import type { MenuRecordRaw } from './types';

const Home = lazy(() => import('@/views/Home/Home'));
const About = lazy(() => import('@/views/About.tsx'));
const TestTable = lazy(() => import('@/views/TestTable.tsx'));

export const basicRouter: MenuRecordRaw[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
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
        path: '/hidePage',
        name: '隐藏菜单',
        show: false,
        element: <Home />,
        icon: <BookFilled />,
        order: 7,
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
