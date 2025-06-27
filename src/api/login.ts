import { request } from './request';
import type { UserInfoData } from '@/mocks/user';

interface LoginRequest {
  username: string;
  password: string;
}

export const getUserInfo = (data: LoginRequest) => {
  console.log('请求参数：', data);
  return request.post<UserInfoData>('/login', data);
};
