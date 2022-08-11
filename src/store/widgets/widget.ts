import { ICreateWidget, IError, IFormWidget, INode, IUpdateWidget, IWidget } from '@/types';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { GridStack, GridStackNode } from 'gridstack';
import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';
import axios from 'axios';
import { WidgetHelper } from '@/helpers/widgets/widget.helper';
interface IWidgetData {
  message: string;
  data: IWidget[];
  dataDetails: IWidget | null;
  node: GridStackNode[];
  error: IError;
}

axios.defaults.baseURL = process.env.VUE_APP_SERVICE_THINGS;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

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
    async updateWidgetById(dashboardId: string, widgetId: string, data: IUpdateWidget) {
      await axios.patch(`/dashboard/${dashboardId}/widget/${widgetId}`, data)
        .then((res) => {
          this.dataDetails = res.data.result;
          this.message = res.data.message;
          const index = this.data.findIndex(
            (x) => x.id === res.data.result.id
          );
          this.data[index] = res.data.result;
          message.success(this.message);
          
        })
        .catch((err) => {
          this.error = err.response.data.error;
          message.error(`${this.error.code} ${this.error.message}`);
        })
    },
    async deleteWidgetById(dashboardId: string, widgetId: string) {
      await axios.delete(`/dashboard/${dashboardId}/widget/${widgetId}`)
        .then((res) => {
          this.dataDetails = res.data.result;
          this.message = res.data.message;
          message.success(this.message);
          this.data = this.data.filter((val) => val.id !== this.dataDetails?.id)
        })
        .catch((err) => {
          this.error = err.response.data.error;
          message.error(`${this.error.code} ${this.error.message}`);
        })
    },
    async getAllWidgets(dashboardId: string) {
      await axios.get(`/dashboard/${dashboardId}/widget`)
        .then((res) => {
          this.data = res.data.result;
          this.message = res.data.message;
          this.error = res.data.error;
        })
        .catch((err) => {
          this.error = err.response.data.error;
          message.error(`${this.error.code} ${this.error.message}`);
        })
    },
    async createWidget(dashboardId: string, data: ICreateWidget): Promise<void> {
      return await axios
        .post(`/dashboard/${dashboardId}/widget`, data)
        .then((res) => {
          this.message = res.data.message;
          this.dataDetails = res.data.result;
          this.error = res.data.error;
          this.data.push(res.data.result);
          message.success(this.message)
        })
        .catch((err) => {
          this.error = err.response.data.error;
          message.error(`${this.error.code} ${this.error.message}`);
        });
    },
    createMap(grid: GridStack, nodeId: string, formData: IFormWidget, node: INode) {
      node.id = node.content = nodeId;

      WidgetHelper.generateMap(grid, node, nodeId);

      this.createWidget(formData.dashboardId, {
        name: formData.name,
        node: node,
        nodeId: nodeId,
        topicId: formData.topicId,
        widgetData: formData.widgetData,
        widgetType: formData.widgetType,
        description: formData.description,
        hidden: formData.hidden,
        persistance: formData.persistance
      });
    },
    createChart(grid: GridStack, nodeId: string, node: INode, formData: IFormWidget) {
      node.id = node.content = nodeId;
      this.createWidget(formData.dashboardId, {
        name: formData.name,
        node: node,
        nodeId: nodeId,
        topicId: formData.topicId,
        widgetData: formData.widgetData,
        widgetType: formData.widgetType,
        description: formData.description,
        hidden: formData.hidden,
        persistance: formData.persistance
      });
      WidgetHelper.generateChart(grid, nodeId, formData.widgetData, node)
    }
  },
});
