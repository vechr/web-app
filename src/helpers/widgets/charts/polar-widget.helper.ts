import { useWidgetStore } from '@/store/widgets/widget';
import { IFormWidget } from '@/types';
import { GridStack } from 'gridstack';
import { AbstractChart } from './abstract/abstract-chart.helper';
import polarAreaChartData from '@/types/chart/polar-chart';

export class PolarChartWidget extends AbstractChart {
  private store = useWidgetStore()

  addChart(grid: GridStack, nodeId: string, formData: IFormWidget): void {
    this.store.createChart(grid, nodeId, polarAreaChartData, {
      x: 12,
      y: 5,
      w: 3,
      h: 6,
    }, formData)
  }
}