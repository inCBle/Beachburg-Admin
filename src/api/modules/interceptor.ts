import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export interface RequestInterceptorConfig {
  fulfilled?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>;
  rejected?: (error: any) => any;
}

export interface ResponseInterceptorConfig<T = any> {
  fulfilled?: (response: AxiosResponse<T>) => Promise<AxiosResponse<T>> | AxiosResponse<T>;
  rejected?: (error: any) => any;
}

const defaultRequestInterceptorConfig: RequestInterceptorConfig = {
  fulfilled: (config) => config,
  // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
  rejected: (error) => Promise.reject(error),
};

const defaultResponseInterceptorConfig: ResponseInterceptorConfig = {
  fulfilled: (response: AxiosResponse) => response,
  // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
  rejected: (error) => Promise.reject(error),
};

class InterceptorManager {
  private readonly axiosInstance: AxiosInstance;
  constructor(instance: AxiosInstance) {
    this.axiosInstance = instance;
  }

  addRequestInterceptor({ fulfilled, rejected }: RequestInterceptorConfig = defaultRequestInterceptorConfig) {
    this.axiosInstance.interceptors.request.use(fulfilled, rejected);
  }

  addResponseInterceptor<T = any>({ fulfilled, rejected }: ResponseInterceptorConfig<T> = defaultResponseInterceptorConfig) {
    this.axiosInstance.interceptors.response.use(fulfilled, rejected);
  }
}

export { InterceptorManager };
