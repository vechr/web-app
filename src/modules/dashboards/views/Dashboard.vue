<template>
  <div class="dashboard">
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
          {{ dashboards.find((val) => val.id === dashboardId)?.name }}
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
    <DrawerWidget
      ref="panelWidgetRef"
      :dashboard-id="dashboardId"
      :grid="grid"
    />
    <section class="grid-stack"></section>
  </div>
</template>

<script lang="ts" setup>
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { GridStack, GridStackNode } from 'gridstack';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import {
  connect,
  ConnectionOptions,
  NatsConnection,
  StringCodec,
} from 'nats.ws';
import { message as notif } from 'ant-design-vue';
import { useAbility } from '@casl/vue';
import { useDashboardStore } from '../dashboard.store';
import {
  widgetGenerator,
  widgetSubscription,
} from '@/modules/widgets/services';
import DrawerWidget from '@/modules/dashboards/components/PanelWidget.vue';
import { useLoggingStore } from '@/modules/logging/logging.store';
import { useWidgetStore } from '@/modules/widgets/widget.store';
import { Widget } from '@/modules/widgets/widget.entity';
import { SessionUsecase } from '@/core/modules/sessions/session.usecase';

const can = useAbility().can;
const panelWidgetRef = ref();

let nc: NatsConnection;
const storeLogging = useLoggingStore();
const { statusConnection } = storeToRefs(storeLogging);

const enableMove = ref<boolean>(false);
const enableResize = ref<boolean>(false);

const grid = ref<GridStack>();

// Dashboard Data
const dashboardStore = useDashboardStore();
const { dashboards } = storeToRefs(dashboardStore);

// Widget Data
const widgetStore = useWidgetStore();
const { widgets } = storeToRefs(widgetStore);

// Get Dashboard
const route = useRoute();
const dashboardId = route.params.dashboardId as string;

const showDrawer = () => {
  panelWidgetRef.value.showPanelWidget();
};

onBeforeMount(async () => {
  dashboards.value = await dashboardStore.usecase.getDashboardDetails();
  await widgetStore.usecase
    .getAllWidgetByDashboardId(
      typeof dashboardId === 'string' ? dashboardId : '',
    )
    .then(async (data) => {
      // set the result!
      widgets.value = data;

      // Generate Widget
      widgets.value.forEach((element) => {
        widgetGenerator(grid.value as GridStack, element);
      });

      try {
        const server: ConnectionOptions = {
          servers: [
            SessionUsecase.getSettingLocalStorage().natsProtocol +
              SessionUsecase.getSettingLocalStorage().natsServer,
          ],
          user: SessionUsecase.getSettingLocalStorage().natsUsername,
          pass: SessionUsecase.getSettingLocalStorage().natsPassword,
        };
        nc = await connect(server);
        const sc = StringCodec();
        const dashboard = dashboards.value.find(
          (val) => val.id === dashboardId,
        );
        if (!dashboard) return;
        dashboard.devices?.forEach((deviceDashboard) => {
          deviceDashboard.device.topics?.forEach((topic) => {
            /**
             * Print subject when in develpment mode
             */
            if (import.meta.env.MODE === 'development') {
              console.log(
                `Vechr.DashboardID.${dashboardId}.DeviceID.${
                  deviceDashboard.device.id
                }.TopicID.${topic.id}.Topic${topic.name.replace(/\//g, '.')}`,
              );
            }

            /**
             * Subscribes to the subject nats!
             */
            nc.subscribe(
              `Vechr.DashboardID.${dashboardId}.DeviceID.${
                deviceDashboard.device.id
              }.TopicID.${topic.id}.Topic${topic.name.replace(/\//g, '.')}`,
              {
                callback: (err: any, msg: any) => {
                  if (data.length === 0) return;
                  data
                    .filter(
                      (val) =>
                        val.dashboardId === dashboard?.id &&
                        val.topicId === topic.id &&
                        val.topic.deviceId === deviceDashboard.device.id,
                    )
                    .forEach((element) => {
                      /**
                       * Widget doing subscription in here!
                       */
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
  grid.value?.enableMove(enableMove.value);
});

watch(enableResize, () => {
  grid.value?.enableResize(enableResize.value);
});

onMounted(() => {
  grid.value = GridStack.init({
    float: false,
    cellHeight: '70px',
    minRow: 24,
    removable: '.option-dashboard-trash',
    disableDrag: true,
    acceptWidgets: true,
  });

  grid.value.enableResize(false);

  grid.value.on('removed', (_: Event, items: any) => {
    items.forEach(async (node: GridStackNode) => {
      const preDelete: Widget | undefined = widgets.value.find(
        (val) => val.nodeId === node.id,
      );
      if (preDelete !== undefined) {
        await widgetStore.deleteById(preDelete.id);
      }
    });
  });

  grid.value.on('change', (_: Event, items: any) => {
    items.forEach(async (node: GridStackNode) => {
      const preUpdate: Widget | undefined = widgets.value.find(
        (val) => val.nodeId === node.id,
      );
      if (preUpdate !== undefined) {
        await widgetStore.updateById(preUpdate.id, {
          name: preUpdate.name,
          description: preUpdate.description,
          node: {
            x: node.x !== undefined ? node.x : 0,
            y: node.y !== undefined ? node.y : 0,
            w: node.w !== undefined ? node.w : 0,
            h: node.h !== undefined ? node.h : 0,
            id: preUpdate.node.id,
            content: preUpdate.node.content,
          },
          widgetData: preUpdate.widgetData,
          shiftData: preUpdate.shiftData,
          dashboardId: preUpdate.dashboardId,
          nodeId: preUpdate.nodeId,
          topicId: preUpdate.topicId,
          widgetType: preUpdate.widgetType,
        });
      }
    });
  });
});
</script>
