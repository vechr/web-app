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
import { GridStack, GridStackNode } from 'gridstack';
import barChartData from '@/types/chart/bar-chart';
import lineChartData from '@/types/chart/line-chart';
import bubbleChartData from '@/types/chart/bubble-chart';
import doughnutPieChartData from '@/types/chart/doughnut-pie-chart';
import polarAreaChartData from '@/types/chart/polar-chart';
import radarChartData from '@/types/chart/radar-chart';
import scatterChartData from '@/types/chart/scatter-chart';
import gaugeChartData from '@/types/chart/gauge-chart';
import { useWidgetStore } from "@/store/widgets/widget";
import uuid from '@/types/uuid'

export default defineComponent({
  name: 'Dashboard',
  components: { EnvironmentOutlined, DashboardOutlined, PieChartTwoTone, PieChartFilled, PlusOutlined, BarChartOutlined, LineChartOutlined, DotChartOutlined, PieChartOutlined, RadarChartOutlined },
  setup () {
    const useWidget = useWidgetStore()
    const visible = ref<boolean>(false);

    const showDrawer = () => {
      visible.value = true;
    };

    const activeKey = ref(['1', '2']);

    let info = ref("");
    let grid: GridStack;
    onMounted(() => {
      grid = GridStack.init({
        float: false,
        cellHeight: "70px",
        minRow: 7,
        removable: true
      });

      grid.on('resizestop', function(event: Event, el: any) {
        let node: GridStackNode = el.gridstackNode;
        console.log(node);
      });

      grid.on('added', (event: Event, items: any) => {
        items.forEach(function(node: GridStackNode) {
          console.log(node);
        });
      });

      grid.on("removed", (event: Event, items: any) => {
        items.forEach(function(node: GridStackNode) {
          console.log(node)
        });
      });

      grid.on("dragstop", (_, element: any) => {
        const node = element.gridstackNode;
        info.value = `you just dragged node #${node.id} to ${node.x},${node.y} – good job!`;
        console.log(node)
      });
    });

    function addNewMaps() {
      useWidget.addNewMaps(grid, uuid())
    }

    function addNewGaugeChart() {
      useWidget.addNewGaugeChart(grid, uuid(), gaugeChartData)
    }

    function addNewScatterChart() {
      useWidget.addNewScatterChart(grid, uuid(), scatterChartData)
    }

    function addNewRadarChart() {
      useWidget.addNewRadarChart(grid, uuid(), radarChartData)
    }

    function addNewPolarAreaChart() {
      useWidget.addNewPolarAreaChart(grid, uuid(), polarAreaChartData)
    }

    function addNewPieChart() {
      useWidget.addNewPieChart(grid, uuid(), doughnutPieChartData('pie'))
    }

    function addNewBubbleChart() {
      useWidget.addNewBubbleChart(grid, uuid(), bubbleChartData)
    }

    function addNewLineChart() {
      useWidget.addNewLineChart(grid, uuid(), lineChartData)
    }

    function addNewBarChart() {
      useWidget.addNewBarChart(grid, uuid(), barChartData)
    }

    function addNewDoughnutChart() {
      useWidget.addNewDoughnutChart(grid, uuid(), doughnutPieChartData('doughnut'))
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