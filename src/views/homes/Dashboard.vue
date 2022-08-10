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
          label="Name"
          name="name"
          :rules="[{ required: true, message: 'Please input name widget!' }]"
        >
          <a-input v-model:value="formState.name" />
        </a-form-item>

        <a-form-item
          label="Description"
          name="description"
          :rules="[{ required: true, message: 'Please input description!' }]"
        >
          <a-textarea v-model:value="formState.description" />
        </a-form-item>

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
            @focus="handleFocus"
          ></a-select>
        </a-form-item>

        <a-form-item
          label="Hidden"
          name="hidden"
        >
          <a-switch v-model:checked="formState.hidden" checked-children="Hidden" un-checked-children="Not Hidden " />
        </a-form-item>

        <a-form-item
          label="Persistance"
          name="persistance"
        >
          <a-switch v-model:checked="formState.persistance" checked-children="Persistance" un-checked-children="Not Persistance" />
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
              <a-card @click="selectWidget(EWidget.BAR)" align="middle">
                <BarChartOutlined /><br />
                Bar Chart
              </a-card>
            </a-col>
            <a-col :span="12">
              <a-card @click="selectWidget(EWidget.LINE)" align="middle">
                <LineChartOutlined /><br />
                Line Chart
              </a-card>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-card @click="selectWidget(EWidget.BUBBLE)" align="middle">
                <DotChartOutlined /><br />
                Bubble Chart
              </a-card>
            </a-col>
            <a-col :span="12">
              <a-card @click="selectWidget(EWidget.DOUGHNUT)" align="middle">
                <PieChartOutlined /><br />
                Doughnut Chart
              </a-card>
            </a-col>
          </a-row>
          <a-row>
            <a-col @click="selectWidget(EWidget.PIE)" :span="12">
              <a-card align="middle">
                <PieChartFilled /><br />
                Pie Chart
              </a-card>
            </a-col>
            <a-col :span="12">
              <a-card @click="selectWidget(EWidget.POLAR)" align="middle">
                <PieChartTwoTone /><br />
                Polar Area Chart
              </a-card>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-card @click="selectWidget(EWidget.POLAR)" align="middle">
                <RadarChartOutlined /><br />
                Radar Chart
              </a-card>
            </a-col>
            <a-col :span="12">
              <a-card @click="selectWidget(EWidget.SCATTER)" align="middle">
                <DotChartOutlined /><br />
                Scatter Chart
              </a-card>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-card @click="selectWidget(EWidget.GAUGE)" align="middle">
                <DashboardOutlined /><br />
                Gauge
              </a-card>
            </a-col>
          </a-row>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="Location">
          <a-row>
            <a-col :span="12">
              <a-card @click="selectWidget(EWidget.MAPS)" align="middle">
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
} from '@ant-design/icons-vue';
import { defineComponent, onBeforeMount, onMounted, reactive, ref } from 'vue';
import { GridStack, GridStackNode } from 'gridstack';
import { useWidgetStore } from '@/store/widgets/widget';
import uuid from '@/types/uuid';
import { EWidget, IFormWidget } from '@/types';
import { SelectProps } from 'ant-design-vue';
import { useDashboardManagementStore } from '@/store';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { BarChartWidget, DoughnutChartWidget, GaugeChartWidget, BubbleChartWidget, LineChartWidget, PieChartWidget, PolarChartWidget, RadarChartWidget, ScatterChartWidget } from '@/helpers/widgets/charts/index';
import { MapWidget } from '@/helpers/widgets/maps/index';
export default defineComponent({
  name: 'Dashboard',
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
    const visible = ref<boolean>(false);

    // Dashboard Data
    const storeDashboard = useDashboardManagementStore();
    const { dataFull } = storeToRefs(storeDashboard);

    // Widget Data
    const storeWidget = useWidgetStore();

    // Config Data
    const configVisible = ref<boolean>(false);
    const titleConfig = ref<string>('');
    const widgetSelection = ref<string>('');
    const options = ref<SelectProps['options']>([]);

    // Get Dashboard
    const route = useRoute();
    const dashboardId = route.params.dashboardId;

    // On Create
    const onFinish = (values: { topicId: string }) => {
      formState.topicId = values.topicId
      formState.dashboardId = typeof dashboardId === 'string' ? dashboardId : ''

      switch (widgetSelection.value) {
        case EWidget.BAR: {
          formState.widgetType = EWidget.BAR
          bar.addChart(grid, uuid(), formState)
          break;
        }
        case EWidget.BUBBLE: {
          formState.widgetType = EWidget.BUBBLE
          bubble.addChart(grid, uuid(), formState)
          break;
        }
        case EWidget.DOUGHNUT: {
          formState.widgetType = EWidget.DOUGHNUT
          doughnut.addChart(grid, uuid(), formState)
          break;
        }
        case EWidget.PIE: {
          formState.widgetType = EWidget.PIE
          pie.addChart(grid, uuid(), formState)
          break;
        }
        case EWidget.GAUGE: {
          formState.widgetType = EWidget.GAUGE
          gauge.addChart(grid, uuid(), formState)
          break;
        }
        case EWidget.LINE: {
          formState.widgetType = EWidget.LINE
          line.addChart(grid, uuid(), formState)
          break;
        }
        case EWidget.POLAR: {
          formState.widgetType = EWidget.POLAR
          polar.addChart(grid, uuid(), formState)
          break;
        }
        case EWidget.RADAR: {
          formState.widgetType = EWidget.RADAR
          radar.addChart(grid, uuid(), formState)
          break;
        }
        case EWidget.SCATTER: {
          formState.widgetType = EWidget.SCATTER
          scatter.addChart(grid, uuid(), formState)
          break;
        }
        case EWidget.MAPS: {
          formState.widgetType = EWidget.MAPS
          map.addMap(grid, uuid(), formState)
          break;
        }
      }
      configVisible.value = false;
      visible.value = false;

      formState.topicId = '';
      formState.name = '';
      formState.description = '';
      formState.hidden = false;
      formState.persistance = false;
      formState.widgetType = '';
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    const formState = reactive<IFormWidget>({
      topicId: '',
      name: '',
      description: '',
      hidden: false,
      persistance: false,
      dashboardId: typeof dashboardId === 'string' ? dashboardId : '',
      widgetType: ''
    });

    const onConfigClose = () => {
      formState.topicId = '';
    };

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
        }));
    };

    const showDrawer = () => {
      visible.value = true;
    };

    const activeKey = ref(['1', '2']);

    onBeforeMount(async () => {
      await storeDashboard.getDashboardFullList();
      await storeWidget.getAllWidgets(typeof dashboardId === 'string' ? dashboardId : '',);
    });

    let info = ref('');
    let grid: GridStack;
    onMounted(() => {
      grid = GridStack.init({
        float: false,
        cellHeight: '70px',
        minRow: 7,
        removable: true,
      });

      grid.on('resizestop', function (event: Event, el: any) {
        let node: GridStackNode = el.gridstackNode;
        console.log(node);
      });

      grid.on('added', (event: Event, items: any) => {
        items.forEach(function (node: GridStackNode) {
          console.log(node);
        });
      });

      grid.on('removed', (event: Event, items: any) => {
        items.forEach(function (node: GridStackNode) {
          console.log(node);
        });
      });

      grid.on('dragstop', (_, element: any) => {
        const node = element.gridstackNode;
        info.value = `you just dragged node #${node.id} to ${node.x},${node.y} – good job!`;
        console.log(node);
      });
    });

    function selectWidget(widget: string) {
      configVisible.value = true;
      titleConfig.value = widget.charAt(0) + widget.slice(1).toLowerCase() + ' Widget';
      widgetSelection.value = widget;
    }

    return {
      EWidget,
      selectWidget,
      onConfigClose,
      handleFocus,
      onFinishFailed,
      onFinish,
      formState,
      options,
      titleConfig,
      configVisible,
      info,
      visible,
      showDrawer,
      activeKey,
    };
  },
});
</script>
