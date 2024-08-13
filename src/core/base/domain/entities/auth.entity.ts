import { BaseEntity } from '.';

export class AuthUser extends BaseEntity {
  email: string | null;
  phoneNumber: string | null;
  fullName: string | null;
  password: string;
  siteId: string;
  siteCode: string;
  roles: string[];
  permissions: string[];
}
export type TCompactAuthUser = Omit<
  AuthUser,
  'createdAt' | 'updatedAt' | 'password'
>;
