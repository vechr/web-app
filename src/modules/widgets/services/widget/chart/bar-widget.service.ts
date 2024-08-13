import { GridStack } from 'gridstack';
import Container from 'typedi';
import { ref } from 'vue';
import { TCreateWidgetRequestBody } from '@/modules/widgets/widget.entity';
import { WidgetUsecase } from '@/modules/widgets/widget.usecase';

export class BarChartWidget {
  private usecase = ref(Container.get(WidgetUsecase));

  addChart(
    grid: GridStack,
    nodeId: string,
    body: TCreateWidgetRequestBody,
  ): void {
    this.usecase.value.createChart(
      grid,
      nodeId,
      {
        x: 12,
        y: 5,
        w: 6,
        h: 4,
      },
      body,
    );
  }
}
