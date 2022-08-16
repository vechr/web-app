import { useWidgetStore } from '@/ui/store/widgets/widget';
import { IFormWidget, IScatter } from '@/domain';
import { GridStack } from 'gridstack';
import { ChartService } from '../../../domain/widget/chart/chart.service';

export class ScatterChartWidget extends ChartService {
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
      if (!this.isScatter(JSON.parse(data))) {
        console.error('Data wouldn\'t be store, since type is not Scatter');
        return false;
      }

      return true;
    } catch (error) {
      console.error(`${error}`);
      return false;
    }
  }

  private isScatter(data: any): data is IScatter {
    return 'r' in data && 'y' in data;
  }
}