import { IBaseResponse, ITopicEvent } from '@/domain';

export interface ITopicEventData extends IBaseResponse {
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
}
