import Container, { Service } from 'typedi';
import { Widget } from './widget.entity';
import { BaseUsecase } from '@/core/base/domain/usecase/base.usecase';
import { AxiosHttpClient } from '@/core/base/frameworks/drivers';

@Service()
export class WidgetUsecase extends BaseUsecase<Widget> {
  constructor() {
    super(
      Widget,
      '/api/things/v1/widget',
      Container.get(AxiosHttpClient<Widget>),
    );
  }

  async getAllWidgetByDashboardId(dashboardId: string): Promise<Widget[]> {
    const result = await this.http.request({
      method: 'get',
      url: `${this._baseUrl}/dashboard/${dashboardId}`,
    });
    return result.data?.result;
  }
}
