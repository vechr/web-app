<template>
  <a-breadcrumb>
    <a-breadcrumb-item>
      <router-link to="/" custom v-slot="{ navigate, href }">
        <a @click="navigate" :href="href">Home</a>
      </router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item>( <i>{{typeof topicName == "string" ? topicName.replace('.', '/') : topicName}}</i> )</a-breadcrumb-item>
  </a-breadcrumb>
  <a-divider
    style="font-size: 30px; !important"
  >
    Logging Page
  </a-divider>
  <a-table
    v-if="data.length > 0"
    :dataSource="data"
    :columns="loggingColumns"
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
import { defineComponent } from "vue-demi";
import { connect, NatsConnection, StringCodec } from "nats.ws";
import { watchEffect } from "vue";
import { useLoggingStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { message as notif } from "ant-design-vue";

export default defineComponent({
  name: "Logging",
  setup() {
    const route = useRoute();
    const topicName = route.params.topicName;
    const dashboardId = route.params.dashboardId;
    const deviceId = route.params.deviceId;

    const storeLogging = useLoggingStore();
    const { urlTopic, message, statusConnection, data, loggingColumns } = storeToRefs(storeLogging);

    urlTopic.value = `kreMES.DashboardID.${dashboardId}.DeviceID.${deviceId}.topic${topicName}`;

    watchEffect(async () => {
      let nc: NatsConnection;

      try {
        const server = { servers: [process.env.VUE_APP_NATS_WS] };
        nc = await connect(server);
        const sc = StringCodec();

        nc.subscribe(urlTopic.value, {
          callback: (err: any, msg: any) => {
            data.value.push({no: data.value.length + 1, message: sc.decode(msg.data)});
            message.value = sc.decode(msg.data);
          },
        });

        nc.subscribe(`${dashboardId}.status.connection`, {
          callback: (err: any, msg: any) => {
            statusConnection.value.message = sc.decode(msg.data);
            if (statusConnection.value.process == "Start") {
              notif.success(statusConnection.value.message);
              statusConnection.value.process = "Finished";
            }
          },
        });

        nc.publish(
          `${dashboardId}.status.connection`,
          sc.encode(`Connected to the server!`)
        );
        statusConnection.value.process = "Start";
      } catch (error) {
        notif.error("Server can't be reached!");
      }
      finally {
        (async () => await nc.close());
      }
    });

    return { data, message, statusConnection, urlTopic, topicName, loggingColumns };
  },
});
</script>

<style>
</style>