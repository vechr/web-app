import { Permission } from '../permissions/permission.entity';
import {
  TFieldDatePicker,
  TFieldInput,
  TFieldSelectMultiple,
  TFieldTextArea,
} from '@/core/base/domain/entities/protocol';
import { BaseEntity } from '@/core/base/domain/entities';

export class Role extends BaseEntity {
  permissions: RolePermission[];
}

export type RolePermission = {
  roleId: string;
  permissionId: string;
  createdAt: Date;
  updatedAt: Date;
  permission: Permission;
};

export type TRoleForm = {
  id?: TFieldInput;
  name: TFieldInput;
  description: TFieldTextArea;
  permissions: TFieldSelectMultiple;
  createdAt?: TFieldDatePicker;
  updatedAt?: TFieldDatePicker;
};
