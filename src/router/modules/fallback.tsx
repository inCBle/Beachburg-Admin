import { lazy } from 'react';
import type { MenuRecordRaw } from '../types';

export const fallbackRouter: MenuRecordRaw[] = [
  {
    path: '/fallback',
    children: [
      {
        path: '403',
        name: 'forbidden',
        Component: lazy(() => import('@/views/_core/Fallback/Forbidden.tsx')),
      },
      {
        path: '404',
        name: '404',
        Component: lazy(() => import('@/views/_core/Fallback/NotFound.tsx')),
      },
      {
        path: '500',
        name: 'internal-error',
        Component: lazy(() => import('@/views/_core/Fallback/InternalError.tsx')),
      },
      {
        name: 'offline',
        path: 'offline',
        Component: lazy(() => import('@/views/_core/Fallback/Offline.tsx')),
      },
    ],
  },
];
