import { GridStack } from 'gridstack';
import { EWidget, Widget } from '../../widget.entity';
import { afterDrawCallback, barAnimation } from './data';
import { WidgetService } from './widget.service';

export const widgetGenerator = (grid: GridStack, element: Widget) => {
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
