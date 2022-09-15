import { GridStack } from 'gridstack';
import { IFormWidget } from '@/domain';

export abstract class ChartService {
  abstract addChart(
    grid: GridStack,
    nodeId: string,
    formData: IFormWidget,
  ): void;
}
