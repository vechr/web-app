<template>
  <a-row>
    <a-col :span="12">
      <a-button type="primary" @click="showDrawer"
        ><PlusOutlined />Widget</a-button
      >
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
    <a-drawer
      v-model:visible="configVisible"
      :title="`${titleConfig} Configuration`"
      width="320"
      :closable="false"
      @close="onConfigClose"
    >
      <a-form
        layout="vertical"
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Topic"
          name="topicId"
          :rules="[{ required: true, message: 'Please select Topic!' }]"
        >
          <a-select
            v-model:value="formState.topicId"
            placeholder="Select a Topic"
            style="width: 100%"
            :options="options"
            @change="handleChange"
            @focus="handleFocus"
          ></a-select>
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :style="{ float: 'right' }"
            >Create Widget</a-button
          >
        </a-form-item>
      </a-form>
    </a-drawer>
    <div class="dashboard-panel">
      <a-collapse v-model:activeKey="activeKey" ghost>
        <a-collapse-panel key="1" header="Chart">
          <a-row>
            <a-col :span="12">
              <a-card @click="addNewBarChart()" align="middle">
                <BarChartOutlined /><br />
                Bar Chart
              </a-card>
            </a-col>
            <a-col :span="12">
              <a-card @click="addNewLineChart()" align="middle">
                <LineChartOutlined /><br />
                Line Chart
              </a-card>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-card @click="addNewBubbleChart()" align="middle">
                <DotChartOutlined /><br />
                Bubble Chart
              </a-card>
            </a-col>
            <a-col :span="12">
              <a-card @click="addNewDoughnutChart()" align="middle">
                <PieChartOutlined /><br />
                Doughnut Chart
              </a-card>
            </a-col>
          </a-row>
          <a-row>
            <a-col @click="addNewPieChart()" :span="12">
              <a-card align="middle">
                <PieChartFilled /><br />
                Pie Chart
              </a-card>
            </a-col>
            <a-col :span="12">
              <a-card @click="addNewPolarAreaChart()" align="middle">
                <PieChartTwoTone /><br />
                Polar Area Chart
              </a-card>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-card @click="addNewRadarChart()" align="middle">
                <RadarChartOutlined /><br />
                Radar Chart
              </a-card>
            </a-col>
            <a-col :span="12">
              <a-card @click="addNewScatterChart()" align="middle">
                <DotChartOutlined /><br />
                Scatter Chart
              </a-card>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-card @click="addNewGaugeChart()" align="middle">
                <DashboardOutlined /><br />
                Gauge
              </a-card>
            </a-col>
          </a-row>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="Location">
          <a-row>
            <a-col :span="12">
              <a-card @click="addNewMaps()" align="middle">
                <EnvironmentOutlined /><br />
                Maps
              </a-card>
            </a-col>
          </a-row>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </a-drawer>
  <section class="grid-stack"></section>
</template>

<script lang="ts">
import {
  EnvironmentOutlined,
  PieChartTwoTone,
  PieChartFilled,
  PlusOutlined,
  BarChartOutlined,
  LineChartOutlined,
  DotChartOutlined,
  PieChartOutlined,
  RadarChartOutlined,
  DashboardOutlined,
} from "@ant-design/icons-vue"
import { defineComponent, onBeforeMount, onMounted, reactive, ref } from "vue"
import { GridStack, GridStackNode } from "gridstack"
import barChartData from "@/types/chart/bar-chart"
import lineChartData from "@/types/chart/line-chart"
import bubbleChartData from "@/types/chart/bubble-chart"
import doughnutPieChartData from "@/types/chart/doughnut-pie-chart"
import polarAreaChartData from "@/types/chart/polar-chart"
import radarChartData from "@/types/chart/radar-chart"
import scatterChartData from "@/types/chart/scatter-chart"
import gaugeChartData from "@/types/chart/gauge-chart"
import { useWidgetStore } from "@/store/widgets/widget"
import uuid from "@/types/uuid"
import { EWidget } from "@/types"
import { SelectProps } from "ant-design-vue"
import { useDashboardManagementStore } from "@/store"
import { storeToRefs } from "pinia"
import { useRoute } from "vue-router"

interface FormState {
  topicId: string
}

export default defineComponent({
  name: "Dashboard",
  components: {
    EnvironmentOutlined,
    DashboardOutlined,
    PieChartTwoTone,
    PieChartFilled,
    PlusOutlined,
    BarChartOutlined,
    LineChartOutlined,
    DotChartOutlined,
    PieChartOutlined,
    RadarChartOutlined,
  },
  setup() {
    const useWidget = useWidgetStore()
    const visible = ref<boolean>(false)

    // Dashboard Data
    const storeDashboard = useDashboardManagementStore()
    const { dataFull } = storeToRefs(storeDashboard)

    // Config Data
    const configVisible = ref<boolean>(false)
    const titleConfig = ref<string>("")
    const widgetSelection = ref<string>("")
    const options = ref<SelectProps["options"]>([])

    // Get Dashboard
    const route = useRoute()
    const dashboardId = route.params.dashboardId

    // On Create
    const onFinish = (values: any) => {
      console.log(values)
      switch (widgetSelection.value) {
        case EWidget.BAR: {
          useWidget.addNewBarChart(grid, uuid(), barChartData)
          break
        }
        case EWidget.BUBBLE: {
          useWidget.addNewBubbleChart(grid, uuid(), bubbleChartData)
          break
        }
        case EWidget.DOUGHNUT: {
          useWidget.addNewDoughnutChart(
            grid,
            uuid(),
            doughnutPieChartData("doughnut")
          )
          break
        }
        case EWidget.PIE: {
          useWidget.addNewPieChart(grid, uuid(), doughnutPieChartData("pie"))
          break
        }
        case EWidget.GAUGE: {
          useWidget.addNewGaugeChart(grid, uuid(), gaugeChartData)
          break
        }
        case EWidget.LINE: {
          useWidget.addNewLineChart(grid, uuid(), lineChartData)
          break
        }
        case EWidget.POLAR: {
          useWidget.addNewPolarAreaChart(grid, uuid(), polarAreaChartData)
          break
        }
        case EWidget.RADAR: {
          useWidget.addNewRadarChart(grid, uuid(), radarChartData)
          break
        }
        case EWidget.SCATTER: {
          useWidget.addNewScatterChart(grid, uuid(), scatterChartData)
          break
        }
        case EWidget.MAPS: {
          useWidget.addNewMaps(grid, uuid())
          break
        }
      }
      configVisible.value = false
      visible.value = false
      formState.topicId = ""
    }

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo)
    }

    const formState = reactive<FormState>({
      topicId: "",
    })

    const handleChange = (value: string) => {
      console.log(`selected ${value}`)
    }

    const onConfigClose = () => {
      formState.topicId = ""
    }

    const handleFocus = () => {
      options.value = dataFull.value
        .find((dashboard) => dashboard.id === dashboardId)
        ?.devices?.map((device) => ({
          label: device.name,
          options: device.topics
            ?.filter((topic) => topic.widgetType === widgetSelection.value)
            .map((topic) => ({
              value: topic.id,
              label: topic.name,
            })),
        }))
    }

    const showDrawer = () => {
      visible.value = true
    }

    const activeKey = ref(["1", "2"])

    onBeforeMount(async () => {
      await storeDashboard.getDashboardFullList()
    })

    let info = ref("")
    let grid: GridStack
    onMounted(() => {
      grid = GridStack.init({
        float: false,
        cellHeight: "70px",
        minRow: 7,
        removable: true,
      })

      grid.on("resizestop", function (event: Event, el: any) {
        let node: GridStackNode = el.gridstackNode
        console.log(node)
      })

      grid.on("added", (event: Event, items: any) => {
        items.forEach(function (node: GridStackNode) {
          console.log(node)
        })
      })

      grid.on("removed", (event: Event, items: any) => {
        items.forEach(function (node: GridStackNode) {
          console.log(node)
        })
      })

      grid.on("dragstop", (_, element: any) => {
        const node = element.gridstackNode
        info.value = `you just dragged node #${node.id} to ${node.x},${node.y} – good job!`
        console.log(node)
      })
    })

    function addNewMaps() {
      configVisible.value = true
      titleConfig.value = "Maps"
      widgetSelection.value = EWidget.MAPS
    }

    function addNewGaugeChart() {
      configVisible.value = true
      titleConfig.value = "Gauge Chart"
      widgetSelection.value = EWidget.GAUGE
    }

    function addNewScatterChart() {
      configVisible.value = true
      titleConfig.value = "Scatter Chart"
      widgetSelection.value = EWidget.SCATTER
    }

    function addNewRadarChart() {
      configVisible.value = true
      titleConfig.value = "Radar Chart"
      widgetSelection.value = EWidget.RADAR
    }

    function addNewPolarAreaChart() {
      configVisible.value = true
      titleConfig.value = "Polar Chart"
      widgetSelection.value = EWidget.POLAR
    }

    function addNewPieChart() {
      configVisible.value = true
      titleConfig.value = "Pie Chart"
      widgetSelection.value = EWidget.PIE
    }

    function addNewBubbleChart() {
      configVisible.value = true
      titleConfig.value = "Bubble Chart"
      widgetSelection.value = EWidget.BUBBLE
    }

    function addNewLineChart() {
      configVisible.value = true
      titleConfig.value = "Line Chart"
      widgetSelection.value = EWidget.LINE
    }

    function addNewBarChart() {
      configVisible.value = true
      titleConfig.value = "Bar Chart"
      widgetSelection.value = EWidget.BAR
    }

    function addNewDoughnutChart() {
      configVisible.value = true
      titleConfig.value = "Doughnut Chart"
      widgetSelection.value = EWidget.DOUGHNUT
    }

    return {
      onConfigClose,
      handleFocus,
      onFinishFailed,
      onFinish,
      formState,
      handleChange,
      options,
      titleConfig,
      configVisible,
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
      activeKey,
    }
  },
})
</script>
