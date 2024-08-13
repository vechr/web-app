import { IError } from './error.protocol';

export type TMetaCursorResponse = {
  total: number;
  lastCursor: string;
};

export type TMetaPaginationResponse = {
  count: number;
  total: number;
  page: number;
  totalPage: number;
};

export type TBaseResponse = {
  success?: boolean;
  message: string;
  error?: IError;
  meta?: Record<string, any> | TMetaCursorResponse | TMetaPaginationResponse;
};
