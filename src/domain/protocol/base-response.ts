import { IError } from '@/domain';

interface IListMetaResponse {
  count: number;
  total: number;
  limit: number;
  page: number;
}

export interface IBaseResponse {
  success?: boolean;
  message: string;
  error: IError;
  meta?: Record<string, any> | IListMetaResponse;
}
