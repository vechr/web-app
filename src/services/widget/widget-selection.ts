import { GridStack } from 'gridstack';
import {
  afterDrawCallback,
  barAnimation,
  barChartData,
  BarChartWidget,
  bubbleChartData,
  BubbleChartWidget,
  DoughnutChartWidget,
  doughnutPieChartData,
  gaugeChartData,
  GaugeChartWidget,
  lineChartData,
  LineChartWidget,
  MapWidget,
  PieChartWidget,
  polarAreaChartData,
  PolarChartWidget,
  radarChartData,
  RadarChartWidget,
  scatterChartData,
  ScatterChartWidget,
} from '.';
import { EWidget, IFormWidget } from '@/domain';
import uuid from '@/utils/uuid.util';

interface IWidgetSelectionData {
  widgetData: any;
  widgetType: EWidget;
}

export const createWidget = (
  widgetType: string,
  grid: GridStack,
  formState: IFormWidget,
) => {
  const bar = new BarChartWidget();
  const doughnut = new DoughnutChartWidget();
  const gauge = new GaugeChartWidget();
  const bubble = new BubbleChartWidget();
  const line = new LineChartWidget();
  const pie = new PieChartWidget();
  const polar = new PolarChartWidget();
  const radar = new RadarChartWidget();
  const scatter = new ScatterChartWidget();
  const map = new MapWidget();

  switch (widgetType) {
    case EWidget.BAR: {
      formState.widgetData.options.animation = barAnimation;
      bar.addChart(grid, uuid(), formState);
      break;
    }
    case EWidget.BUBBLE: {
      bubble.addChart(grid, uuid(), formState);
      break;
    }
    case EWidget.DOUGHNUT: {
      doughnut.addChart(grid, uuid(), formState);
      break;
    }
    case EWidget.PIE: {
      pie.addChart(grid, uuid(), formState);
      break;
    }
    case EWidget.GAUGE: {
      formState.widgetData.plugins = [
        {
          afterDraw: afterDrawCallback,
        },
      ];
      gauge.addChart(grid, uuid(), formState);
      break;
    }
    case EWidget.LINE: {
      line.addChart(grid, uuid(), formState);
      break;
    }
    case EWidget.POLAR: {
      polar.addChart(grid, uuid(), formState);
      break;
    }
    case EWidget.RADAR: {
      radar.addChart(grid, uuid(), formState);
      break;
    }
    case EWidget.SCATTER: {
      scatter.addChart(grid, uuid(), formState);
      break;
    }
    case EWidget.MAPS: {
      map.addMap(grid, uuid(), formState);
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
