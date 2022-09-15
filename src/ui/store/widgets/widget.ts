import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { GridStack } from 'gridstack';
import { Chart, registerables } from 'chart.js';
import {
  ICreateWidget,
  IFormWidget,
  INode,
  IUpdateWidget,
  IWidgetData,
} from '@/domain';
Chart.register(...registerables);
import { WidgetService } from '@/services/widget/widget.service';
import { widgetController } from '@/applications/controllers';

export const useWidgetStore = defineStore('widget', {
  state: () => {
    return {
      message: '',
      data: [],
      dataDetails: null,
      node: [],
      error: {
        code: '',
        message: '',
        params: Object,
      },
    } as IWidgetData;
  },
  getters: {
    getWidgetType() {
      return [
        { value: 'BAR', label: 'BAR' },
        { value: 'BUBBLE', label: 'BUBBLE' },
        { value: 'DOUGHNUT', label: 'DOUGHNUT' },
        { value: 'PIE', label: 'PIE' },
        { value: 'GAUGE', label: 'GAUGE' },
        { value: 'LINE', label: 'LINE' },
        { value: 'POLAR', label: 'POLAR' },
        { value: 'RADAR', label: 'RADAR' },
        { value: 'SCATTER', label: 'SCATTER' },
        { value: 'MAPS', label: 'MAPS' },
      ];
    },
  },
  actions: {
    async updateWidgetById(
      dashboardId: string,
      widgetId: string,
      data: IUpdateWidget,
    ) {
      const result = await widgetController().updateWidgetById(
        dashboardId,
        widgetId,
        data,
      );
      if (result.data?.error) {
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        this.dataDetails = result.data?.result;
        this.message = result.data ? result.data?.message : 'Success!';
        const index = this.data.findIndex(
          (x) => x.id === result.data?.result.id,
        );
        this.data[index] = result.data?.result;
        message.success(this.message);
      }
    },
    async deleteWidgetById(dashboardId: string, widgetId: string) {
      const result = await widgetController().deleteWidgetById(
        dashboardId,
        widgetId,
      );
      if (result.data?.error) {
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        this.dataDetails = result.data?.result;
        this.message = result.data ? result.data?.message : 'Success!';
        message.success(this.message);
        this.data = this.data.filter((val) => val.id !== this.dataDetails?.id);
      }
    },
    async getAllWidgets(dashboardId: string) {
      const result = await widgetController().getAllWidgets(dashboardId);
      if (result.data?.error) {
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        this.data = result.data?.result;
        this.message = result.data ? result.data?.message : 'Success!';
        this.error = result.data?.error;
      }
    },
    async createWidget(
      dashboardId: string,
      data: ICreateWidget,
    ): Promise<void> {
      const result = await widgetController().createWidget(dashboardId, data);
      if (result.data?.error) {
        this.error = result.data.error;
        message.error(`${this.error.code} ${this.error.message}`);
      } else {
        this.message = result.data ? result.data?.message : 'Success!';
        this.dataDetails = result.data?.result;
        this.error = result.data?.error;
        this.data.push(result.data?.result);
        message.success(this.message);
      }
    },
    createMap(
      grid: GridStack,
      nodeId: string,
      formData: IFormWidget,
      node: INode,
    ) {
      node.id = node.content = nodeId;

      WidgetService.generateMap(grid, node, nodeId, formData.name);

      this.createWidget(formData.dashboardId, {
        name: formData.name,
        node: node,
        nodeId: nodeId,
        topicId: formData.topicId,
        widgetData: formData.widgetData,
        widgetType: formData.widgetType,
        description: formData.description,
        shiftData: formData.shiftData,
      });
    },
    createChart(
      grid: GridStack,
      nodeId: string,
      node: INode,
      formData: IFormWidget,
    ) {
      node.id = node.content = nodeId;
      this.createWidget(formData.dashboardId, {
        name: formData.name,
        node: node,
        nodeId: nodeId,
        topicId: formData.topicId,
        widgetData: formData.widgetData,
        widgetType: formData.widgetType,
        description: formData.description,
        shiftData: formData.shiftData,
      });
      WidgetService.generateChart(
        grid,
        nodeId,
        formData.widgetData,
        node,
        formData.name,
      );
    },
  },
});
