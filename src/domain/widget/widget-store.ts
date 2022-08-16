import { IWidget, IError } from '@/domain';
import { GridStackNode } from 'gridstack';

export interface IWidgetData {
  message: string;
  data: IWidget[];
  dataDetails: IWidget | null;
  node: GridStackNode[];
  error: IError;
}