import Mock from 'mockjs';
import { createMock } from './core';

export interface UserInfoData {
  username: string;
  password: string;
  token: number;
}

const userInfo: UserInfoData = {
  username: 'admin',
  password: '123456',
  token: Mock.Random.natural(),
};

export function setupUserMock() {
  createMock('/login', 'post', userInfo);
}
