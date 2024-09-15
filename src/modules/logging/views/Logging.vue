<template>
  <div style="padding: 20px">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <router-link to="/" custom v-slot="{ navigate, href }">
          <a @click="navigate" :href="href">Home</a>
        </router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item
        >(
        <i>{{
          typeof topicName == 'string'
            ? topicName.replace(/\./g, '/')
            : topicName
        }}</i>
        )</a-breadcrumb-item
      >
    </a-breadcrumb>
    <a-divider> Logging Page </a-divider>
    <a-table
      v-if="data.length > 0"
      :dataSource="data"
      :columns="columns"
      :scroll="{ x: 1200 }"
    >
    </a-table>
    <div v-else class="center-screen">
      <a-empty
        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        :image-style="{
          height: '60px',
        }"
      >
        <template #description>
          <span> There's no data being message! </span>
        </template>
      </a-empty>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  connect,
  ConnectionOptions,
  NatsConnection,
  StringCodec,
} from 'nats.ws';
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { message as notif, TableColumnType } from 'ant-design-vue';
import { useLoggingStore } from '../logging.store';
import { WidgetValidationService } from '@/modules/widgets/services';
import { useTopicStore } from '@/modules/topics/topic.store';
import { Topic } from '@/modules/topics/topic.entity';

type TableDataType = {
  no: number;
  message: string;
};

const columns: TableColumnType<TableDataType>[] = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
    defaultSortOrder: 'descend',
    sorter: (a: TableDataType, b: TableDataType) => a.no - b.no,
    width: 20,
  },
  {
    title: 'Message',
    dataIndex: 'message',
    key: 'message',
  },
];

let nc: NatsConnection;

const route = useRoute();
const topicName = route.params.topicName;
const topicId = route.params.topicId as string;
const dashboardId = route.params.dashboardId;
const deviceId = String(route.params.deviceId);

const storeLogging = useLoggingStore();
const { urlTopic, message, statusConnection, data } = storeToRefs(storeLogging);

const topicStore = useTopicStore();
const topicData = (await topicStore.usecase.getById(topicId, false)) as Topic;

const validationTopic = new WidgetValidationService();

urlTopic.value = `Vechr.DashboardID.${dashboardId}.DeviceID.${deviceId}.TopicID.${topicId}.Topic${topicName}`;

onBeforeMount(async () => {
  data.value = await topicStore.usecase.getHistoricalData({
    dashboardId,
    deviceId,
    topicId,
    topic: topicName.toString().replace(/\./g, '/'),
  });

  try {
    const server: ConnectionOptions = {
      servers: [import.meta.env.APP_NATS_WS],
      user: import.meta.env.APP_NATS_USER,
      pass: import.meta.env.APP_NATS_PASS,
    };
    nc = await connect(server);
    const sc = StringCodec();

    nc.subscribe(urlTopic.value, {
      callback: (_err: any, msg: any) => {
        if (topicData.widgetType !== undefined) {
          if (
            validationTopic.validation(
              topicData.widgetType,
              sc.decode(msg.data),
            )
          ) {
            data.value.push({
              no: data.value.length + 1,
              message: sc.decode(msg.data),
            });
          }
        } else {
          data.value.push({
            no: data.value.length + 1,
            message: sc.decode(msg.data),
          });
        }
        message.value = sc.decode(msg.data);
      },
    });

    nc.subscribe(`${dashboardId}.status.connection`, {
      callback: (_err: any, msg: any) => {
        statusConnection.value.message = sc.decode(msg.data);
        if (statusConnection.value.process == 'Start') {
          notif.success(statusConnection.value.message);
          statusConnection.value.process = 'Finished';
        }
      },
    });

    nc.publish(
      `${dashboardId}.status.connection`,
      sc.encode(
        `Connected to the server, start listening on topic ${
          typeof topicName == 'string'
            ? topicName.replace(/\./g, '/')
            : topicName
        }!`,
      ),
    );
    statusConnection.value.process = 'Start';
  } catch (error) {
    notif.error("Server can't be reached!");
  }
});

onBeforeUnmount(async () => {
  try {
    await nc.close();
    notif.info('Connection closed!');
  } catch {
    notif.error('Server error while close the connection!');
  }
});
</script>
