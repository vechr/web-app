import { IError, ITopicEvent } from '@/domain';

export interface ITopicEventData {
  message: string;
  data: ITopicEvent[];
  dataDetails: ITopicEvent;
  topicEventEdit: {
    id: string;
    name: string;
    description: string;
    eventExpression: string;
    notificationEmailId: string[];
    bodyEmail?: string;
    htmlBodyEmail?: string;
  };
  error: IError;
}