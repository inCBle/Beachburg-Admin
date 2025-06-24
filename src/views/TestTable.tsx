// 用于测试table组件
import React, { useState } from 'react';
import BTable from '@/components/BTable';

interface DataItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

const Test: React.FC = () => {
  // 数据
  const [dataSource] = useState<DataItem[]>(() => {
    return Array.from({ length: 20 }, (_, index) => ({
      key: (index + 1).toString(),
      name: `User ${index + 1}`,
      age: 30 + (index % 10), // 年龄在30到39之间循环变化
      address: `Address ${index + 1}`,
    }));
  });

  const handleRowClick = (record: DataItem) => {
    console.log('Row clicked:', record);
  };

  // 定义的列头
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
  ];

  return (
    <div>
      <BTable<DataItem>
        loading={false}
        dataSource={dataSource}
        columns={columns}
        pagination={{
          current: 1,
          pageSize: 10,
          total: dataSource.length,
        }}
        onRowClick={handleRowClick}
      >
        {/* 在这里提供自定义的插槽内容 */}
        <div>自定义左侧内容</div>
      </BTable>
    </div>
  );
};

export default Test;
