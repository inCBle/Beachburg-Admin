import Layout from '@/components/Layout';
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

const Home = lazy(() => import('@/views/Home/Home'));
const About = lazy(() => import('@/views/About.tsx'));

const router = createBrowserRouter([
  { path: '*', element: <Navigate to="/" replace /> },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
]);

export default router;
