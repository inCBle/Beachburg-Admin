import React from 'react';
import { Button, Result } from 'antd';

const Offline: React.FC = () => (
  <Result
    status="error"
    title="Submission Failed"
    subTitle="Please check and modify the following information before resubmitting."
    extra={[
      <Button type="primary" key="restart" onClick={() => window.location.reload()}>
        重新加载
      </Button>,
    ]}
  ></Result>
);

export default Offline;
