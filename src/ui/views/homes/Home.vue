<template>
  <div v-if="!isLoadingActive">
    <a-divider style="font-size: 30px; !important"> Dashboard </a-divider>
    <div v-if="dataFull.length > 0">
      <div
        v-for="(data, index) in dataFull"
        :key="data.id"
        style="padding: 2px"
      >
        <a-row class="row-dashboard">
          <a-col
            :xs="24"
            :xl="12"
            v-for="value in dataFull.slice(index * 2, (index + 1) * 2)"
            :key="value"
          >
            <a-card class="dashboard-card" hoverable>
              <router-link
                :to="{ name: 'dashboard', params: { dashboardId: value.id } }"
              >
                <a-card-meta
                  class="dashboard-card-meta"
                  :title="value.name"
                  :description="value.description"
                >
                  <template #avatar>
                    <a-avatar
                      ><template #icon><dashboard-outlined /></template
                    ></a-avatar>
                  </template>
                </a-card-meta>
                <div v-if="value.devices !== undefined">
                  <div v-if="value.devices.length > 0">
                    <div v-for="device in value.devices" :key="device.id">
                      <a-card class="device-card">
                        <a-card-meta
                          :title="device.name"
                          :description="device.description"
                        >
                          <template #avatar>
                            <a-avatar style="background-color: #00d98b"
                              ><template #icon><ApiOutlined /></template
                            ></a-avatar>
                          </template>
                        </a-card-meta>
                        <div v-if="device.topics !== undefined">
                          <div v-if="device.topics.length > 0">
                            <a-tag
                              v-for="topic in device.topics"
                              :key="topic"
                              :color="`#000`"
                            >
                              <a-typography-paragraph
                                :copyable="{
                                  text: `Vechr/DashboardID/${value.id}/DeviceID/${device.id}/TopicID/${topic.id}/Topic${topic.name}`,
                                }"
                              >
                                {{ topic.name }}
                              </a-typography-paragraph>
                              <router-link
                                :to="{
                                  name: 'logging',
                                  params: {
                                    dashboardId: value.id,
                                    deviceId: device.id,
                                    topicId: topic.id,
                                    topicName: topic.name.replace(/\//g, '.'),
                                  },
                                }"
                              >
                                <a-button
                                  class="responsive-bt"
                                  type="primary"
                                  style="margin: 0px 10px 20px 10px"
                                >
                                  <template #icon><EyeOutlined /></template>
                                  Watch
                                </a-button>
                              </router-link>
                            </a-tag>
                          </div>
                          <div v-else>
                            <a-card style="margin: 20px">
                              <a-empty
                                image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                                :image-style="{
                                  height: '60px',
                                }"
                              >
                                <template #description>
                                  <span> There's no topic found! </span>
                                </template>
                                <router-link
                                  :to="{
                                    name: 'topic-managements',
                                    params: { deviceId: device.id },
                                  }"
                                >
                                  <a-button
                                    class="responsive-bt"
                                    type="primary"
                                  >
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
                    <a-card style="margin: 20px">
                      <a-empty
                        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                        :image-style="{
                          height: '60px',
                        }"
                      >
                        <template #description>
                          <span> There's no device found! </span>
                        </template>
                        <router-link
                          to="/dashboard"
                          custom
                          v-slot="{ navigate, href }"
                        >
                          <a-button
                            type="primary"
                            class="responsive-bt"
                            @click="navigate"
                            :href="href"
                          >
                            <template #icon><PlusOutlined /></template>
                            Manage Device in Dashboard
                          </a-button>
                        </router-link>
                      </a-empty>
                    </a-card>
                  </div>
                </div>
              </router-link>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
    <div v-else class="center-screen">
      <a-empty
        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        :image-style="{
          height: '60px',
        }"
      >
        <template #description>
          <span> There's no dashboard item found! </span>
        </template>
      </a-empty>
    </div>
    <!-- {{dataFull}} -->
  </div>
</template>

<script lang="ts">
import {
  ApiOutlined,
  DashboardOutlined,
  PlusOutlined,
  EyeOutlined,
} from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';
import { defineComponent, onBeforeMount } from 'vue';
import {
  useCommonStore,
  useDashboardManagementStore,
  useLoggingStore,
} from '@/ui/store';

export default defineComponent({
  name: 'Home',
  components: { DashboardOutlined, ApiOutlined, PlusOutlined, EyeOutlined },
  setup() {
    const storeDashboard = useDashboardManagementStore();
    const storeLogging = useLoggingStore();
    const common = useCommonStore();

    const { isLoadingActive } = storeToRefs(common);

    const { dataFull } = storeToRefs(storeDashboard);
    const { statusConnection } = storeToRefs(storeLogging);

    onBeforeMount(() => {
      statusConnection.value.process = 'Finished';
      statusConnection.value.message = 'Not Connected!';
      storeLogging.resetData();
      storeDashboard.getDashboardFullList();
    });

    return { isLoadingActive, dataFull };
  },
});
</script>
