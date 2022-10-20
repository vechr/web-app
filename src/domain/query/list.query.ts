import { SelectProps } from 'ant-design-vue';
import { ref } from 'vue';

export enum ESortMode {
  ASC = 'asc',
  DESC = 'desc',
}

export interface ICommonFiled<Q> {
  name: Q;
}

export interface IUsernameFiled<Q> {
  username: Q;
}

export interface IModeQuery {
  createdAt: Date;
  updatedAt: Date;
}

export interface IOperatorQuery {
  equals?: any;

  in?: any;

  notIn?: any;

  lt?: any;

  lte?: any;

  gt?: any;

  gte?: any;

  contains?: any;

  startsWith?: any;

  endsWith?: any;
}

export type TQueryParamsFieldName = IListRequestQuery<
  IModeQuery,
  ICommonFiled<IOperatorQuery>
>;

export type TQueryParamsFieldUsername = IListRequestQuery<
  IModeQuery,
  IUsernameFiled<IOperatorQuery>
>;
export interface IListRequestQuery<E = any, F = any> {
  filters: {
    pagination: {
      page: number;
      limit: number;
    };
    sort: {
      by: keyof E;
      mode: ESortMode;
    };
    field: F;
  };
}

export const sortMode = ref<SelectProps['options']>([
  {
    value: ESortMode.ASC,
    label: 'Ascending',
  },
  {
    value: ESortMode.DESC,
    label: 'Descending',
  },
]);

export const pageSizeOptions: string[] = [
  '10',
  '25',
  '50',
  '75',
  '100',
  '125',
  '150',
  '170',
  '200',
];
