import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios';
import axios from 'axios';
import { merge } from 'lodash-es';
import { message } from '@/utils/message';
import { InterceptorManager } from './modules/interceptor';
import { errorMessageInterceptor } from './modules/responseInterceptor/errorMessageInterceptor';
import type { HttpResponse } from '@/types/api';

class RequestClient {
  public addRequestInterceptor: InterceptorManager['addRequestInterceptor'];
  public addResponseInterceptor: InterceptorManager['addResponseInterceptor'];

  private readonly instance: AxiosInstance;
  constructor(options: CreateAxiosDefaults = {}) {
    const defaultConfig: CreateAxiosDefaults = {
      baseURL: import.meta.env.VITE_GLOB_API_URL,
      timeout: 10_000,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    };

    const requestConfig = merge(defaultConfig, options);

    this.instance = axios.create(requestConfig);

    const interceptorManager = new InterceptorManager(this.instance);

    this.addRequestInterceptor = interceptorManager.addRequestInterceptor.bind(interceptorManager);
    this.addResponseInterceptor = interceptorManager.addResponseInterceptor.bind(interceptorManager);
  }

  public get<T = any>(url: string, config: AxiosRequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...config, data, method: 'POST' });
  }

  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...config, data, method: 'PUT' });
  }

  public delete<T = any>(url: string, config: AxiosRequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  }

  public async request<T>(url: string, config: AxiosRequestConfig): Promise<HttpResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance<T>({ url, ...config });
      return response.data as HttpResponse<T>;
    } catch (error: any) {
      throw error.response ? error.response.data : error;
    }
  }
}

const request = new RequestClient();

// 添加请求拦截器
request.addRequestInterceptor({ fulfilled: (config) => config });

// 处理返回的响应数据格式
request.addResponseInterceptor({
  fulfilled: (response) => {
    return response;
  },
});

// 处理错误拦截器
request.addResponseInterceptor(
  errorMessageInterceptor((msg: string, error) => {
    // 这里可以根据业务进行定制,你可以拿到 error 内的信息进行定制化处理，根据不同的 code 做不同的提示，而不是直接使用 message.error 提示 msg
    // 当前mock接口返回的错误字段是 error 或者 message
    const responseData = error?.response?.data ?? {};
    const errorMessage = responseData?.error ?? responseData?.message ?? '';

    // 如果没有错误信息，则会根据状态码进行提示
    message.error((errorMessage as string) || msg);
  })
);

export { request };
