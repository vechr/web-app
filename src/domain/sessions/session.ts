export interface ISession {
  id: string;
  token: string;
  refresh: string;
  expiredAt: Date;
}

export enum EErrorJwtCode {
  TOKEN_EXPIRED = 'T401',
  TOKEN_INVALID = 'T402',
  TOKEN_REQUIRED = 'T403',
}

export enum ESessionErrorCode {
  USER_NOT_FOUND = 'R404',
  WRONG_PASSWORD = 'R401',
  INVALID_REFRESH_TOKEN = 'R402',
  REFRESH_TOKEN_EXPIRED = 'R403',
  REFRESH_TOKEN_NOT_FOUND = 'R405',
}
