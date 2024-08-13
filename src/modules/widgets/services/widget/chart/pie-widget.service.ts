import { GridStack } from 'gridstack';
import Container from 'typedi';
import { ref } from 'vue';
import { WidgetUsecase } from '@/modules/widgets/widget.usecase';
import { TCreateWidgetRequestBody } from '@/modules/widgets/widget.entity';

export class PieChartWidget {
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
        w: 3,
        h: 6,
      },
      body,
    );
  }
}
