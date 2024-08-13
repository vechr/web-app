import Container, { Service } from 'typedi';
import { Role } from './role.entity';
import { BaseUsecase } from '@/core/base/domain/usecase/base.usecase';
import { AxiosHttpClient } from '@/core/base/frameworks/drivers';

@Service()
export class RoleUsecase extends BaseUsecase<Role> {
  constructor() {
    super(Role, '/api/auth/v1/role', Container.get(AxiosHttpClient<Role>));
  }
}
