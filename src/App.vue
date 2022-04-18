<template>
  <a-layout :style="{height: '100vh'}">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <img alt="logo" src="../src/assets/logo.svg"  style="height: 60px; display: block; margin-left: auto; margin-right: auto; width: 50%;"/>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        
        <router-link to="/dashboard" custom v-slot="{ navigate, href }">
          <a-menu-item key="1" @click="navigate" :href="href">
            <dashboard-outlined />
            <span>Dashboard Management</span>
          </a-menu-item>
        </router-link>

        <router-link to="/device" custom v-slot="{ navigate, href }">
          <a-menu-item key="2" @click="navigate" :href="href">
            <api-outlined />
            <span>Device Management</span>
          </a-menu-item>
        </router-link>

        <router-link to="/user" custom v-slot="{ navigate, href }">
          <a-menu-item key="3" @click="navigate" :href="href">
            <user-outlined />
            <span>User Management</span>
          </a-menu-item>
        </router-link>

        <router-link to="/role" custom v-slot="{ navigate, href }">
          <a-menu-item key="4" @click="navigate" :href="href">
            <UserSwitchOutlined />
            <span>Role Management</span>
          </a-menu-item>
        </router-link>

        <router-link to="/device-type" custom v-slot="{ navigate, href }">
          <a-menu-item key="5" @click="navigate" :href="href">
            <ApartmentOutlined />
            <span>Device Type</span>
          </a-menu-item>
        </router-link>

      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 5 0 0 0">
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
            <menu-fold-outlined v-else class="trigger"/>
          </a-menu-item>
          
          <router-link to="/" custom v-slot="{ navigate, href }">
            <a-menu-item key="6" @click="navigate" :href="href">Home</a-menu-item>
          </router-link>

          <router-link to="/about" custom v-slot="{ navigate, href }">
            <a-menu-item key="7" @click="navigate" :href="href">About</a-menu-item>
          </router-link>

          <router-link to="/profile" custom v-slot="{ navigate, href }">
            <a-menu-item key="8" id="avatar" @click="navigate" :href="href">
              <a-avatar size="small">
                <template #icon><UserOutlined /></template>
              </a-avatar>
            </a-menu-item>
          </router-link>
        </a-menu>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view />
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
  UserSwitchOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
    UserOutlined,
    DashboardOutlined,
    ApiOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ApartmentOutlined,
    UserSwitchOutlined,
  },
  setup() {
    return {
      selectedKeys: ref<string[]>(['4']),
      collapsed: ref<boolean>(false),
    };
  },
});
</script>

<style>
.ant-layout-content {
  border-radius: 20px;
}

#toggle {
  margin: 0;
  padding: 0;  
}
#avatar {
  margin-left: auto;
}

#avatar.ant-menu-item-selected::after {
  border-bottom: 2px solid rgb(201, 83, 201);
}

#toggle.ant-menu-item-selected::after {
  border-bottom: 2px solid transparent;
}

.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}
.ant-layout-sider-dark  {
  flex: 0 0 250px !important;
  max-width: 250px !important;
  min-width: 250px !important;
  width: 250px !important;
}
.ant-layout-sider-collapsed {
  flex: 0 0 50px !important;
  max-width: 50px !important;
  min-width: 50px !important;
  width: 50px !important;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
