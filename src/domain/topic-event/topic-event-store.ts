import { IError, ITopicEvent } from '@/domain';

export interface ITopicEventData {
  message: string;
  data: ITopicEvent[];
  dataDetails: ITopicEvent;
  topicEventEdit: {
    id: string;
    name: string;
    description: string;
    eventExpression: object;
  };
  error: IError;
}