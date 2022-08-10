import { IFormWidget } from '@/types';
import { GridStack } from 'gridstack';

export abstract class AbstractMap {
  abstract addMap(grid: GridStack, nodeId: string, formData: IFormWidget): void
}