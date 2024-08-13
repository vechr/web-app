import Container, { Service } from 'typedi';
import { TopicEvent } from './topic-event.entity';
import { BaseUsecase } from '@/core/base/domain/usecase/base.usecase';
import { AxiosHttpClient } from '@/core/base/frameworks/drivers';

@Service()
export class TopicEventUsecase extends BaseUsecase<TopicEvent> {
  constructor() {
    super(
      TopicEvent,
      '/api/things/v1/topic-event',
      Container.get(AxiosHttpClient<TopicEvent>),
    );
  }
}
