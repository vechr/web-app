import { BaseCoreEntity } from '@/core/base/domain/entities';
import {
  TFieldCheckBox,
  TFieldInputPassword,
  TFieldInputUsername,
} from '@/core/base/domain/entities/protocol';
import { User } from '@/modules/users/user.entity';

export class Session extends BaseCoreEntity {
  userId: string;
  token: string;
  refresh: string;
  data: Record<string, any>;
  expiredAt: Date;
}

export enum EErrorJwtCode {
  TOKEN_EXPIRED = 'T401',
  TOKEN_INVALID = 'T402',
  TOKEN_REQUIRED = 'T403',
}

export type TCreateSessionRequestBody = Pick<User, 'password'> & {
  username: string;
};

export type TSessionForm = {
  username: TFieldInputUsername;
  password: TFieldInputPassword;
  checkbox: TFieldCheckBox;
};
