<template>
  <a-breadcrumb>
    <a-breadcrumb-item>
      <router-link to="/" custom v-slot="{ navigate, href }">
        <a @click="navigate" :href="href">Home</a>
      </router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item
      >(
      <i>{{
        typeof topicName == 'string' ? topicName.replace(/\./g, '/') : topicName
      }}</i>
      )</a-breadcrumb-item
    >
  </a-breadcrumb>
  <a-divider style="font-size: 30px; !important"> Logging Page </a-divider>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi';
import { connect, NatsConnection, StringCodec } from 'nats.ws';
import { onBeforeMount, onBeforeUnmount, watchEffect } from 'vue';
import { useLoggingStore, useTopicManagementStore } from '@/store';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { message as notif, TableColumnType } from 'ant-design-vue';
import { ValidationHelper } from '@/helpers/validation.helper';

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

export default defineComponent({
  name: 'Logging',
  setup() {
    let nc: NatsConnection;

    const route = useRoute();
    const topicName = route.params.topicName;
    const topicId = route.params.topicId;
    const dashboardId = route.params.dashboardId;
    const deviceId = route.params.deviceId;

    const storeLogging = useLoggingStore();
    const { urlTopic, message, statusConnection, data } =
      storeToRefs(storeLogging);

    const topicStore = useTopicManagementStore();
    const { dataDetails } = storeToRefs(topicStore);

    const validationTopic = new ValidationHelper();

    urlTopic.value = `kreMES.DashboardID.${dashboardId}.DeviceID.${deviceId}.TopicID.${topicId}.Topic${topicName}`;

    onBeforeMount(() => {
      if (typeof topicId === 'string')
        topicStore.getTopicById(deviceId, topicId);
      storeLogging.getHistoricalData({
        dashboardId,
        deviceId,
        topicId,
        topic: topicName.toString().replace(/\./g, '/'),
      });
    });

    watchEffect(async () => {
      try {
        const server = { servers: [import.meta.env.VUE_APP_NATS_WS] };
        nc = await connect(server);
        const sc = StringCodec();

        nc.subscribe(urlTopic.value, {
          callback: (err: any, msg: any) => {
            if (dataDetails.value.widgetType !== undefined) {
              if (
                validationTopic.validation(
                  dataDetails.value.widgetType,
                  sc.decode(msg.data)
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
          callback: (err: any, msg: any) => {
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
            }!`
          )
        );
        statusConnection.value.process = 'Start';
      } catch (error) {
        notif.error('Server can\'t be reached!');
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

    return { data, message, statusConnection, urlTopic, topicName, columns };
  },
});
</script>

<style></style>
