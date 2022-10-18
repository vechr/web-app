import { IBaseResponse, TUser, TUserFullInformation } from '@/domain';

export interface IUserData extends IBaseResponse {
  data: Partial<TUser>[];
  userUpdate: IUpdateUser;
  dataDetails?: TUserFullInformation;
}

export interface ICreateUser {
  fullName: string;
  emailAddress: string;
  phoneNumber?: string;
  description?: string;
  username: string;
  password: string;
  confirmPassword: string;
  roles: string[];
}

export interface IUpdateUser {
  fullName?: string;
  emailAddress?: string;
  phoneNumber?: string;
  description?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  roles: string[];
  siteId: string;
}
