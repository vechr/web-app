<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CloseOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  PartitionOutlined,
  HomeOutlined,
  DashboardOutlined,
} from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';
import { useAbility } from '@casl/vue';
import { useSessionStore } from '@/core/modules/sessions/session.store';
import Loading from '@/app/components/Loading.vue';

const route = useRoute();

// button collapsed for sidebar
const collapsed = ref<boolean>(true);
const can = useAbility().can;

const selectedKeys = ref<string[]>(['1']);

const sessionStore = useSessionStore();
const { usecase } = storeToRefs(sessionStore);

const logoutSession = () => {
  usecase.value.logout();
};
</script>

<template>
  <a-layout>
    <a-layout-sider
      id="layout-sider"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="close-sidebar" @click="() => (collapsed = !collapsed)">
        <CloseOutlined />
      </div>

      <div class="text-center">
        <h1 class="full">VECHR</h1>
        <h1 class="collapse">V</h1>
      </div>
      <!-- <img alt="logo" src="/src/app/ui/assets/logo.svg" /> -->
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <router-link to="/" custom v-slot="{ navigate, href }">
          <a-menu-item key="1" @click="navigate" :href="href">
            <HomeOutlined />
            <span>Home</span>
          </a-menu-item>
        </router-link>
        <router-link
          v-if="can('read', 'modeling')"
          to="/modeling"
          custom
          v-slot="{ navigate, href }"
        >
          <a-menu-item key="2" @click="navigate" :href="href">
            <PartitionOutlined />
            <span>Modeling</span>
          </a-menu-item>
        </router-link>
        <router-link
          v-if="can('read', 'dashboard')"
          to="/dashboard"
          custom
          v-slot="{ navigate, href }"
        >
          <a-menu-item key="3" @click="navigate" :href="href">
            <DashboardOutlined />
            <span>Dashboard</span>
          </a-menu-item>
        </router-link>
        <a-menu-item key="4" @click="logoutSession">
          <template #icon><logout-outlined /></template>
          Logout
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout id="layout-main">
      <a-layout-header id="layout-header">
        <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="light"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item id="toggle" @click="() => (collapsed = !collapsed)">
            <menu-unfold-outlined
              v-if="collapsed"
              class="trigger"
              aria-disabled="true"
            />
            <menu-fold-outlined
              v-else
              class="trigger"
              style="margin-left: 18px"
            />
          </a-menu-item>
          <a-sub-menu key="10" id="avatar">
            <template #icon>
              <setting-outlined />
            </template>
            <template #title>Settings</template>
            <router-link to="/profile" custom v-slot="{ navigate, href }">
              <a-menu-item key="setting:1" @click="navigate" :href="href">
                <template #icon><UserOutlined /></template>
                {{
                  usecase.currentSession !== undefined
                    ? usecase.currentSession.name !== null
                      ? usecase.currentSession.name
                      : 'Profile'
                    : 'Profile'
                }}
              </a-menu-item>
            </router-link>
            <a-menu-item key="setting:2" @click="logoutSession">
              <template #icon><logout-outlined /></template>
              Logout
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-header>
      <a-layout-content id="layout-content">
        <router-view v-slot="{ Component }">
          <template v-if="Component">
            <Suspense timeout="0">
              <template #default>
                <component :is="Component" :key="route.path"></component>
              </template>
              <template #fallback>
                <Loading />
              </template>
            </Suspense>
          </template>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
