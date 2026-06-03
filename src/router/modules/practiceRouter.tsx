import { lazy } from 'react';
import { UsersOutlined, HomeOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Layout from '@/layouts/Layout';
import type { MenuRecordRaw } from '../types';

export const practiceRouter: MenuRecordRaw[] = [
  {
    Component: Layout,
    children: [
      {
        index: true,
        path: '/practice',
        name: '练习首页',
        Component: lazy(() => import('@/views/Practice/Home.tsx')),
        icon: <HomeOutlined />,
      },
      {
        path: '/practice/about',
        name: '练习关于',
        Component: lazy(() => import('@/views/Practice/About.tsx')),
        icon: <InfoCircleOutlined />,
      },
      {
        path: '/practice/users',
        name: '用户列表',
        Component: lazy(() => import('@/views/Practice/Users.tsx')),
        icon: <UsersOutlined />,
        children: [
          {
            path: ':id',
            name: '用户详情',
            Component: lazy(() => import('@/views/Practice/UserDetails.tsx')),
          },
        ],
      },
    ],
  },
];