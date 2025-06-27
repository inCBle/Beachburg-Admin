import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const InternalError: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    void navigate('/home');
  };

  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" onClick={handleClick}>
          Back Home
        </Button>
      }
    />
  );
};

export default InternalError;
