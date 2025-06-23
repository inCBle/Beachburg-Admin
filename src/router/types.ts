import type { ReactNode } from 'react';
import type { RouteObject } from 'react-router-dom';

export type MenuRecordRaw = RouteObject & {
  /**
   * 子菜单
   */
  children?: MenuRecordRaw[];
  /**
   * 图标名
   */
  icon?: ReactNode | string;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 菜单名
   */
  name?: string;
  /**
   * 排序号
   */
  order?: number;
  /**
   * 父级路径
   */
  parentPath?: string;
  /**
   * 所有父级路径
   */
  parentPaths?: string[];
  /**
   * 是否显示菜单
   * @default true
   */
  show?: boolean;
};
