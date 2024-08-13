import { GridStackNode } from 'gridstack';
import { Dashboard } from '../dashboards/dashboard.entity';
import { Topic } from '../topics/topic.entity';
import { BaseEntity } from '@/core/base/domain/entities';

export class Widget extends BaseEntity {
  dashboard: Dashboard;
  dashboardId: string;
  node: INode;
  nodeId: string;
  widgetData: any;
  widgetType: string;
  shiftData: boolean | null;
  topicId: string;
  topic: Topic;
}

export enum EWidget {
  BAR = 'BAR',
  BUBBLE = 'BUBBLE',
  DOUGHNUT = 'DOUGHNUT',
  PIE = 'PIE',
  GAUGE = 'GAUGE',
  LINE = 'LINE',
  POLAR = 'POLAR',
  RADAR = 'RADAR',
  SCATTER = 'SCATTER',
  MAPS = 'MAPS',
}

export type TCreateWidgetRequestBody = Omit<
  Widget,
  'id' | 'createdAt' | 'updatedAt' | 'topic' | 'dashboard'
>;
export type TUpdateWidgetRequestBody = Partial<TCreateWidgetRequestBody>;

export interface INode {
  x: number;
  y: number;
  w: number;
  h: number;
  id?: string;
  content?: string;
}

export interface IWidgetData {
  data: Widget[];
  dataDetails: Widget | null;
  node: GridStackNode[];
}
