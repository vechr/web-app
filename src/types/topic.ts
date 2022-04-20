export interface ITopic {
  id: string,
  deviceId: string,
  name: string,
  description: string,
  createdAt?: string,
  updatedAt?: string,
  topicEvents: []
}