import Container, { Service } from 'typedi';
import { Dashboard } from './dashboard.entity';
import { BaseUsecase } from '@/core/base/domain/usecase/base.usecase';
import { AxiosHttpClient } from '@/core/base/frameworks/drivers';

@Service()
export class DashboardUsecase extends BaseUsecase<Dashboard> {
  constructor() {
    super(
      Dashboard,
      '/api/things/v1/dashboard',
      Container.get(AxiosHttpClient<Dashboard>),
    );
  }

  async getDashboardDetails(): Promise<Dashboard[]> {
    const result = await this.http.request({
      method: 'get',
      url: `${this._baseUrl}/details`,
    });

    return result.data?.result as Dashboard[];
  }
}
