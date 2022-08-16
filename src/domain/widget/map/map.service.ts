import { IFormWidget } from '@/domain';
import { GridStack } from 'gridstack';

export abstract class MapService {
  abstract addMap(grid: GridStack, nodeId: string, formData: IFormWidget): void
  abstract validation(widgetType: string, data: string): boolean
}