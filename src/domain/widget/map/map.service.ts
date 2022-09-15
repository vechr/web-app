import { GridStack } from 'gridstack';
import { IFormWidget } from '@/domain';

export abstract class MapService {
  abstract addMap(grid: GridStack, nodeId: string, formData: IFormWidget): void;
  abstract validation(widgetType: string, data: string): boolean;
}
