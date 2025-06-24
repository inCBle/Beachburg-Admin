// table右侧按钮组件
import React, { useState } from 'react';
import { SettingOutlined, ReloadOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';

interface ButtonConfigProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isVisible: boolean;
}

interface RightToolbarProps {
  initialButtonVisibility?: {
    columnConfig: boolean; // 列配置
    refresh: boolean; // 刷新
    hideSearch: boolean; // 显示隐藏搜索
  };
  onColumnConfigClick?: () => void;
  onRefreshClick?: () => void;
  onEyeToggle?: (isOpen: boolean) => void;
}

const ButtonConfig: React.FC<ButtonConfigProps> = ({ icon, label, onClick, isVisible }) => {
  if (!isVisible) return null;

  return (
    <Tooltip title={label}>
      <Button shape="circle" icon={icon} onClick={onClick} />
    </Tooltip>
  );
};

// 定义默认的按钮可见性配置
const defaultButtonVisibility = {
  columnConfig: true,
  refresh: true,
  hideSearch: true,
};

const RightToolbar: React.FC<RightToolbarProps> = ({
  initialButtonVisibility = defaultButtonVisibility,
  onColumnConfigClick, // 列配置点击事件回调
  onRefreshClick, // 刷新点击事件回调
  onEyeToggle, // 显示/隐藏搜索点击事件回调
}) => {
  const [buttonVisibility] = useState({
    columnConfig: initialButtonVisibility.columnConfig,
    refresh: initialButtonVisibility.refresh,
    hideSearch: initialButtonVisibility.hideSearch,
  });

  const [openEye, setOpenEye] = useState(true);

  return (
    <Flex gap="small">
      <ButtonConfig
        isVisible={buttonVisibility.columnConfig}
        icon={<SettingOutlined />}
        label="列配置"
        onClick={() => {
          if (onColumnConfigClick) {
            onColumnConfigClick(); // 将点击事件传递给父组件
          }
        }}
      />

      <ButtonConfig
        isVisible={buttonVisibility.refresh}
        icon={<ReloadOutlined />}
        label="刷新"
        onClick={() => {
          if (onRefreshClick) {
            onRefreshClick(); // 将点击事件传递给父组件
          }
        }}
      />

      <ButtonConfig
        isVisible={buttonVisibility.hideSearch}
        icon={openEye ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        label={openEye ? '隐藏搜索' : '显示搜索'}
        onClick={() => {
          const newOpenEye = !openEye;
          setOpenEye(!newOpenEye);
          if (onEyeToggle) {
            onEyeToggle(newOpenEye); // 将点击事件传递给父组件
          }
        }}
      />
    </Flex>
  );
};

export default RightToolbar;
