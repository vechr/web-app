import { GridStack } from 'gridstack';
import Container from 'typedi';
import { ref } from 'vue';
import { WidgetUsecase } from '@/modules/widgets/widget.usecase';
import { TCreateWidgetRequestBody } from '@/modules/widgets/widget.entity';

export class LineChartWidget {
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
