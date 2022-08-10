import { useWidgetStore } from '@/store/widgets/widget';
import { IFormWidget } from '@/types';
import { GridStack } from 'gridstack';
import { AbstractChart } from './abstract/abstract-chart.helper';
import barChartData from '@/types/chart/bar-chart';

export class BarChartWidget extends AbstractChart {
  private store = useWidgetStore()

  addChart(grid: GridStack, nodeId: string, formData: IFormWidget): void {
    this.store.createChart(grid, nodeId, barChartData, {
      x: 12,
      y: 5,
      w: 6,
      h: 4,
    }, formData)
  }
}