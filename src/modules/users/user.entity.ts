import {
  TFieldDatePicker,
  TFieldInput,
  TFieldInputPassword,
  TFieldSelect,
  TFieldSelectMultiple,
  TFieldTextArea,
} from '../../core/base/domain/entities/protocol';
import { BaseEntity } from '../../core/base/domain/entities/base.entity';
import { Site } from '../sites/site.entity';
import { Role } from '../roles/role.entity';

export class User extends BaseEntity {
  fullName: string | null;
  email: string | null;
  phoneNumber: string | null;
  password: string;
  roles: UsersRoles[];
  site: Site;
  siteId: string;
}

export type UsersRoles = {
  userId: string;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
};

export type TUserForm = {
  id?: TFieldInput;
  name: TFieldInput;
  description: TFieldTextArea;
  fullName: TFieldInput;
  email: TFieldInput;
  phoneNumber: TFieldInput;
  password: TFieldInputPassword;
  confirmPassword: TFieldInputPassword;
  roles: TFieldSelectMultiple;
  siteId: TFieldSelect;
  createdAt?: TFieldDatePicker;
  updatedAt?: TFieldDatePicker;
};
