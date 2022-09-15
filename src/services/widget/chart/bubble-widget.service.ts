import { GridStack } from 'gridstack';
import { useWidgetStore } from '@/ui/store/widgets/widget';
import { IFormWidget, ChartService } from '@/domain';

export class BubbleChartWidget extends ChartService {
  private store = useWidgetStore();

  addChart(grid: GridStack, nodeId: string, formData: IFormWidget): void {
    this.store.createChart(
      grid,
      nodeId,
      {
        x: 12,
        y: 5,
        w: 6,
        h: 4,
      },
      formData,
    );
  }
}
