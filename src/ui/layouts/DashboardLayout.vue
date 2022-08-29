<template>
  <a-layout :style="{ minHeight: '100vh' }">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null">
      <div class="close-sidebar" @click="() => (collapsed = !collapsed)">
        <CloseOutlined />
      </div>
      <br />
      <img alt="logo" src="@/ui/assets/logo.svg" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <router-link to="/dashboard" custom v-slot="{ navigate, href }">
          <router-link to="/device-type" custom v-slot="{ navigate, href }">
            <a-menu-item key="1" @click="navigate" :href="href">
              <ApartmentOutlined />
              <span>Device Type Management</span>
            </a-menu-item>
          </router-link>

          <a-menu-item key="2" @click="navigate" :href="href">
            <dashboard-outlined />
            <span>Dashboard Management</span>
          </a-menu-item>
        </router-link>

        <router-link to="/device" custom v-slot="{ navigate, href }">
          <a-menu-item key="3" @click="navigate" :href="href">
            <api-outlined />
            <span>Device Management</span>
          </a-menu-item>
        </router-link>

        <router-link to="/email" custom v-slot="{ navigate, href }">
          <a-menu-item key="4" @click="navigate" :href="href">
            <mail-outlined />
            <span>Email Management</span>
          </a-menu-item>
        </router-link>

        <!--
        <router-link to="/user" custom v-slot="{ navigate, href }">
          <a-menu-item key="5" @click="navigate" :href="href">
            <user-outlined />
            <span>User Management</span>
          </a-menu-item>
        </router-link>

        <router-link to="/role" custom v-slot="{ navigate, href }">
          <a-menu-item key="6" @click="navigate" :href="href">
            <UserSwitchOutlined />
            <span>Role Management</span>
          </a-menu-item>
        </router-link>-->
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <div class="logo" />
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

          <router-link to="/" custom v-slot="{ navigate, href }">
            <a-menu-item key="6" @click="navigate" :href="href"
              >Home</a-menu-item
            >
          </router-link>
          <!--
          <router-link to="/about" custom v-slot="{ navigate, href }">
            <a-menu-item key="7" @click="navigate" :href="href"
              >About</a-menu-item
            >
          </router-link>-->

          <router-link to="/profile" custom v-slot="{ navigate, href }">
            <a-menu-item key="8" id="avatar" @click="navigate" :href="href">
              <a-avatar size="small">
                <template #icon><UserOutlined /></template>
              </a-avatar>
            </a-menu-item>
          </router-link>
        </a-menu>
      </a-layout-header>
      <a-layout-content id="main-content">
        <router-view></router-view>
        <Loading />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import {
  UserOutlined,
  ApiOutlined,
  DashboardOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ApartmentOutlined,
  // UserSwitchOutlined,
  CloseOutlined,
  MailOutlined
} from '@ant-design/icons-vue';
import Loading from '@/ui/components/common/Loading.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'DashboardLayout',
  components: {
    UserOutlined,
    DashboardOutlined,
    ApiOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ApartmentOutlined,
    // UserSwitchOutlined,
    CloseOutlined,
    MailOutlined,
    Loading,
  },
  setup() {
    return {
      selectedKeys: ref<string[]>(['6']),
      collapsed: ref<boolean>(true),
    };
  },
});
</script>
