import {
  IListCursorRequest,
  IListRequestQuery,
  TBy,
  TMetaCursorResponse,
} from '@/core/base/domain/entities/protocol';
import { AxiosHttpClient } from '@/core/base/frameworks/drivers';

export class ListCursorHelper {
  public static async listCursor<T>(
    url: string,
    params: IListRequestQuery<IListCursorRequest>,
    http: AxiosHttpClient<T>,
  ): Promise<{ meta: TMetaCursorResponse; data: T[] }> {
    const result = await http.request({
      method: 'get',
      url: url,
      params: params,
    });
    const meta = result.data?.meta as TMetaCursorResponse;

    return {
      data: result.data?.result as T[],
      meta: {
        lastCursor: meta.lastCursor ?? '',
        total: meta.total ?? 0,
      },
    };
  }

  public static async listCursorContinue<T>(
    url: string,
    total: number,
    currentData: T[],
    params: IListRequestQuery<IListCursorRequest, TBy, any>,
    http: AxiosHttpClient<T>,
  ): Promise<{ meta: TMetaCursorResponse; data: T[] }> {
    if (currentData.length >= total) {
      return {
        data: currentData,
        meta: {
          lastCursor: params.filters.pagination.cursor,
          total,
        },
      };
    }
    const { data, meta } = await ListCursorHelper.listCursor<T>(
      url,
      params,
      http,
    );

    // This will always increment the data
    currentData = [...currentData, ...data];

    return {
      data: currentData,
      meta,
    };
  }
}
