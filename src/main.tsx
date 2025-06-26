import 'normalize.css';
import '@/assets/styles/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import { setupMock } from '@/mocks';

setupMock();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
