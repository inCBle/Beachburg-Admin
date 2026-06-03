import { Button, Input, Select, Table, Card, Typography, Space } from 'antd';
import { useState } from 'react';
import styles from './index.module.scss';

const { Title } = Typography;

function Attendance() {
  const [name, setName] = useState('');
  const [game, setGame] = useState('');
  const [attendanceList, setAttendanceList] = useState([
    { key: '1', name: '张三', game: 'LOL', time: '2026-04-15 09:30' },
    { key: '2', name: '李四', game: 'PUBG', time: '2026-04-15 10:15' },
    { key: '3', name: '王五', game: 'LOL', time: '2026-04-15 11:00' },
  ]);

  const games = [
    { value: 'LOL', label: '英雄联盟' },
    { value: 'PUBG', label: '绝地求生' },
    { value: 'VALORANT', label: '无畏契约' },
    { value: 'CSGO', label: '反恐精英' },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '游戏',
      dataIndex: 'game',
      key: 'game',
    },
    {
      title: '上线时间',
      dataIndex: 'time',
      key: 'time',
    },
  ];

  const handleCheckIn = () => {
    if (name && game) {
      const newRecord = {
        key: String(attendanceList.length + 1),
        name,
        game,
        time: new Date().toLocaleString('zh-CN'),
      };
      setAttendanceList([...attendanceList, newRecord]);
      setName('');
      setGame('');
    }
  };

  return (
    <div className={styles['attendance-container']}>
      <Card title={<Title level={2}>游戏上线考勤系统</Title>} className={styles['main-card']}>
        <div className={styles['checkin-section']}>
          <Title level={4}>上线登记</Title>
          <Space size="middle" style={{ marginBottom: 20 }}>
            <Input placeholder="请输入姓名" value={name} onChange={(e) => setName(e.target.value)} style={{ width: 200 }} />
            <Select placeholder="选择游戏" value={game} onChange={setGame} options={games} style={{ width: 200 }} />
            <Button type="primary" onClick={handleCheckIn}>
              上线
            </Button>
          </Space>
        </div>

        <div className={styles['attendance-section']}>
          <Title level={4}>今日上线记录</Title>
          <Table columns={columns} dataSource={attendanceList} />
        </div>
      </Card>
    </div>
  );
}

export default Attendance;
