import { lazy } from 'react';
import { BookFilled, HomeFilled } from '@ant-design/icons';

import Layout from '@/layouts/Layout';
import type { MenuRecordRaw } from '../types';

export const basicRouter: MenuRecordRaw[] = [
  {
    Component: Layout,
    children: [
      {
        index: true,
        path: '/home',
        name: '首页',
        Component: lazy(() => import('@/views/Home/Home.tsx')),
        icon: <HomeFilled />,
        order: 1,
      },
      {
        path: '/about',
        name: '关于我们',
        Component: lazy(() => import('@/views/About.tsx')),
        icon: <BookFilled />,
        order: 10,
      },
      {
        path: '/disablePage',
        disabled: true,
        name: '禁用菜单',
        Component: lazy(() => import('@/views/About.tsx')),
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
            Component: lazy(() => import('@/views/UserManager/List.tsx')),
            icon: <BookFilled />,
          },
          {
            path: 'details',
            name: '用户详情',
            Component: lazy(() => import('@/views/UserManager/Details.tsx')),
            icon: <BookFilled />,
          },
        ],
      },
      {
        path: '/basicTable',
        name: '测试 table',
        Component: lazy(() => import('@/views/TestTable.tsx')),
        icon: <BookFilled />,
      },
    ],
  },
];
