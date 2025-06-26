import Mock, { type Mockjs } from 'mockjs';
import { HttpStatus, ResponseMessage, type HttpResponse } from '@/types/api/service';

const baseURL = import.meta.env.VITE_GLOB_API_URL;

const getSuccessResponse = <T>(data: T): HttpResponse<T> => ({
  code: HttpStatus.SUCCESS,
  message: ResponseMessage.SUCCESS,
  data,
});

const getErrorResponse = <T>(data: T): HttpResponse<T> => ({
  code: HttpStatus.INTERNAL_SERVER_ERROR,
  message: ResponseMessage.INTERNAL_SERVER_ERROR,
  data,
});

const getResponseHandler =
  <T>(data: T) =>
  () => {
    return Math.random() < 0.5 ? getSuccessResponse(data) : getErrorResponse(data);
  };

function createMock<T>(url: string, data: T): Mockjs;
function createMock<T>(url: string, method: string, data: T): Mockjs;
function createMock<T>(url: string, method: string | T, data?: T) {
  if (data === undefined) {
    data = method as T;
    method = 'get';
  }

  return Mock.mock(baseURL + url, method as string, getResponseHandler<T>(data));
}

export { createMock };
