import { GridStack } from 'gridstack';
import { afterDrawCallback, WidgetService } from '.';
import { EWidget, IWidget } from '@/domain';

export const widgetGenerator = (grid: GridStack, element: IWidget) => {
  // Logic how to gerate map from Element Widget
  if (element.widgetType === EWidget.MAPS) {
    WidgetService.generateMap(grid, element.node, element.nodeId, element.name);
  } else if (element.widgetType === EWidget.GAUGE) {
    element.widgetData.plugins = [
      {
        afterDraw: afterDrawCallback,
      },
    ];
    WidgetService.generateChart(
      grid,
      element.nodeId,
      element.widgetData,
      element.node,
      element.name,
    );
  } else {
    WidgetService.generateChart(
      grid,
      element.nodeId,
      element.widgetData,
      element.node,
      element.name,
    );
  }
};
