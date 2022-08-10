import { useWidgetStore } from '@/store/widgets/widget';
import { IFormWidget } from '@/types';
import { GridStack } from 'gridstack';
import { AbstractMap } from './abstract/abstrat-map.helper';

export class MapWidget extends AbstractMap {
  private store = useWidgetStore()

  addMap(grid: GridStack, nodeId: string, formData: IFormWidget): void {
    this.store.createMap(grid, nodeId, formData, {
      x: 12,
      y: 5,
      w: 12,
      h: 5,
    })
  }
}