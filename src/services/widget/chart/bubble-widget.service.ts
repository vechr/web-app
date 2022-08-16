import { useWidgetStore } from '@/ui/store/widgets/widget';
import { IBubble, IFormWidget } from '@/domain';
import { GridStack } from 'gridstack';
import { ChartService } from '../../../domain/widget/chart/chart.service';

export class BubbleChartWidget extends ChartService {
  private store = useWidgetStore()

  addChart(grid: GridStack, nodeId: string, formData: IFormWidget): void {
    this.store.createChart(grid, nodeId, {
      x: 12,
      y: 5,
      w: 6,
      h: 4,
    }, formData)
  }

  validation(data: string): boolean {
    try {
      if (!this.isBubble(JSON.parse(data))) {
        console.error('Data wouldn\'t be store, since type is not Bubble');
        return false;
      }

      return true;
    } catch (error) {
      console.error(`${error}`);
      return false;
    }
  }

  private isBubble(data: any): data is IBubble {
    return 'r' in data && 'y' in data && 'r' in data;
  }
}