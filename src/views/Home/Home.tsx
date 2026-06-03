import { Card, Typography, Row, Col, Statistic } from 'antd';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import styles from './Home.module.scss';
import TypeScriptPractice from '@/components/TypeScriptPractice';

const { Title } = Typography;

function Home() {
  // 游戏分布数据
  const gameDistributionData = [
    { name: '英雄联盟', value: 45, fill: '#1890ff' },
    { name: '绝地求生', value: 30, fill: '#52c41a' },
    { name: '无畏契约', value: 15, fill: '#fa8c16' },
    { name: '反恐精英', value: 10, fill: '#722ed1' },
  ];

  // 每日上线人数数据
  const dailyAttendanceData = [
    { name: '4月10日', count: 12 },
    { name: '4月11日', count: 15 },
    { name: '4月12日', count: 10 },
    { name: '4月13日', count: 18 },
    { name: '4月14日', count: 20 },
    { name: '4月15日', count: 25 },
  ];

  // 游戏时长数据
  const gameTimeData = [
    { name: '英雄联盟', time: 1200 },
    { name: '绝地求生', time: 900 },
    { name: '无畏契约', time: 600 },
    { name: '反恐精英', time: 300 },
  ];

  // 统计数据
  const totalUsers = 150;
  const todayAttendance = 25;
  const totalGameTime = 3000;
  const activeGames = 4;

  return (
    <div className={styles['home-container']}>
      <Title level={2}>数据统计仪表盘</Title>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="总用户数" value={totalUsers} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="今日上线" value={todayAttendance} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="总游戏时长" value={totalGameTime} suffix="分钟" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="活跃游戏" value={activeGames} />
          </Card>
        </Col>
      </Row>

      {/* 图表区域 */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="游戏分布">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gameDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="每日上线人数">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyAttendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#1890ff" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="游戏时长统计">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gameTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="time" name="游戏时长(分钟)" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* TypeScript 练习组件 */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="TypeScript 练习">
            <TypeScriptPractice title="TypeScript 基础练习" initialCount={0} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
