import {
  IBaseResponse,
  IUpdateUser,
  TUser,
  TUserFullInformation,
} from '@/domain';

export interface IUserData extends IBaseResponse {
  data: Partial<TUser>[];
  userUpdate: IUpdateUser;
  dataDetails?: TUserFullInformation;
}
