export type THttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch';

export enum EHttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
  unProcessableEntity = 422,
  conflict = 409,
}

export type THttpRequest = {
  url: string;
  params?: Record<string, any>;
  method: THttpMethod;
  data?: any;
  headers?: any;
  baseURL?: string;
};

export type TResponseData<T = any, E = any> = {
  success?: boolean;
  meta?: Record<string, any>;
  message: string;
  result?: T;
  error?: E;
};

export type THttpResponse = {
  status: EHttpStatusCode;
  data?: TResponseData;
};

export interface IHttpClient {
  request(httpRequest: THttpRequest): Promise<THttpResponse>;
}
