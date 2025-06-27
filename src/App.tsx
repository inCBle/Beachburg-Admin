import { App as AntdApp } from 'antd';
import { RouterProvider } from 'react-router-dom';
import StaticMessage from './utils/message';
import router from './router/index';
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <AntdApp>
        <StaticMessage />
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
