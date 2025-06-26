import { App as AntdApp } from 'antd';
import { RouterProvider } from 'react-router-dom';
import router from './router/index';
import StaticMessage from './utils/message';

function App() {
  return (
    <AntdApp>
      <StaticMessage />
      <RouterProvider router={router} />
    </AntdApp>
  );
}

export default App;
