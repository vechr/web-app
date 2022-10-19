import { IBaseResponse, Role, TRoleDetail } from '@/domain';

export interface IRoleData extends IBaseResponse {
  data: Partial<Role>[];
  optionRoles: { value: string; label: string }[];
  updateRole: IUpdateRole;
  dataDetails?: TRoleDetail;
}

export interface ICreateRole {
  name: string;
  description?: string;
  permissions: string[];
}

export interface IUpdateRole {
  name?: string;
  description?: string;
  permissions: string[];
}
