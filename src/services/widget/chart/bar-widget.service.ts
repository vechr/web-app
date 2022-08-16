import { useWidgetStore } from '@/ui/store/widgets/widget';
import { IFormWidget } from '@/domain';
import { GridStack } from 'gridstack';
import { ChartService } from '../../../domain/widget/chart/chart.service';

export class BarChartWidget extends ChartService {
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
      const result = Number(data);
      if (Number.isNaN(result)) {
        console.error('Data wouldn\'t be store, since type is different');
        return false;
      }
      return true;
    } catch (error) {
      console.error(`${error}`);
      return false;
    }
  }
}