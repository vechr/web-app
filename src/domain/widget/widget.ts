import { IDashboard } from '../dashboard/dashboard';
import { ITopic } from '../topic/topic';

export interface IWidget {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  dashboardId: string;
  node: INode;
  nodeId: string;
  widgetData: object;
  widgetType: string;
  hidden?: boolean;
  persistance?: boolean;
  topicId: string;
  dashboard: IDashboard;
  topic: ITopic;
}

export interface ICreateWidget {
  name: string;
  description?: string;
  node: INode;
  nodeId: string;
  widgetData: object;
  widgetType: string;
  hidden?: boolean;
  persistance?: boolean;
  topicId: string;
}

export interface IUpdateWidget {
  name?: string;
  description?: string;
  node?: INode;
  widgetData?: object;
  hidden?: boolean;
  persistance?: boolean;
}


export interface IFormWidget {
  topicId: string;
  name: string;
  description: string;
  hidden: boolean;
  persistance: boolean;
  dashboardId: string;
  widgetType: string;
  widgetData: object;
}

export interface INode {
  x: number;
  y: number;
  w: number;
  h: number;
  id?: string;
  content?: string;
}