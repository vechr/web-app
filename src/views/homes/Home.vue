<template>
  <a-divider
    style="font-size: 30px; !important"
  >
    Dashboard
  </a-divider>
  <div v-if="dataFull.length > 0">
    <div v-for="(data, index) in dataFull" :key="data" style="padding: 2px">
      <a-row >
        <a-col :xs="24" :xl="8" v-for="(value) in dataFull.slice(index*3, (index+1)*3)" :key="value">
          <a-card style="-webkit-box-shadow: 0px 0px 13px 1px rgba(154,154,154,0.2); box-shadow: 0px 0px 13px 1px rgba(154,154,154,0.2);">
            <a-card-meta :title="value.name" :description="value.description">
              <template #avatar>
                <a-avatar style="background-color: #00D1FF;"><template #icon><dashboard-outlined /></template></a-avatar>
              </template>
            </a-card-meta>
            <div v-if="value.devices !== undefined">
              <div v-if="value.devices.length > 0">
                <div v-for="device in value.devices" :key="device">
                  <a-card style="margin: 20px;" hoverable>
                    <a-card-meta :title="device.name" :description="device.description">
                      <template #avatar>
                        <a-avatar style="background-color: #00D98B;"><template #icon><ApiOutlined /></template></a-avatar>
                      </template>
                    </a-card-meta>
                    <div v-if="device.topics !== undefined">
                      <div v-if="device.topics.length > 0">
                        <a-tag
                          v-for="topic in device.topics"
                          :key="topic"
                          :color="`#000`"
                          style="margin: 20px 10px 20px 0;"
                        >
                          <a-typography-paragraph 
                            :copyable="{ text: `kreMES/DashboardID/${value.id}/DeviceID/${device.id}/topic${topic.name}` }"
                            :style="{color: 'deeppink', margin: '10px !important'}"
                          >
                            {{topic.name}}
                          </a-typography-paragraph>
                          <router-link :to="{name: 'logging', params: {dashboardId: value.id, deviceId: device.id, topicName: topic.name.replace('/', '.')}}" >
                            <a-button class="responsive-bt" type="primary" style = "margin: 0px 10px 20px 10px">
                              <template #icon><EyeOutlined /></template>
                              Watch
                            </a-button>
                          </router-link>
                        </a-tag>
                      </div>
                      <div v-else>
                        <a-card  style="margin: 20px;">
                          <a-empty
                            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                            :image-style="{
                              height: '60px',
                            }"
                          >
                            <template #description>
                              <span>
                                There's no topic found!
                              </span>
                            </template>
                            <router-link :to="{name: 'topic-managements', params: {deviceId: device.id}}" >
                              <a-button class="responsive-bt" type="primary">
                                <template #icon><PlusOutlined /></template>
                                Manage Topic
                              </a-button>
                            </router-link>
                          </a-empty>
                        </a-card>
                      </div>
                    </div>
                  </a-card>
                </div>
              </div>
              <div v-else>
                <a-card  style="margin: 20px;">
                  <a-empty
                    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                    :image-style="{
                      height: '60px',
                    }"
                  >
                    <template #description>
                      <span>
                        There's no device found!
                      </span>
                    </template>
                    <router-link to="/device" custom v-slot="{ navigate, href }">
                      <a-button type="primary" class="responsive-bt" @click="navigate" :href="href">
                        <template #icon><PlusOutlined /></template>
                        Manage Device
                      </a-button>
                    </router-link>
                  </a-empty>
                </a-card>
              </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
  <!-- {{dataFull}} -->
</template>

<script lang="ts">
import {
  ApiOutlined,
  DashboardOutlined,
  PlusOutlined,
  EyeOutlined
} from "@ant-design/icons-vue";
import { useDashboardManagementStore, useLoggingStore } from "@/store";
import { storeToRefs } from "pinia";
import { defineComponent, onBeforeMount } from "vue";

export default defineComponent({
  name: 'Home',
  components:{DashboardOutlined, ApiOutlined, PlusOutlined, EyeOutlined},
  setup() {
    const storeDashboard = useDashboardManagementStore();
    const storeLogging = useLoggingStore();

    const { dataFull } = storeToRefs(storeDashboard);
    const { statusConnection } = storeToRefs(storeLogging)

    onBeforeMount(() => {
      statusConnection.value.process = 'Finished';
      statusConnection.value.message = "Not Connected!"
      storeLogging.resetData();
      storeDashboard.getDashboardFullList();
    });

    return { dataFull };
  }
})
</script>

<style>
div.ant-typography, .ant-typography p {
  margin: 0 !important;
}
</style>