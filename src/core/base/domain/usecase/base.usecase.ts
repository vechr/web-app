import {
  EHttpStatusCode,
  IListCursorRequest,
  IListPaginationRequest,
  IListRequestQuery,
  TBy,
  TMetaCursorResponse,
  TMetaPaginationResponse,
  TResponseData,
} from '../entities/protocol';
import { DropdownEntity } from '../entities';
import { ListCursorHelper } from './helpers/list-cursor.helper';
import { notificationSuccessOrFail } from '@/core/base/frameworks/utils';
import { AxiosHttpClient } from '@/core/base/frameworks/drivers';

export abstract class BaseUsecase<T extends Record<string, any>> {
  protected _entity: string;
  protected _baseUrl: string;

  constructor(
    entity: new () => T,
    baseUrl: string,
    public readonly http: AxiosHttpClient<T>,
  ) {
    this._entity = entity.name;
    this._baseUrl = baseUrl;
  }

  async listDropdown(
    search?: string,
  ): Promise<DropdownEntity<string, string>[]> {
    const result = await this.http.request({
      method: 'get',
      url: search ? `${this._baseUrl}?search=${search}` : `${this._baseUrl}`,
    });

    return result.data?.result as DropdownEntity<string, string>[];
  }

  public async upsert<B>(
    body?: B,
    takeAllResponse?: boolean,
    title?: string,
  ): Promise<T | TResponseData<T>> {
    const result = await this.http.request({
      method: 'put',
      url: this._baseUrl,
      data: body,
    });

    notificationSuccessOrFail(
      result.status === EHttpStatusCode.OK || result.data?.success === true,
      title,
      result.data?.message ?? '',
    );

    return takeAllResponse ? result.data : (result.data?.result as T);
  }

  public async updateById<B>(
    id: string,
    body?: B,
    takeAllResponse?: boolean,
    title?: string,
  ): Promise<T | TResponseData<T>> {
    // You can do some logic in here!

    const result = await this.http.request({
      method: 'patch',
      url: `${this._baseUrl}/${id}`,
      data: body,
    });

    notificationSuccessOrFail(
      result.status === EHttpStatusCode.OK || result.data?.success === true,
      title,
      result.data?.message ?? '',
    );

    return takeAllResponse ? result.data : (result.data?.result as T);
  }

  public async create<B>(
    body?: B,
    takeAllResponse?: boolean,
    title?: string,
  ): Promise<T | TResponseData<T>> {
    // You can do some logic in here!

    const result = await this.http.request({
      method: 'post',
      url: this._baseUrl,
      data: body,
    });

    notificationSuccessOrFail(
      result.status === EHttpStatusCode.OK || result.data?.success === true,
      title,
      result.data?.message ?? '',
    );

    return takeAllResponse ? result.data : (result.data?.result as T);
  }

  public async delete(
    id: string,
    takeAllResponse?: boolean,
    title?: string,
  ): Promise<T | TResponseData<T>> {
    // You can do some logic in here!

    const result = await this.http.request({
      method: 'delete',
      url: `${this._baseUrl}/${id}`,
    });

    notificationSuccessOrFail(
      result.status === EHttpStatusCode.OK || result.data?.success === true,
      title,
      result.data?.message ?? '',
    );

    return takeAllResponse
      ? (result.data as TResponseData<T>)
      : (result.data?.result as T);
  }

  public async getById(
    id: string,
    takeAllResponse?: boolean,
  ): Promise<T | TResponseData<T>> {
    // You can do some logic in here!

    const result = await this.http.request({
      method: 'get',
      url: `${this._baseUrl}/${id}`,
    });

    return takeAllResponse
      ? (result.data as TResponseData<T>)
      : (result.data?.result as T);
  }

  public async getListCursor(
    isInitial: boolean,
    params: IListRequestQuery<IListCursorRequest, TBy, any>,
    total: number,
    currentData: T[],
  ): Promise<{ meta: TMetaCursorResponse; data: T[] }> {
    // You can do some logic in here!

    const url = `${this._baseUrl}/cursor`;
    if (isInitial) {
      return await ListCursorHelper.listCursor<T>(url, params, this.http);
    } else {
      return await ListCursorHelper.listCursorContinue<T>(
        url,
        total,
        currentData,
        params,
        this.http,
      );
    }
  }

  public async getMany<P extends Record<string, any>>(
    url: string,
    params: P,
    takeAllResponse?: boolean,
  ): Promise<T[] | TResponseData<T[]>> {
    // You can do some logic in here!

    const result = await this.http.request({
      method: 'get',
      url: url,
      params: params,
    });

    return takeAllResponse
      ? (result.data as TResponseData<T[]>)
      : (result.data?.result as T[]);
  }

  public async getListPagination(
    params: IListRequestQuery<IListPaginationRequest, TBy, any>,
  ): Promise<{
    meta: TMetaPaginationResponse;
    data: Pick<T, 'id' | 'name'>[];
  }> {
    // You can do some logic in here!

    const result = await this.http.request({
      method: 'get',
      url: `${this._baseUrl}/pagination`,
      params: params,
    });
    const meta = result.data?.meta as TMetaPaginationResponse;

    return {
      data: result.data?.result as Pick<T, 'id' | 'name'>[],
      meta: {
        count: meta.count ?? 0,
        page: meta.page ?? 0,
        total: meta.total ?? 0,
        totalPage: meta.totalPage ?? 0,
      },
    };
  }
}
