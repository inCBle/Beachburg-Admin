import { Button } from 'antd';
import { useCountStore } from '@/store/useCountStore';

function Home() {
  const count = useCountStore((state) => state.count);
  const dispatch = useCountStore((state) => state.dispatch);

  return (
    <div>
      <h1>首页</h1>
      <Button onClick={() => dispatch({ type: 'decrement', payload: 1 })}>-</Button>
      <p>count: {count}</p>
      <Button onClick={() => dispatch({ type: 'increment', payload: 1 })}>+</Button>
    </div>
  );
}

export default Home;
