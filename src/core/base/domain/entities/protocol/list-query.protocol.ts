import { SelectProps } from 'ant-design-vue';
import { ref } from 'vue';

export enum ESortMode {
  ASC = 'asc',
  DESC = 'desc',
}

export type TBy = 'createdAt' | 'updatedAt';

export interface IListRequestQuery<
  P = IListCursorRequest | IListPaginationRequest,
  E = any,
  F = any,
> {
  filters: {
    pagination: P;
    sort: {
      by: keyof E | TBy;
      mode: ESortMode;
    };
    field: F;
  };
}

//#region Cursor
export interface ICursorMeta {
  total: number;
  lastCursor: string;
}

export interface IListCursorResult<T> {
  result: T[];
  meta: ICursorMeta;
}

export interface IListCursorRequest {
  cursor: string;
  limit: number;
}
//#endregion

//#region Pagination
export interface IPaginationMeta {
  count: number;
  total: number;
  page: number;
  totalPage: number;
}

export interface IListPaginationResult<T> {
  result: T[];
  meta: IPaginationMeta;
}

export interface IListPaginationRequest {
  page: number;
  limit: number;
}
//#endregion

export const optionBy = ref<SelectProps['options']>([
  {
    value: 'createdAt',
    label: 'Created At',
  },
  {
    value: 'updatedAt',
    label: 'Updated At',
  },
]);

export const optionMode = ref<SelectProps['options']>([
  {
    value: 'asc',
    label: 'Ascending',
  },
  {
    value: 'desc',
    label: 'Descending',
  },
]);
