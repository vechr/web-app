import { IFormWidget } from '@/domain';
import { GridStack } from 'gridstack';

export abstract class ChartService
 {
  abstract addChart(grid: GridStack, nodeId: string, formData: IFormWidget): void
  abstract validation(widgetType: string, data: string): boolean
}