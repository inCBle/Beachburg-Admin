import type { HttpResponse } from '@/types/api';
import { request } from './request';
import type { UserInfoData } from '@/mocks/user';

interface LoginRequest {
  username: string;
  password: string;
}

export const getUserInfo = (data: LoginRequest): Promise<HttpResponse<UserInfoData>> => {
  console.log('请求参数：', data);
  return request.post('/login', data);
};
