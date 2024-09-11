import Container, { Service } from 'typedi';
import { Site } from './site.entity';
import { BaseUsecase } from '@/core/base/domain/usecase/base.usecase';
import { AxiosHttpClient } from '@/core/base/frameworks/drivers';

@Service()
export class SiteUsecase extends BaseUsecase<Site> {
  constructor() {
    super(Site, '/api/auth/v1/site', Container.get(AxiosHttpClient<Site>));
  }
}
