import { IDashboard } from "./dashboard";
import { ITopic } from "./topic";

export interface IWidget {
  id: string,
  name: string,
  description?: string,
  createdAt?: string,
  updatedAt?: string,
  dashboardId: string,
  node: object,
  nodeId: string,
  widgetData: object,
  widgetType: string,
  hidden?: boolean,
  persistance?: boolean,
  topicId: string,
  dashboard: IDashboard,
  topic: ITopic
}