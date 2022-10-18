import { IBaseResponse, Role } from '@/domain';

export interface IRoleData extends IBaseResponse {
  data: Partial<Role>[];
  optionRoles: { value: string; label: string }[];
  dataDetails?: Role;
}
