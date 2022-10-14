import { IError } from '@/domain';

export interface IBaseResponse {
  success?: boolean;
  message: string;
  error: IError;
  meta?: Record<string, any>;
}
