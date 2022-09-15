import { GridStackNode } from 'gridstack';
import { IWidget, IError } from '@/domain';

export interface IWidgetData {
  message: string;
  data: IWidget[];
  dataDetails: IWidget | null;
  node: GridStackNode[];
  error: IError;
}
