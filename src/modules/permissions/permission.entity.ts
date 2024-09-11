import { BaseEntity } from '@/core/base/domain/entities';

export class Permission extends BaseEntity {
  alias: string;
}

export type DropdownPermissions = Pick<Permission, 'id' | 'name'>[];
export type AllPermissions = Pick<Permission, 'id' | 'alias'>[];

export type OptionalPermission = Partial<Permission>;
export type RequiredPermission = Required<Permission>;
export type TGetPermissionByIdRequestParams = Pick<Permission, 'id'>;
export type TUpdatePermissionByIdRequestParams = Pick<Permission, 'id'>;
