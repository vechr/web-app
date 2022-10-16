import { IBaseResponse, TUser, TUserFullInformation } from '@/domain';

export interface IUserData extends IBaseResponse {
  data: Partial<TUser>[];
  dataDetails?: TUserFullInformation;
}
