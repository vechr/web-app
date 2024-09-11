<template>
  <div class="dashboard-overview">
    <a-divider> Dashboard </a-divider>
    <div v-if="dashboards.length > 0">
      <a-row class="row-dashboard">
        <a-col v-for="value in dashboards" :key="value">
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
                  <div
                    v-for="dashboardDevice in value.devices"
                    :key="dashboardDevice.device.id"
                  >
                    <a-card class="device-card">
                      <a-card-meta
                        :title="dashboardDevice.device.name"
                        :description="dashboardDevice.device.description"
                      >
                        <template #avatar>
                          <a-avatar style="background-color: #00d98b"
                            ><template #icon><ApiOutlined /></template
                          ></a-avatar>
                        </template>
                      </a-card-meta>
                      <div v-if="dashboardDevice.device.topics !== undefined">
                        <div v-if="dashboardDevice.device.topics.length > 0">
                          <a-tag
                            v-for="topic in dashboardDevice.device.topics"
                            :key="topic"
                            :color="`#000`"
                          >
                            <a-typography-paragraph
                              :copyable="{
                                text: `Vechr/DashboardID/${value.id}/DeviceID/${dashboardDevice.device.id}/TopicID/${topic.id}/Topic${topic.name}`,
                              }"
                            >
                              {{ topic.name }}
                            </a-typography-paragraph>
                            <router-link
                              :to="{
                                name: 'logging',
                                params: {
                                  dashboardId: value.id,
                                  deviceId: dashboardDevice.device.id,
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
                                  name: 'modeling',
                                }"
                              >
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
                        to="/modeling"
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
  </div>
</template>

<script lang="ts" setup>
import {
  ApiOutlined,
  DashboardOutlined,
  PlusOutlined,
  EyeOutlined,
} from '@ant-design/icons-vue';
import Container from 'typedi';
import { onBeforeMount, ref } from 'vue';
import { DashboardUsecase } from '../dashboard.usecase';
import { Dashboard } from '../dashboard.entity';

const usecase = ref(Container.get(DashboardUsecase));
const dashboards = ref<Dashboard[]>([]);

onBeforeMount(async () => {
  dashboards.value = await usecase.value.getDashboardDetails();
});
</script>
