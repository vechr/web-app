export interface ITopicEvent {
  id: string,
  topicId: string,
  name: string,
  description: string,
  eventExpression?: any,
  createdAt?: string,
  updatedAt?: string
}