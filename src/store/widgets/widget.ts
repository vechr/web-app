import { ICreateWidget, IError, IWidget } from '@/types';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import L from 'leaflet';
import { GridStack, GridStackNode } from 'gridstack';
import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';
import axios from 'axios';
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
    async createWidget(dashboardId: string, data: ICreateWidget) {
      await axios
        .post(`/dashboard/${dashboardId}/widget`, data)
        .then((res) => {
          this.message = res.data.message;
          this.dataDetails = res.data.result;
          this.error = res.data.error;
        })
        .catch((err) => {
          this.error = err.response.data.error;
          message.error(`${this.error.code} ${this.error.message}`);
        });
    },
    addNewMaps(grid: GridStack, nodeId: string) {
      grid.compact();
      const node: any = {
        x: 12,
        y: 5,
        w: 12,
        h: 5,
      };
      node.id = node.content = nodeId;
      grid.addWidget(
        '<div class="grid-stack-item event-map"><div class="grid-stack-item-content map-gridstack"><div class="container-map"><div class="my-map" id="map_' +
          node.id +
          '"></div></div></div></div>',
        node
      );
      const map = new L.Map(`map_${node.id}`, {
        center: new L.LatLng(40.731253, -73.996139),
        zoom: 12,
        attributionControl: false,
        // dragging: false
      });

      map.locate({ setView: true, maxZoom: 16 });

      map.on('locationfound', function (e) {
        const radius: number = e.accuracy;

        L.marker(e.latlng)
          .addTo(map)
          .bindPopup('You are within ' + radius + ' meters from this point')
          .openPopup();

        L.circle(e.latlng, radius).addTo(map);
      });

      map.on('locationerror', function onLocationError(e) {
        message.error(e.message);
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '',
        maxZoom: 18,
      }).addTo(map);
    },
    generateChart(grid: GridStack, nodeId: string, dataChart: any, node: any) {
      grid.compact();
      node.id = node.content = nodeId;
      grid.addWidget(
        '<div class="grid-stack-item"><div class="grid-stack-item-content"><canvas id="myChart_' +
          node.id +
          '"></canvas></div></div>',
        node
      );

      const canvas = document.getElementById(
        'myChart_' + node.id
      ) as HTMLCanvasElement;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      new Chart(ctx, dataChart);
    },
    addNewGaugeChart(grid: GridStack, nodeId: string, dataChart: any) {
      //Sama
      this.generateChart(grid, nodeId, dataChart, {
        x: 12,
        y: 5,
        w: 5,
        h: 4,
      });
    },
    addNewRadarChart(grid: GridStack, nodeId: string, dataChart: any) {
      //Sama
      this.generateChart(grid, nodeId, dataChart, {
        x: 12,
        y: 5,
        w: 3,
        h: 6,
      });
    },
    addNewPolarAreaChart(grid: GridStack, nodeId: string, dataChart: any) {
      //Sama
      this.generateChart(grid, nodeId, dataChart, {
        x: 12,
        y: 5,
        w: 3,
        h: 6,
      });
    },
    addNewPieChart(grid: GridStack, nodeId: string, dataChart: any) {
      this.generateChart(grid, nodeId, dataChart, {
        x: 12,
        y: 5,
        w: 3,
        h: 6,
      });
    },
    addNewDoughnutChart(grid: GridStack, nodeId: string, dataChart: any) {
      this.generateChart(grid, nodeId, dataChart, {
        x: 12,
        y: 5,
        w: 3,
        h: 6,
      });
    },
    addNewBubbleChart(grid: GridStack, nodeId: string, dataChart: any) {
      this.generateChart(grid, nodeId, dataChart, {
        x: 12,
        y: 5,
        w: 6,
        h: 4,
      });
    },
    addNewLineChart(grid: GridStack, nodeId: string, dataChart: any) {
      this.generateChart(grid, nodeId, dataChart, {
        x: 12,
        y: 5,
        w: 6,
        h: 4,
      });
    },
    addNewBarChart(grid: GridStack, nodeId: string, dataChart: any) {
      this.generateChart(grid, nodeId, dataChart, {
        x: 12,
        y: 5,
        w: 6,
        h: 4,
      });
    },
    addNewScatterChart(grid: GridStack, nodeId: string, dataChart: any) {
      this.generateChart(grid, nodeId, dataChart, {
        x: 12,
        y: 5,
        w: 6,
        h: 4,
      });
    },
  },
});
