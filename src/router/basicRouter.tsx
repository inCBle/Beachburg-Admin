import Layout from '@/layouts/Layout';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const Home = lazy(() => import('@/views/Home/Home'));
const About = lazy(() => import('@/views/About.tsx'));

export const basicRouter: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        path: '/home',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
];
