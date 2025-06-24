import React, { useState, useEffect } from 'react';
import { Table as AntTable, type TableProps as AntTableProps, Flex } from 'antd';
import type { TableColumnsType, TablePaginationConfig } from 'antd';
import RightToolbar from './components/RightToolbar';
interface BTableProps<T extends object = object> extends Omit<AntTableProps<T>, 'columns' | 'dataSource' | 'pagination' | 'loading'> {
  // 自定义加载状态
  loading?: boolean;
  // 自定义数据源
  dataSource?: T[];
  // 自定义列定义
  columns?: TableColumnsType<T>;
  // 自定义分页配置
  pagination?: TablePaginationConfig;
  // 自定义表格项点击事件
  onRowClick?: (record: T) => void;
}

// 定义默认分页配置
const defaultPagination: TablePaginationConfig = {
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
};

// 定义默认数据源和列
const defaultDataSource: any[] = [];
const defaultColumns: TableColumnsType<any> = [];

const BTable = <T extends object = object>({
  loading = false,
  dataSource = defaultDataSource,
  columns = defaultColumns,
  pagination = defaultPagination,
  onRowClick,
  children,
  ...restProps
}: BTableProps<T>): React.ReactElement => {
  const [tableLoading, setTableLoading] = useState<boolean>(loading);
  const [tableDataSource, setTableDataSource] = useState<T[]>(dataSource);
  const [tablePagination, setTablePagination] = useState<TablePaginationConfig>(pagination);

  // 更新加载状态
  useEffect(() => {
    setTableLoading(loading);
  }, [loading]);

  // 更新数据源
  useEffect(() => {
    setTableDataSource(dataSource);
  }, [dataSource]);

  // 更新分页配置
  useEffect(() => {
    setTablePagination(pagination);
  }, [pagination]);

  // 处理表格项点击事件
  const handleRowClick = (record: T) => {
    if (onRowClick) {
      onRowClick(record);
    }
  };

  const handlePageChange = (page: number, pageSize: number) => {
    const newPagination = {
      ...tablePagination,
      current: page,
      pageSize,
    };
    setTablePagination(newPagination);
    // 在实际应用中，这里应该触发数据加载逻辑，比如从服务器获取对应页面的数据
    // 示例中，我们只是简单地模拟数据加载
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const newData = tableDataSource.slice(start, end);
    setTableDataSource(newData);
  };

  const handleShowSizeChange = (current: number, pageSize: number) => {
    handlePageChange(current, pageSize);
  };

  // 搜索展开隐藏事件
  const handleEyeToggle = (isOpen: boolean) => {
    console.log('接收到事件', isOpen);
  };

  // 列配置点击事件
  const handleColumnConfig = () => {
    console.log('列配置点击事件');
  };

  // 刷新按钮点击事件
  const handleRefresh = () => {
    console.log('刷新按钮点击事件');
  };

  return (
    <>
      {/* 头部操作按钮 */}
      <Flex justify="space-between" align="align" style={{ marginBottom: 20 }}>
        <div>{children}</div>
        <div>
          <RightToolbar onEyeToggle={handleEyeToggle} onColumnConfigClick={handleColumnConfig} onRefreshClick={handleRefresh} />
        </div>
      </Flex>

      {/* 表格组件 */}
      <AntTable<T>
        loading={tableLoading}
        dataSource={tableDataSource}
        columns={columns}
        pagination={{
          ...tablePagination,
          onChange: handlePageChange,
          onShowSizeChange: handleShowSizeChange,
        }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        {...restProps}
      />
    </>
  );
};

export default BTable;
