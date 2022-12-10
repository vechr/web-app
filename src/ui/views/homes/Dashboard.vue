<template>
  <a-row>
    <a-col :span="12">
      <a-button
        type="primary"
        v-if="can('widgets:create@auth', 'any')"
        @click="showDrawer"
        ><PlusOutlined />Widget</a-button
      >
    </a-col>
    <a-col style="text-align: right" :span="12">
      <h2 class="title-dashboard">
        {{ dataFull.find((val) => val.id === dashboardId)?.name }}
      </h2>
    </a-col>
    <a-col :span="24" class="option-dashboard">
      <a-space>
        <a-switch
          v-if="can('widgets:update@auth', 'any')"
          v-model:checked="enableMove"
          checked-children="Draggable"
          un-checked-children="Undraggable"
        />
        <a-switch
          v-if="can('widgets:update@auth', 'any')"
          v-model:checked="enableResize"
          checked-children="Resizeable"
          un-checked-children="Unresizeable"
        />
      </a-space>
      <a-tooltip title="Drag widget here to remove" :color="'volcano'">
        <delete-outlined class="option-dashboard-trash" />
      </a-tooltip>
    </a-col>
  </a-row>
  <DrawerWidget />
  <section class="grid-stack"></section>
</template>

<script lang="ts">
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import {
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue';
import { GridStack, GridStackNode } from 'gridstack';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { connect, NatsConnection, StringCodec } from 'nats.ws';
import { message as notif } from 'ant-design-vue';
import { useAbility } from '@casl/vue';
import { useLoggingStore, useWidgetStore } from '@/ui/store';
import { EWidget, IWidget } from '@/domain';
import { useDashboardManagementStore, useWidgetDrawerStore } from '@/ui/store';
import { widgetGenerator, widgetSubscription } from '@/services';
import DrawerWidget from '@/ui/components/homes/DrawerWidget.vue';

export default defineComponent({
  name: 'Dashboard',
  components: {
    PlusOutlined,
    DrawerWidget,
    DeleteOutlined,
  },
  setup() {
    const ability = useAbility();

    let nc: NatsConnection;
    const storeLogging = useLoggingStore();
    const { statusConnection } = storeToRefs(storeLogging);

    const enableMove = ref<boolean>(false);
    const enableResize = ref<boolean>(false);

    const widgetDrawer = useWidgetDrawerStore();
    const { grid, visible } = storeToRefs(widgetDrawer);

    // Dashboard Data
    const storeDashboard = useDashboardManagementStore();
    const { dataFull } = storeToRefs(storeDashboard);

    // Widget Data
    const storeWidget = useWidgetStore();
    const { data } = storeToRefs(storeWidget);

    // Get Dashboard
    const route = useRoute();
    const dashboardId = route.params.dashboardId;
    widgetDrawer.setDashboardId(dashboardId);

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    const showDrawer = () => {
      visible.value = true;
    };

    const activeKey = ref(['1', '2']);

    onBeforeMount(async () => {
      await storeDashboard.getDashboardFullList();
      await storeWidget
        .getAllWidgets(typeof dashboardId === 'string' ? dashboardId : '')
        .then(async () => {
          data.value.forEach((element) => {
            widgetGenerator(grid.value as GridStack, element); // Generate Widget
          });
          try {
            const server = { servers: [import.meta.env.APP_NATS_WS] };
            nc = await connect(server);
            const sc = StringCodec();
            const dashboard = dataFull.value.find(
              (val) => val.id === dashboardId,
            );
            if (!dashboard) return;
            dashboard.devices?.forEach((device) => {
              device.topics?.forEach((topic) => {
                // Print subject when in develpment mode
                if (import.meta.env.MODE === 'development') {
                  console.log(
                    `Vechr.DashboardID.${dashboardId}.DeviceID.${
                      device.id
                    }.TopicID.${topic.id}.Topic${topic.name.replace(
                      /\//g,
                      '.',
                    )}`,
                  );
                }
                nc.subscribe(
                  `Vechr.DashboardID.${dashboardId}.DeviceID.${
                    device.id
                  }.TopicID.${topic.id}.Topic${topic.name.replace(/\//g, '.')}`,
                  {
                    callback: (err: any, msg: any) => {
                      if (data.value.length === 0) return;
                      data.value
                        .filter(
                          (val) =>
                            val.dashboardId === dashboard?.id &&
                            val.topicId === topic.id &&
                            val.topic.deviceId === device.id,
                        )
                        .forEach((element) => {
                          // Widget doing subscription in here!
                          widgetSubscription(element, msg);
                        });
                      if (err) notif.error(err);
                    },
                  },
                );
              });
            });

            nc.subscribe(`${dashboardId}.status.connection`, {
              callback: (err: any, msg: any) => {
                statusConnection.value.message = sc.decode(msg.data);
                if (statusConnection.value.process == 'Start') {
                  notif.success(statusConnection.value.message);
                  statusConnection.value.process = 'Finished';
                }
                if (err) notif.error(err);
              },
            });

            nc.publish(
              `${dashboardId}.status.connection`,
              sc.encode('Connected to the server'),
            );
            statusConnection.value.process = 'Start';
          } catch (error) {
            notif.error("Server can't be reached!");
          }
        });
    });

    onBeforeUnmount(async () => {
      try {
        await nc.close();
        notif.info('Connection closed!');
      } catch {
        notif.error('Server error while close the connection!');
      }
    });

    watch(enableMove, () => {
      grid.value.enableMove(enableMove.value);
    });

    watch(enableResize, () => {
      grid.value.enableResize(enableResize.value);
    });

    const info = ref('');
    onMounted(() => {
      widgetDrawer.setGrid(
        GridStack.init({
          float: false,
          cellHeight: '70px',
          minRow: 24,
          removable: '.option-dashboard-trash',
          disableDrag: true,
          acceptWidgets: true,
        }),
      );

      grid.value.enableResize(false);

      grid.value.on('removed', (_: Event, items: any) => {
        items.forEach(async (node: GridStackNode) => {
          const preDelete: IWidget | undefined = data.value.find(
            (val) => val.nodeId === node.id,
          );
          if (preDelete !== undefined) {
            await storeWidget.deleteWidgetById(
              typeof dashboardId === 'string' ? dashboardId : '',
              preDelete.id,
            );
          }
        });
      });

      grid.value.on('change', (_: Event, items: any) => {
        items.forEach(async (node: GridStackNode) => {
          const preDelete: IWidget | undefined = data.value.find(
            (val) => val.nodeId === node.id,
          );
          if (preDelete !== undefined) {
            await storeWidget.updateWidgetById(
              typeof dashboardId === 'string' ? dashboardId : '',
              preDelete.id,
              {
                name: preDelete.name,
                description: preDelete.description,
                node: {
                  x: node.x !== undefined ? node.x : 0,
                  y: node.y !== undefined ? node.y : 0,
                  w: node.w !== undefined ? node.w : 0,
                  h: node.h !== undefined ? node.h : 0,
                  id: preDelete.node.id,
                  content: preDelete.node.content,
                },
                widgetData: preDelete.widgetData,
                shiftData: preDelete.shiftData,
              },
            );
          }
        });
      });
    });

    return {
      can: ability.can.bind(ability),
      enableResize,
      dashboardId,
      dataFull,
      enableMove,
      EWidget,
      onFinishFailed,
      info,
      visible,
      showDrawer,
      activeKey,
      grid,
    };
  },
});
</script>
