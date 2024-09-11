import Container, { Service } from 'typedi';
import { AllPermissions, Permission } from './permission.entity';
import { BaseUsecase } from '@/core/base/domain/usecase/base.usecase';
import { AxiosHttpClient } from '@/core/base/frameworks/drivers';
import { TPermissionAbilities } from '@/core/base/frameworks/utils';

@Service()
export class PermissionUsecase extends BaseUsecase<Permission> {
  public permissionAbilities: TPermissionAbilities = [];

  constructor() {
    super(
      Permission,
      '/api/auth/v1/permission',
      Container.get(AxiosHttpClient<Permission>),
    );
  }

  async getAllPermissions(): Promise<void> {
    const result = await this.http.request({
      method: 'get',
      url: `${this._baseUrl}/all`,
    });

    const allPermission = result.data?.result as AllPermissions;

    if (allPermission) {
      this.permissionAbilities = allPermission.map((permission) => ({
        action:
          permission.alias === 'root'
            ? 'manage'
            : permission.alias.split(':')[1].split('@')[0],
        subject:
          permission.alias === 'root' ? 'all' : permission.alias.split(':')[0],
      }));
    }
  }
}
