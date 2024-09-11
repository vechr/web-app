import Container, { Service } from 'typedi';
import { NotificationEmail } from './notification-email.entity';
import { BaseUsecase } from '@/core/base/domain/usecase/base.usecase';
import { AxiosHttpClient } from '@/core/base/frameworks/drivers';

@Service()
export class NotificationEmailUsecase extends BaseUsecase<NotificationEmail> {
  constructor() {
    super(
      NotificationEmail,
      '/api/things/v1/notification-email',
      Container.get(AxiosHttpClient<NotificationEmail>),
    );
  }
}
