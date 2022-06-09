import { IDashboard } from "./dashboard";
import { ITopic } from "./topic";

export interface IWidget {
  id: string,
  name: string,
  description: string,
  createdAt?: string,
  updatedAt?: string,
  dashboardId: string,
  node: object,
  widgetData: object,
  widgetType: string,
  topicId: string,
  dashboard: IDashboard,
  topic: ITopic
}