import { GridStack } from 'gridstack';
import { defineStore } from 'pinia';
import { IFormWidget } from '@/domain';

interface IWidgetDrawer {
  visible: boolean;
  grid: GridStack;
  titleConfig: string;
  widgetSelection: string;
  configVisible: boolean;
  formState: IFormWidget;
  dashboardId: string | string[];
}

export const useWidgetDrawerStore = defineStore('widgetDrawer', {
  state: () => {
    return {
      visible: false,
      titleConfig: '',
      widgetSelection: '',
      configVisible: false,
      dashboardId: '',
      formState: {
        dashboardId: '',
        description: '',
        name: '',
        topicId: '',
        widgetData: {},
        widgetType: '',
        shiftData: true,
      },
      grid: {},
    } as IWidgetDrawer;
  },
  actions: {
    setGrid(grid: GridStack) {
      this.grid = grid;
    },
    setDashboardId(dashboardId: string | string[]) {
      this.dashboardId = dashboardId;
    },
  },
});
