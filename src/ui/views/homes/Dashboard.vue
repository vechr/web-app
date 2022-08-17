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
      class="configurator"
      :title="`${titleConfig} Configuration`"
      width="90%"
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
          v-if="widgetSelection !== EWidget.MAPS"
          label="Chart Configuration"
          name="widgetData"
          :rules="[
            { required: true, message: 'Please input configuration Chart!' },
          ]"
        >
          <vue-jsoneditor
            height="600" 
            :mode="'text'"
            :fullWidthButton="false"
            v-model:json="formState.widgetData" 
            @change="onChange"
          />
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
import vueJsoneditor from 'vue3-ts-jsoneditor';
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
import { defineComponent, onBeforeMount, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { GridStack, GridStackNode } from 'gridstack';
import { useLoggingStore, useWidgetStore } from '@/ui/store';
import uuid from '@/utils/uuid';
import { EWidget, IFormWidget, IWidget } from '@/domain';
import { SelectProps } from 'ant-design-vue';
import { useDashboardManagementStore } from '@/ui/store';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { BarChartWidget, DoughnutChartWidget, GaugeChartWidget, BubbleChartWidget, LineChartWidget, PieChartWidget, PolarChartWidget, RadarChartWidget, ScatterChartWidget, WidgetValidationService, afterDrawCallback } from '@/services';
import { MapWidget, WidgetService } from '@/services';
import { barChartData, bubbleChartData, doughnutPieChartData, gaugeChartData, lineChartData, polarAreaChartData, radarChartData, scatterChartData } from '@/services';
import { isJsonString } from '@/utils/jsonCheck';
import L from 'leaflet';
import { dataBuilder } from '@/services';
import { connect, NatsConnection, StringCodec } from 'nats.ws';
import { message as notif } from 'ant-design-vue';

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
    vueJsoneditor,
  },
  setup() {
    let nc: NatsConnection;
    const storeLogging = useLoggingStore();
    const { statusConnection } =
      storeToRefs(storeLogging);
    
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
    const { data } = storeToRefs(storeWidget)

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
      widgetType: '',
      widgetData: {}
    });

    const onChange = (value: any) => {
      if (isJsonString(value.text)) {
        formState.widgetData = JSON.parse(value.text)
      }
    }

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
      await storeWidget.getAllWidgets(typeof dashboardId === 'string' ? dashboardId : '').then(async () => {
        data.value.forEach(element => {
          if (element.widgetType === EWidget.MAPS) {
            WidgetService.generateMap(grid, element.node, element.nodeId, element.name)
          } else if (element.widgetType === EWidget.GAUGE) {
            element.widgetData.plugins = [
              {
                afterDraw: afterDrawCallback
              },
            ]
            WidgetService.generateChart(grid, element.nodeId, element.widgetData, element.node, element.name)
          } else {
            WidgetService.generateChart(grid, element.nodeId, element.widgetData, element.node, element.name)
          }
        });
        try {
          const server = { servers: [import.meta.env.VUE_APP_NATS_WS] };
          nc = await connect(server);
          const sc = StringCodec();
          let dashboard = dataFull.value.find(val => val.id === dashboardId);
          if (!dashboard) return;
          dashboard.devices?.forEach(device => {
            device.topics?.forEach((topic) => {
              // console.log(`kreMES.DashboardID.${dashboardId}.DeviceID.${device.id}.TopicID.${topic.id}.Topic${topic.name.replace(/\//g, '.')}`)
              nc.subscribe(`kreMES.DashboardID.${dashboardId}.DeviceID.${device.id}.TopicID.${topic.id}.Topic${topic.name.replace(/\//g, '.')}`, {
                callback: (err: any, msg: any) => {
                  if (data.value.length === 0) return;
                  data.value.filter(val => val.dashboardId === dashboard?.id && val.topicId === topic.id && val.topic.deviceId === device.id).forEach(element => {
                    if (element.widgetType !== undefined) {
                      if (
                        validationTopic.validation(
                          element.widgetType,
                          sc.decode(msg.data)
                        )
                      ) {
                        if (element.widgetType === EWidget.MAPS) {
                          if ( WidgetService.componentWidget['map_' + element.nodeId] !== undefined ) {
                            let marker = WidgetService.componentWidget['map_' + element.nodeId]
                            var newLatLng = new L.LatLng(JSON.parse(sc.decode(msg.data)).latitude, JSON.parse(sc.decode(msg.data)).longitude);
                            marker.setLatLng(newLatLng)
                          }
                        } else if (element.widgetType === EWidget.GAUGE) {
                          if ( WidgetService.componentWidget['myChart_' + element.nodeId] !== undefined ) {
                            WidgetService.componentWidget['myChart_' + element.nodeId].data.datasets.forEach((dataset: any) => {
                              dataset.needleValue = JSON.parse(sc.decode(msg.data));
                            });
                            WidgetService.componentWidget['myChart_' + element.nodeId].update();
                          }
                        } else {
                          if ( WidgetService.componentWidget['myChart_' + element.nodeId] !== undefined ) {
                            WidgetService.componentWidget['myChart_' + element.nodeId].data.datasets.forEach((dataset: any) => {
                              dataset.data = dataBuilder(dataset.data, JSON.parse(sc.decode(msg.data)), true)
                            });
                          WidgetService.componentWidget['myChart_' + element.nodeId].update();
                          }
                        }
                      }
                    }
                  })
                  if (err) notif.error(err)
                }
              });
            });
          });
          

          nc.subscribe(`${dashboardId}.status.connection`, {
            callback: (err: any, msg: any) => {
              statusConnection.value.message = sc.decode(msg.data);
              if (statusConnection.value.process == 'Start') {
                notif.success(statusConnection.value.message);
                statusConnection.value.process = 'Finished';
              }
              if (err) notif.error(err)
            },
          });

          nc.publish(
            `${dashboardId}.status.connection`,
            sc.encode(
              'Connected to the server'
            )
          );
          statusConnection.value.process = 'Start';
        } catch (error) {
          notif.error('Server can\'t be reached!');
        }
      });
    });

    const validationTopic = new WidgetValidationService();

    onBeforeUnmount(async () => {
      try {
        await nc.close();
        notif.info('Connection closed!');
      } catch {
        notif.error('Server error while close the connection!');
      }
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

      grid.on('removed', (_: Event, items: any) => {
        items.forEach(async (node: GridStackNode) => {
          const preDelete: IWidget | undefined = data.value.find(val => val.nodeId === node.id)
          if(preDelete !== undefined) {
            await storeWidget.deleteWidgetById(typeof dashboardId === 'string' ? dashboardId : '', preDelete.id)
          }
        });
      });

      grid.on('change', (_: Event, items: any) => {
        items.forEach(async (node: GridStackNode) => {
          const preDelete: IWidget | undefined = data.value.find(val => val.nodeId === node.id)
          if(preDelete !== undefined) {
            await storeWidget.updateWidgetById(typeof dashboardId === 'string' ? dashboardId : '', preDelete.id, {
              name: preDelete.name,
              description: preDelete.description,
              node: {
                x: node.x !== undefined ? node.x : 0,
                y: node.y !== undefined ? node.y : 0,
                w: node.w !== undefined ? node.w : 0,
                h: node.h !== undefined ? node.h : 0,
                id: preDelete.node.id,
                content: preDelete.node.content
              },
              widgetData: preDelete.widgetData,
              hidden: preDelete.hidden,
              persistance: preDelete.persistance
            })
          }
        });
      });
    });

    function selectWidget(widget: string) {
      configVisible.value = true;
      titleConfig.value = widget.charAt(0) + widget.slice(1).toLowerCase() + ' Widget';
      widgetSelection.value = widget;

      switch (widgetSelection.value) {
        case EWidget.BAR: {
          formState.widgetData = barChartData
          break;
        }
        case EWidget.BUBBLE: {
          formState.widgetData = bubbleChartData
          break;
        }
        case EWidget.DOUGHNUT: {
          formState.widgetData = doughnutPieChartData('doughnut')
          break;
        }
        case EWidget.PIE: {
          formState.widgetData = doughnutPieChartData('pie')
          break;
        }
        case EWidget.GAUGE: {
          formState.widgetData = gaugeChartData
          break;
        }
        case EWidget.LINE: {
          formState.widgetData = lineChartData
          break;
        }
        case EWidget.POLAR: {
          formState.widgetData = polarAreaChartData
          break;
        }
        case EWidget.RADAR: {
          formState.widgetData = radarChartData
          break;
        }
        case EWidget.SCATTER: {
          formState.widgetData = scatterChartData
          break;
        }
        case EWidget.MAPS: {
          formState.widgetData = {latitude: 40.731253, longitude: -73.996139}
          break;
        }
      }
    }

    return {
      onChange,
      widgetSelection,
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
