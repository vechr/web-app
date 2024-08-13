import { TBaseResponse } from '.';

export type THttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch';

export enum EHttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZE = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
  UNPROCESSABLE_ENTITY = 422,
  CONFLICT = 409,
}

export type THttpRequest = {
  url: string;
  params?: Record<string, any>;
  method: THttpMethod;
  data?: any;
  headers?: any;
  baseURL?: string;
};

export interface TResponseData<T = any> extends TBaseResponse {
  result?: T;
}

export type THttpResponse<T = any> = {
  status: EHttpStatusCode;
  data?: TResponseData<T>;
};

export interface IHttpClient<T = any> {
  request(httpRequest: THttpRequest): Promise<THttpResponse<T>>;
}
