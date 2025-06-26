import { getUserInfo } from '@/api/login';
import { useCountStore } from '@/store/useCountStore';
import { HttpStatus } from '@/types/api';
import { useRequest } from 'ahooks';
import { Button, message } from 'antd';

function About() {
  const count = useCountStore((state) => state.count);
  const [messageApi, contextHolder] = message.useMessage();

  const { loading, runAsync } = useRequest(() => getUserInfo({ username: 'admin', password: '123456' }), { manual: true });

  async function handleLogin() {
    try {
      const res = await runAsync();
      if (res?.code !== HttpStatus.SUCCESS) {
        messageApi.open({
          type: 'error',
          content: res?.message,
        });
      } else {
        messageApi.open({
          type: 'success',
          content: '登录成功',
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {contextHolder}
      <h1>About</h1>
      <p>{count}</p>

      <Button
        loading={loading}
        onClick={() => {
          handleLogin().catch((error) => console.error(error));
        }}
      >
        登录
      </Button>
    </div>
  );
}

export default About;
