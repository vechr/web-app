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
    @after-visible-change="afterVisibleChange"
  >
  <div class="dashboard-panel">
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
  </div>
  </a-drawer>
  <section class="grid-stack">
  </section>
</template>

<script lang="ts">
import { PieChartTwoTone, PieChartFilled, PlusOutlined, BarChartOutlined, LineChartOutlined, DotChartOutlined, PieChartOutlined, RadarChartOutlined } from "@ant-design/icons-vue";
import { defineComponent, onMounted, ref } from "vue";
import { GridStack } from 'gridstack';
import Chart from 'chart.js/auto';
import barChartData from '@/types/chart/bar-chart';
import lineChartData from '@/types/chart/line-chart';
import bubbleChartData from '@/types/chart/bubble-chart';
import doughnutPieChartData from '@/types/chart/doughnut-pie-chart';
import polarAreaChartData from '@/types/chart/polar-chart';
import radarChartData from '@/types/chart/radar-chart';
import scatterChartData from '@/types/chart/scatter-chart';

export default defineComponent({
  name: 'Dashboard',
  components: { PieChartTwoTone, PieChartFilled, PlusOutlined, BarChartOutlined, LineChartOutlined, DotChartOutlined, PieChartOutlined, RadarChartOutlined },
  setup () {
    const visible = ref<boolean>(false);

    const afterVisibleChange = (bool: boolean) => {
      console.log('visible', bool);
    };

    const showDrawer = () => {
      visible.value = true;
    };

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
      visible,
      afterVisibleChange,
      showDrawer,
    };
  }
})
</script>