import { useWidgetStore } from '@/store/widgets/widget';
import { IFormWidget } from '@/types';
import { GridStack } from 'gridstack';
import { AbstractChart } from './abstract/abstract-chart.helper';
import doughnutPieChartData from '@/types/chart/doughnut-pie-chart';

export class DoughnutChartWidget extends AbstractChart {
  private store = useWidgetStore()

  addChart(grid: GridStack, nodeId: string, formData: IFormWidget): void {
    this.store.createChart(grid, nodeId, doughnutPieChartData('doughnut'), {
      x: 12,
      y: 5,
      w: 3,
      h: 6,
    }, formData)
  }
}