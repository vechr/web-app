import { IBaseResponse, ISession } from '@/domain';

export interface ISessionData extends IBaseResponse {
  data: ISession[];
}
