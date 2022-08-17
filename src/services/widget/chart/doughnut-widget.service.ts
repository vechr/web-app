import { useWidgetStore } from '@/ui/store/widgets/widget';
import { IFormWidget, ChartService } from '@/domain';
import { GridStack } from 'gridstack';

export class DoughnutChartWidget extends ChartService {
  private store = useWidgetStore()

  addChart(grid: GridStack, nodeId: string, formData: IFormWidget): void {
    this.store.createChart(grid, nodeId, {
      x: 12,
      y: 5,
      w: 3,
      h: 6,
    }, formData)
  }
}