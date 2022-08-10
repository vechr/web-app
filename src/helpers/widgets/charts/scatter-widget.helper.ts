import { useWidgetStore } from '@/store/widgets/widget';
import { IFormWidget } from '@/types';
import { GridStack } from 'gridstack';
import { AbstractChart } from './abstract/abstract-chart.helper';
import scatterChartData from '@/types/chart/scatter-chart';

export class ScatterChartWidget extends AbstractChart {
  private store = useWidgetStore()

  addChart(grid: GridStack, nodeId: string, formData: IFormWidget): void {
    this.store.createChart(grid, nodeId, scatterChartData, {
      x: 12,
      y: 5,
      w: 6,
      h: 4,
    }, formData)
  }
}