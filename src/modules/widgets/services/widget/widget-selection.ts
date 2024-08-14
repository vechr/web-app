import { GridStack } from 'gridstack';
import { EWidget, TCreateWidgetRequestBody } from '../../widget.entity';
import { initialDataNode } from './data/widget.data';
import {
  afterDrawCallback,
  barAnimation,
  barChartData,
  bubbleChartData,
  doughnutPieChartData,
  gaugeChartData,
  lineChartData,
  polarAreaChartData,
  radarChartData,
  scatterChartData,
} from './data';
import uuid from '@/core/base/frameworks/utils/uuid.util';
import { useWidgetStore } from '@/modules/widgets/widget.store';

interface IWidgetSelectionData {
  widgetData: any;
  widgetType: EWidget;
}

export const createWidget = async (
  widgetType: string,
  grid: GridStack,
  body: TCreateWidgetRequestBody,
) => {
  const widgetStore = useWidgetStore();
  body.nodeId = uuid();

  switch (widgetType) {
    case EWidget.BAR: {
      body.widgetData.options.animation = barAnimation;

      // Create Node
      body.node = initialDataNode.bar;
      body.node.id = body.node.content = body.nodeId;
      await widgetStore.createChart(grid, body);
      break;
    }
    case EWidget.BUBBLE: {
      // Create Node
      body.node = initialDataNode.bubble;
      body.node.id = body.node.content = body.nodeId;
      await widgetStore.createChart(grid, body);
      break;
    }
    case EWidget.DOUGHNUT: {
      // Create Node
      body.node = initialDataNode.doughtnut;
      body.node.id = body.node.content = body.nodeId;
      await widgetStore.createChart(grid, body);
      break;
    }
    case EWidget.PIE: {
      // Create Node
      body.node = initialDataNode.pie;
      body.node.id = body.node.content = body.nodeId;
      await widgetStore.createChart(grid, body);
      break;
    }
    case EWidget.GAUGE: {
      body.widgetData.plugins = [
        {
          afterDraw: afterDrawCallback,
        },
      ];
      // Create Node
      body.node = initialDataNode.gauge;
      body.node.id = body.node.content = body.nodeId;
      await widgetStore.createChart(grid, body);
      break;
    }
    case EWidget.LINE: {
      // Create Node
      body.node = initialDataNode.line;
      body.node.id = body.node.content = body.nodeId;
      await widgetStore.createChart(grid, body);
      break;
    }
    case EWidget.POLAR: {
      // Create Node
      body.node = initialDataNode.polar;
      body.node.id = body.node.content = body.nodeId;
      await widgetStore.createChart(grid, body);
      break;
    }
    case EWidget.RADAR: {
      // Create Node
      body.node = initialDataNode.radar;
      body.node.id = body.node.content = body.nodeId;
      await widgetStore.createChart(grid, body);
      break;
    }
    case EWidget.SCATTER: {
      // Create Node
      body.node = initialDataNode.scatter;
      body.node.id = body.node.content = body.nodeId;
      await widgetStore.createChart(grid, body);
      break;
    }
    case EWidget.MAPS: {
      // Create Node
      body.node = initialDataNode.map;
      body.node.id = body.node.content = body.nodeId;
      await widgetStore.createMap(grid, body);
      break;
    }
  }
};

export const widgetSelection = (widgetType: string): IWidgetSelectionData => {
  let data: IWidgetSelectionData = {
    widgetData: {},
    widgetType: EWidget.BAR,
  };

  switch (widgetType) {
    case EWidget.BAR: {
      data = {
        widgetData: barChartData,
        widgetType: EWidget.BAR,
      };
      break;
    }
    case EWidget.BUBBLE: {
      data = {
        widgetData: bubbleChartData,
        widgetType: EWidget.BUBBLE,
      };
      break;
    }
    case EWidget.DOUGHNUT: {
      data = {
        widgetData: doughnutPieChartData('doughnut'),
        widgetType: EWidget.DOUGHNUT,
      };
      break;
    }
    case EWidget.PIE: {
      data = {
        widgetData: doughnutPieChartData('pie'),
        widgetType: EWidget.PIE,
      };
      break;
    }
    case EWidget.GAUGE: {
      data = {
        widgetData: gaugeChartData,
        widgetType: EWidget.GAUGE,
      };
      break;
    }
    case EWidget.LINE: {
      data = {
        widgetData: lineChartData,
        widgetType: EWidget.LINE,
      };
      break;
    }
    case EWidget.POLAR: {
      data = {
        widgetData: polarAreaChartData,
        widgetType: EWidget.POLAR,
      };
      break;
    }
    case EWidget.RADAR: {
      data = {
        widgetData: radarChartData,
        widgetType: EWidget.RADAR,
      };
      break;
    }
    case EWidget.SCATTER: {
      data = {
        widgetData: scatterChartData,
        widgetType: EWidget.SCATTER,
      };
      break;
    }
    case EWidget.MAPS: {
      data = {
        widgetData: {
          latitude: 40.731253,
          longitude: -73.996139,
        },
        widgetType: EWidget.MAPS,
      };
      break;
    }
  }
  return data;
};
