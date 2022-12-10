import { GridStack } from 'gridstack';
import { afterDrawCallback, barAnimation, WidgetService } from '.';
import { EWidget, IWidget } from '@/domain';

export const widgetGenerator = (grid: GridStack, element: IWidget) => {
  // Logic how to gerate map from Element Widget
  switch (element.widgetType) {
    case EWidget.MAPS: {
      WidgetService.generateMap(
        grid,
        element.node,
        element.nodeId,
        element.name,
      );
      break;
    }
    case EWidget.GAUGE: {
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
      break;
    }
    case EWidget.BAR: {
      element.widgetData.options.animation = barAnimation;
      WidgetService.generateChart(
        grid,
        element.nodeId,
        element.widgetData,
        element.node,
        element.name,
      );
      break;
    }
    default: {
      WidgetService.generateChart(
        grid,
        element.nodeId,
        element.widgetData,
        element.node,
        element.name,
      );
      break;
    }
  }
};
