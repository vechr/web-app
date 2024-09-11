import Container, { Service } from 'typedi';
import { User } from './user.entity';
import { BaseUsecase } from '@/core/base/domain/usecase/base.usecase';
import { AxiosHttpClient } from '@/core/base/frameworks/drivers';

@Service()
export class UserUsecase extends BaseUsecase<User> {
  constructor() {
    super(User, '/api/auth/v1/user', Container.get(AxiosHttpClient<User>));
  }
}
