import { IBaseResponse, ITopic } from '@/domain';

export interface ITopicData extends IBaseResponse {
  data: ITopic[];
  dataDetails: ITopic;
  topicEdit: { name: string; description: string };
}
