import { IFormWidget } from '@/types';
import { GridStack } from 'gridstack';

export abstract class AbstractChart {
  abstract addChart(grid: GridStack, nodeId: string, formData: IFormWidget): void
}