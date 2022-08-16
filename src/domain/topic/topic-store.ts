import { IError, ITopic } from '@/domain';

export interface ITopicData {
  message: string;
  data: ITopic[];
  dataDetails: ITopic;
  topicEdit: { name: string; description: string };
  error: IError;
}