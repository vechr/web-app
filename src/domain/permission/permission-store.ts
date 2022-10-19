import { IBaseResponse, Permission } from '@/domain';

export interface IPermissionData extends IBaseResponse {
  data: Partial<Permission>[];
  dataDetails?: Partial<Permission>;
  optionPermissions: { value: string; label: string }[];
}
