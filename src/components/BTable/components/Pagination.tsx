import { Pagination as AntPagination } from 'antd';
import { useState } from 'react';

interface PaginationProps {
  initialPagination: {
    total: number; // 总条数
    current?: number; // 当前页码
    pageSize?: number; // 每页显示的记录数
    pageSizeOptions?: string[]; // 每页显示条数的可选值，用于下拉选择
    showSizeChanger?: boolean; // 是否显示每页显示条数的下拉选择，默认显示
  };
  onChange?: (current: number, pageSize: number) => void; // 页码变更时的回调函数
  onShowSizeChange?: (current: number, pageSize: number) => void; // 每页显示条数变更时的回调函数
}

// 定义默认配置
const defaultPagination = {
  total: 0,
  current: 1, // 设置默认当前页为第一页
  pageSize: 10, // 设置默认每页显示 10 条记录
  pageSizeOptions: ['10', '20', '50', '100'], // 设置默认的每页显示条数选项
  showSizeChanger: true, // 默认显示每页显示条数的下拉选择
};

const Pagination: React.FC<PaginationProps> = ({
  initialPagination = defaultPagination,
  onChange, // 接收父组件传递的页码变更回调
  onShowSizeChange, // 接收父组件传递的每页显示条数变更回调
}) => {
  // 当前页和每页显示条数
  const [pagination, setPagination] = useState<{ current: number; pageSize: number }>({
    current: initialPagination.current || defaultPagination.current,
    pageSize: initialPagination.pageSize || defaultPagination.pageSize,
  });

  // 处理页码变更的函数
  const handleChange = (page: number, pageSize: number) => {
    const newPagination = { current: page, pageSize }; // 更新分页状态
    setPagination(newPagination); // 设置新的分页状态
    if (onChange) {
      // 如果父组件传递了 onChange 回调，则调用它，将新的页码和每页条数传递回去
      onChange(page, pageSize);
    }
  };

  // 处理每页显示条数变更的函数
  const handleShowSizeChange = (current: number, pageSize: number) => {
    handleChange(current, pageSize); // 调用页码变更处理函数，更新分页状态和调用 onChange 回调
    if (onShowSizeChange) {
      // 如果父组件传递了 onShowSizeChange 回调，则调用它，将当前页码和新的每页条数传递回去
      onShowSizeChange(current, pageSize);
    }
  };
  return (
    <AntPagination
      {...pagination} // 展开分页状态，将 current 和 pageSize 传递给 Ant Pagination 组件
      total={initialPagination.total} // 传递总记录数
      pageSizeOptions={initialPagination.pageSizeOptions} // 传递每页显示条数选项
      showSizeChanger={initialPagination.showSizeChanger} // 控制是否显示每页显示条数的下拉选择
      onChange={handleChange} // 注册页码变更事件处理函数
      onShowSizeChange={handleShowSizeChange} // 注册每页显示条数变更事件处理函数
    />
  );
};

export default Pagination;
