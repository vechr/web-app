import { GridStack } from 'gridstack';
import { ref } from 'vue';
import Container from 'typedi';
import { WidgetUsecase } from '@/modules/widgets/widget.usecase';
import { TCreateWidgetRequestBody } from '@/modules/widgets/widget.entity';
import { IMaps } from '@/modules/widgets/data-widget.entity';

export class MapWidget {
  private usecase = ref(Container.get(WidgetUsecase));

  addMap(
    grid: GridStack,
    nodeId: string,
    body: TCreateWidgetRequestBody,
  ): void {
    this.usecase.value.createMap(grid, nodeId, body, {
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
