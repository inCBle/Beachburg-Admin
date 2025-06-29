import axios from 'axios';
import type { ResponseInterceptorConfig } from '../interceptor';
import { ResponseMessage } from '@/types/api';

const getRejectErrorObject = (error: any): Error => {
  return error instanceof Error ? error : new Error(typeof error === 'object' ? JSON.stringify(error) : String(error));
};

type MakeErrorMessageFn = (message: string, error: any) => void;
export const errorMessageInterceptor = (makeErrorMessage?: MakeErrorMessageFn): ResponseInterceptorConfig => {
  return {
    rejected: (error: any) => {
      if (axios.isCancel(error)) {
        return Promise.reject(getRejectErrorObject(error));
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const err: string = error?.toString?.() ?? '';
      let errMsg = '';
      if (err?.includes('Network Error')) {
        errMsg = '网络故障，请检查网络';
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      } else if (error?.message?.includes?.('timeout')) {
        errMsg = '请求超时，请稍后再试';
      }
      if (errMsg) {
        makeErrorMessage?.(errMsg, error);
        return Promise.reject(getRejectErrorObject(error));
      }

      let errorMessage = '';
      const status = error?.response?.status;

      switch (status) {
        case 400: {
          errorMessage = ResponseMessage.BAD_REQUEST;
          break;
        }
        case 401: {
          errorMessage = ResponseMessage.UNAUTHORIZED;
          break;
        }
        case 403: {
          errorMessage = ResponseMessage.FORBIDDEN;
          break;
        }
        case 404: {
          errorMessage = ResponseMessage.NOT_FOUND;
          break;
        }
        case 408: {
          errorMessage = ResponseMessage.GATEWAY_TIMEOUT;
          break;
        }
        default: {
          errorMessage = ResponseMessage.INTERNAL_SERVER_ERROR;
        }
      }
      makeErrorMessage?.(errorMessage, error);

      return Promise.reject(getRejectErrorObject(error));
    },
  };
};
