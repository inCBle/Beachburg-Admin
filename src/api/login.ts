export interface UserInfo {
  username: string;
  password: string;
}

export interface ResponseData<T> {
  code: number;
  data?: T | null;
  message?: string;
}

export const getUserInfo = (data: UserInfo): Promise<ResponseData<UserInfo>> => {
  console.log('请求参数：', data);
  return new Promise((resolve) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve({
          code: 500,
          message: '用户名或密码错误',
        });
      } else {
        resolve({
          code: 200,
          data: {
            username: 'admin',
            password: '123456',
          },
        });
      }
    }, 1000);
  });
};
