import Container, { Service } from 'typedi';
import { Topic } from './topic.entity';
import { BaseUsecase } from '@/core/base/domain/usecase/base.usecase';
import { AxiosHttpClient } from '@/core/base/frameworks/drivers';

@Service()
export class TopicUsecase extends BaseUsecase<Topic> {
  constructor() {
    super(Topic, '/api/things/v1/topic', Container.get(AxiosHttpClient<Topic>));
  }

  async getHistoricalData(body: {
    dashboardId: string | string[];
    deviceId: string | string[];
    topicId: string | string[];
    topic: string | string[];
  }) {
    const result = await this.http.request({
      method: 'post',
      url: `${this._baseUrl}/query`,
      data: body,
    });
    return result.data?.result.map((val: { _value: any }, index: number) => ({
      no: index + 1,
      message: val._value,
    }));
  }
}
