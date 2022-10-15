import { IBaseResponse, ISession, TUserCustomInformation } from '@/domain';

export interface ISessionData extends IBaseResponse {
  data: ISession[];
  mySession?: TUserCustomInformation;
}
