<template>

    <a-row>
    <a-col :span="12">
      <a-button type="primary" @click="showDrawer"><PlusOutlined/>Widget</a-button>
    </a-col>
    <a-col style="text-align: right" :span="12">
      <h2 class="title-dashboard">Dashboard</h2>
    </a-col>
  </a-row>
  <a-drawer
    v-model:visible="visible"
    class="custom-class"
    style="color: red"
    title="Dashboard Widget"
    placement="right"
  >
  <div class="dashboard-panel">
    <a-collapse v-model:activeKey="activeKey" ghost>
      <a-collapse-panel key="1" header="Chart">
        <a-row >
          <a-col :span="12">
            <a-card @click="addNewBarChart()" align="middle">
              <BarChartOutlined /><br/> Bar Chart
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card @click="addNewLineChart()" align="middle">
              <LineChartOutlined /><br/> Line Chart
            </a-card>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-card @click="addNewBubbleChart()" align="middle">
              <DotChartOutlined /><br/> Bubble Chart
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card @click="addNewDoughnutChart()" align="middle">
              <PieChartOutlined /><br/> Doughnut Chart
            </a-card>
          </a-col>
        </a-row>
        <a-row>
          <a-col @click="addNewPieChart()" :span="12">
            <a-card align="middle">
              <PieChartFilled /><br/> Pie Chart
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card @click="addNewPolarAreaChart()" align="middle">
              <PieChartTwoTone /><br/> Polar Area Chart
            </a-card>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-card @click="addNewRadarChart()" align="middle">
              <RadarChartOutlined /><br/> Radar Chart
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card @click="addNewScatterChart()" align="middle">
              <DotChartOutlined /><br/> Scatter Chart
            </a-card>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-card @click="addNewGaugeChart()" align="middle">
              <DashboardOutlined /><br/> Gauge
            </a-card>
          </a-col>
        </a-row>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="Location">
        <a-row>
          <a-col :span="12">
            <a-card @click="addNewMaps()" align="middle">
              <EnvironmentOutlined /><br/> Maps
            </a-card>
          </a-col>
        </a-row>
      </a-collapse-panel>
    </a-collapse>  

  </div>
  </a-drawer>
  <section class="grid-stack">
  </section>
</template>

<script lang="ts">
import { EnvironmentOutlined, PieChartTwoTone, PieChartFilled, PlusOutlined, BarChartOutlined, LineChartOutlined, DotChartOutlined, PieChartOutlined, RadarChartOutlined, DashboardOutlined } from "@ant-design/icons-vue";
import { defineComponent, onMounted, ref } from "vue";
import { GridStack } from 'gridstack';
import Chart from 'chart.js/auto';
import L from "leaflet";
import barChartData from '@/types/chart/bar-chart';
import lineChartData from '@/types/chart/line-chart';
import bubbleChartData from '@/types/chart/bubble-chart';
import doughnutPieChartData from '@/types/chart/doughnut-pie-chart';
import polarAreaChartData from '@/types/chart/polar-chart';
import radarChartData from '@/types/chart/radar-chart';
import scatterChartData from '@/types/chart/scatter-chart';
import gaugeChartData from '@/types/chart/gauge-chart';
import { message } from "ant-design-vue";

export default defineComponent({
  name: 'Dashboard',
  components: { EnvironmentOutlined, DashboardOutlined, PieChartTwoTone, PieChartFilled, PlusOutlined, BarChartOutlined, LineChartOutlined, DotChartOutlined, PieChartOutlined, RadarChartOutlined },
  setup () {
    const visible = ref<boolean>(false);

    const showDrawer = () => {
      visible.value = true;
    };

    const activeKey = ref(['1', '2']);

    let count = ref(0);
    let info = ref("");
    let grid: GridStack;
    onMounted(() => {
      grid = GridStack.init({
        float: false,
        cellHeight: "70px",
        minRow: 7,
        removable: true
      });

      grid.on("dragstop", (_, element: any) => {
        const node = element.gridstackNode;
        info.value = `you just dragged node #${node.id} to ${node.x},${node.y} – good job!`;
      });
    });

    function addNewMaps() {
      grid.compact();
      const node: any = {
        x: 12,
        y: 5,
        w: 12,
        h: 5,
      };
      node.id = node.content = String(count.value++);
      grid.addWidget('<div class="grid-stack-item event-map"><div class="grid-stack-item-content map-gridstack"><div class="container-map"><div class="my-map" id="map_' + node.id + '"></div></div></div></div>', node);
      let map = new L.Map(`map_${node.id}`, {
        center: new L.LatLng(40.731253, -73.996139),
        zoom: 12,
        attributionControl: false,
        // dragging: false
      });

      map.locate({setView: true, maxZoom: 16});

      map.on('locationfound', function (e) {
        var radius = e.accuracy;

        L.marker(e.latlng).addTo(map)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();

        L.circle(e.latlng, radius).addTo(map);
      });

      map.on('locationerror', function onLocationError(e) {
          message.error(e.message);
      });
      
      L.tileLayer(
       "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
       {
         attribution:'',
         maxZoom: 18
       }
     ).addTo(map);
    }

    function addNewGaugeChart() {
      grid.compact();
      const node: any = {
        x: 12,
        y: 5,
        w: 5,
        h: 4,
      };
      node.id = node.content = String(count.value++);
      grid.addWidget('<div class="grid-stack-item"><div class="grid-stack-item-content"><canvas id="myChart_' + node.id + '"></canvas></div></div>', node);
      
      const canvas = document.getElementById("myChart_" + node.id) as HTMLCanvasElement;
      let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      new Chart(ctx, gaugeChartData as any);
    }

    function addNewScatterChart() {
      grid.compact();
      const node: any = {
        x: 12,
        y: 5,
        w: 6,
        h: 4,
      };
      node.id = node.content = String(count.value++);
      grid.addWidget('<div class="grid-stack-item"><div class="grid-stack-item-content"><canvas id="myChart_' + node.id + '"></canvas></div></div>', node);
      
      const canvas = document.getElementById("myChart_" + node.id) as HTMLCanvasElement;
      let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      new Chart(ctx, scatterChartData);
    }

    function addNewRadarChart() {
      grid.compact();
      const node: any = {
        x: 12,
        y: 5,
        w: 3,
        h: 6,
      };
      node.id = node.content = String(count.value++);
      grid.addWidget('<div class="grid-stack-item"><div class="grid-stack-item-content"><canvas id="myChart_' + node.id + '"></canvas></div></div>', node);
      
      const canvas = document.getElementById("myChart_" + node.id) as HTMLCanvasElement;
      let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      new Chart(ctx, radarChartData);
    }

    function addNewPolarAreaChart() {
      grid.compact();
      const node: any = {
        x: 12,
        y: 5,
        w: 3,
        h: 6,
      };
      node.id = node.content = String(count.value++);
      grid.addWidget('<div class="grid-stack-item"><div class="grid-stack-item-content"><canvas id="myChart_' + node.id + '"></canvas></div></div>', node);
      
      const canvas = document.getElementById("myChart_" + node.id) as HTMLCanvasElement;
      let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      new Chart(ctx, polarAreaChartData);
    }

    function addNewPieChart() {
      grid.compact();
      const node: any = {
        x: 12,
        y: 5,
        w: 3,
        h: 6,
      };
      node.id = node.content = String(count.value++);
      grid.addWidget('<div class="grid-stack-item"><div class="grid-stack-item-content"><canvas id="myChart_' + node.id + '"></canvas></div></div>', node);
      
      const canvas = document.getElementById("myChart_" + node.id) as HTMLCanvasElement;
      let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      new Chart(ctx, doughnutPieChartData('pie'));
    }

    function addNewDoughnutChart() {
      grid.compact();
      const node: any = {
        x: 12,
        y: 5,
        w: 3,
        h: 6,
      };
      node.id = node.content = String(count.value++);
      grid.addWidget('<div class="grid-stack-item"><div class="grid-stack-item-content"><canvas id="myChart_' + node.id + '"></canvas></div></div>', node);
      
      const canvas = document.getElementById("myChart_" + node.id) as HTMLCanvasElement;
      let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      new Chart(ctx, doughnutPieChartData('doughnut'));
    }

    function addNewBubbleChart() {
      grid.compact();
      const node: any = {
        x: 12,
        y: 5,
        w: 6,
        h: 4,
      };
      node.id = node.content = String(count.value++);
      grid.addWidget('<div class="grid-stack-item"><div class="grid-stack-item-content"><canvas id="myChart_' + node.id + '"></canvas></div></div>', node);
      
      const canvas = document.getElementById("myChart_" + node.id) as HTMLCanvasElement;
      let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      new Chart(ctx, bubbleChartData);
    }

    function addNewLineChart() {
      grid.compact();
      const node: any = {
        x: 12,
        y: 5,
        w: 6,
        h: 4,
      };
      node.id = node.content = String(count.value++);
      grid.addWidget('<div class="grid-stack-item"><div class="grid-stack-item-content"><canvas id="myChart_' + node.id + '"></canvas></div></div>', node);
      
      const canvas = document.getElementById("myChart_" + node.id) as HTMLCanvasElement;
      let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      new Chart(ctx, lineChartData);
    }

    function addNewBarChart() {
      grid.compact();
      const node: any = {
        x: 12,
        y: 5,
        w: 6,
        h: 4,
      };
      node.id = node.content = String(count.value++);
      grid.addWidget('<div class="grid-stack-item"><div class="grid-stack-item-content"><canvas id="myChart_' + node.id + '"></canvas></div></div>', node);
      
      const canvas = document.getElementById("myChart_" + node.id) as HTMLCanvasElement;
      let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      new Chart(ctx, barChartData);
    }

    return {
      info,
      addNewBarChart,
      addNewLineChart,
      addNewBubbleChart,
      addNewDoughnutChart,
      addNewPieChart,
      addNewPolarAreaChart,
      addNewRadarChart,
      addNewScatterChart,
      addNewGaugeChart,
      addNewMaps,
      visible,
      showDrawer,
      activeKey
    };
  }
})
</script>