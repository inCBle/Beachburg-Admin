export enum HttpStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export enum ResponseMessage {
  SUCCESS = '请求成功',
  FAIL = '请求失败',
  NOT_FOUND = '未找到该资源',
  UNAUTHORIZED = '未授权',
  FORBIDDEN = '无权限',
  METHOD_NOT_ALLOWED = '方法不允许',
  BAD_REQUEST = '请求参数错误',
  NOT_IMPLEMENTED = '方法未实现',
  BAD_GATEWAY = '网关错误',
  SERVICE_UNAVAILABLE = '服务不可用',
  GATEWAY_TIMEOUT = '网关超时',
  INTERNAL_SERVER_ERROR = '服务器错误',
}

export type HttpResponse<T = any> = {
  code: HttpStatus;
  message: ResponseMessage;
  data: T;
};
