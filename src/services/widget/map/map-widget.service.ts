import { GridStack } from 'gridstack';
import { MapService } from '../../../domain/widget/map/map.service';
import { useWidgetStore } from '@/ui/store/widgets/widget';
import { IFormWidget, IMaps } from '@/domain';

export class MapWidget extends MapService {
  private store = useWidgetStore();

  addMap(grid: GridStack, nodeId: string, formData: IFormWidget): void {
    this.store.createMap(grid, nodeId, formData, {
      x: 12,
      y: 5,
      w: 12,
      h: 5,
    });
  }

  validation(data: string): boolean {
    try {
      if (!this.isMaps(JSON.parse(data))) {
        console.error("Data wouldn't be store, since type is not Maps");
        return false;
      }

      return true;
    } catch (error) {
      console.error(`${error}`);
      return false;
    }
  }

  private isMaps(data: any): data is IMaps {
    return 'latitude' in data && 'longitude' in data;
  }
}
