<template>
  <a-drawer
    v-model:open="isOpen"
    style="color: red"
    title="Dashboard Widget"
    placement="right"
  >
    <FormWidget
      ref="formWidgetRef"
      :title-config="titleConfig"
      :widget-selection="widgetSelection"
      :dashboard-id="dashboardId"
      :widget-type="widgetType"
      :grid="grid"
      :widget-data="widgetData"
    />
    <div class="dashboard-panel">
      <a-collapse v-model:activeKey="activeKey" ghost>
        <a-collapse-panel key="1" header="Chart" class="dashboard-panel-widget">
          <a-card @click="selectWidget(EWidget.BAR)" align="middle">
            <BarChartOutlined /><br />
            Bar Chart
          </a-card>
          <a-card @click="selectWidget(EWidget.LINE)" align="middle">
            <LineChartOutlined /><br />
            Line Chart
          </a-card>
          <a-card @click="selectWidget(EWidget.BUBBLE)" align="middle">
            <DotChartOutlined /><br />
            Bubble Chart
          </a-card>
          <a-card @click="selectWidget(EWidget.DOUGHNUT)" align="middle">
            <PieChartOutlined /><br />
            Doughnut Chart
          </a-card>
          <a-card @click="selectWidget(EWidget.PIE)" align="middle">
            <PieChartFilled /><br />
            Pie Chart
          </a-card>
          <a-card @click="selectWidget(EWidget.POLAR)" align="middle">
            <PieChartTwoTone /><br />
            Polar Area Chart
          </a-card>
          <a-card @click="selectWidget(EWidget.RADAR)" align="middle">
            <RadarChartOutlined /><br />
            Radar Chart
          </a-card>
          <a-card @click="selectWidget(EWidget.SCATTER)" align="middle">
            <DotChartOutlined /><br />
            Scatter Chart
          </a-card>
          <a-card @click="selectWidget(EWidget.GAUGE)" align="middle">
            <DashboardOutlined /><br />
            Gauge
          </a-card>
        </a-collapse-panel>
        <a-collapse-panel
          key="2"
          header="Location"
          class="dashboard-panel-widget"
        >
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
</template>

<script lang="ts" setup>
import {
  EnvironmentOutlined,
  PieChartTwoTone,
  PieChartFilled,
  BarChartOutlined,
  LineChartOutlined,
  DotChartOutlined,
  PieChartOutlined,
  RadarChartOutlined,
  DashboardOutlined,
} from '@ant-design/icons-vue';
import { ref, toRefs } from 'vue';
import { widgetSelection as widgetSelectionFunc } from '@/modules/widgets/services';
import { EWidget } from '@/modules/widgets/widget.entity';
import FormWidget from '@/modules/dashboards/components/FormWidget.vue';

const propsUnReactive = defineProps({
  dashboardId: {
    type: String,
    required: true,
  },
  grid: {
    required: true,
  },
});
const { dashboardId } = toRefs(propsUnReactive);

const isOpen = ref(false);
const titleConfig = ref('');
const widgetSelection = ref('');
const widgetType = ref('');
const widgetData = ref<any>({});
const activeKey = ref(['1', '2']);

const formWidgetRef = ref();

const showPanelWidget = () => {
  isOpen.value = true;
};

defineExpose({ showPanelWidget });

function selectWidget(widget: string) {
  // show form Widget
  formWidgetRef.value.showFormWidget();

  // configVisible.value = true;
  titleConfig.value =
    widget.charAt(0) + widget.slice(1).toLowerCase() + ' Widget';
  widgetSelection.value = widget;

  // Set WidgetType
  const result = widgetSelectionFunc(widgetSelection.value);

  // Set Data
  widgetType.value = result.widgetType;
  widgetData.value = result.widgetData;
}
</script>
