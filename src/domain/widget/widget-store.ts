import { GridStackNode } from 'gridstack';
import { IWidget, IBaseResponse } from '@/domain';

export interface IWidgetData extends IBaseResponse {
  data: IWidget[];
  dataDetails: IWidget | null;
  node: GridStackNode[];
}
