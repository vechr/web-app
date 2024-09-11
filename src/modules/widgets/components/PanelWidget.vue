<!-- <template>
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
            <a-card @click="selectWidget(EWidget.RADAR)" align="middle">
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
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { widgetSelection as widgetSelectionFunc } from '@/modules/widgets/services/widget/widget-selection';
import { EWidget } from '@/modules/widgets/widget.entity';

const widgetDrawer = useWidgetDrawerStore();
const activeKey = ref(['1', '2']);
const { configVisible, titleConfig, widgetSelection, formState } =
  storeToRefs(widgetDrawer);

function selectWidget(widget: string) {
  configVisible.value = true;
  titleConfig.value =
    widget.charAt(0) + widget.slice(1).toLowerCase() + ' Widget';
  widgetSelection.value = widget;

  // Set WidgetType
  const { widgetType, widgetData } = widgetSelectionFunc(widgetSelection.value);

  // Set Data
  formState.value.widgetType = widgetType;
  formState.value.widgetData = widgetData;
}
</script> -->
