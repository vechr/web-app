import { IBaseResponse, Permission } from '@/domain';
import { TPermission } from '@/utils/ability';

export interface IPermissionData extends IBaseResponse {
  data: Partial<Permission>[];
  dataDetails?: Partial<Permission>;
  optionPermissions: { value: string; label: string }[];
  transferSourceData: {
    key: string;
    title: string;
    description: string;
    disabled: boolean;
  }[];
  permissionSourceList: TPermission;
}
