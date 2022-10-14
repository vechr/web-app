export interface ISession {
  id: string;
  token: string;
  refresh: string;
  expiredAt: Date;
}
