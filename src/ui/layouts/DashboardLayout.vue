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
              <span> Device Type Management</span>
            </a-menu-item>
          </router-link>

          <a-menu-item key="2" @click="navigate" :href="href">
            <dashboard-outlined />
            <span> Dashboard Management</span>
          </a-menu-item>
        </router-link>

        <router-link to="/device" custom v-slot="{ navigate, href }">
          <a-menu-item key="3" @click="navigate" :href="href">
            <api-outlined />
            <span> Device Management</span>
          </a-menu-item>
        </router-link>

        <router-link to="/email" custom v-slot="{ navigate, href }">
          <a-menu-item key="4" @click="navigate" :href="href">
            <mail-outlined />
            <span> Email Management</span>
          </a-menu-item>
        </router-link>

        <router-link to="/user" custom v-slot="{ navigate, href }">
          <a-menu-item key="5" @click="navigate" :href="href">
            <user-add-outlined />
            <span> User Management</span>
          </a-menu-item>
        </router-link>

        <router-link to="/role" custom v-slot="{ navigate, href }">
          <a-menu-item key="6" @click="navigate" :href="href">
            <lock-outlined />
            <span> Role Management</span>
          </a-menu-item>
        </router-link>

        <router-link to="/site" custom v-slot="{ navigate, href }">
          <a-menu-item key="7" @click="navigate" :href="href">
            <DatabaseOutlined />
            <span> Site Management</span>
          </a-menu-item>
        </router-link>

        <router-link to="/permission" custom v-slot="{ navigate, href }">
          <a-menu-item key="8" @click="navigate" :href="href">
            <security-scan-outlined />
            <span> Permission List</span>
          </a-menu-item>
        </router-link>
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
            <a-menu-item key="9" @click="navigate" :href="href"
              >Home</a-menu-item
            >
          </router-link>
          <!--
          <router-link to="/about" custom v-slot="{ navigate, href }">
            <a-menu-item key="7" @click="navigate" :href="href"
              >About</a-menu-item
            >
          </router-link>-->

          <a-sub-menu key="10" id="avatar">
            <template #icon>
              <a-avatar size="small">
                <setting-outlined />
              </a-avatar>
            </template>
            <template #title>Settings</template>
            <router-link to="/profile" custom v-slot="{ navigate, href }">
              <a-menu-item key="setting:1" @click="navigate" :href="href">
                <template #icon><UserOutlined /></template>
                {{
                  mySession !== undefined
                    ? mySession.fullName !== null
                      ? mySession.fullName
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
      <a-layout-content id="main-content">
        <router-view></router-view>
        <Loading />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import {
  UserAddOutlined,
  ApiOutlined,
  DashboardOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ApartmentOutlined,
  LockOutlined,
  SettingOutlined,
  LogoutOutlined,
  CloseOutlined,
  MailOutlined,
  DatabaseOutlined,
  SecurityScanOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCommonStore, useSessionStore } from '../store';
import Loading from '@/ui/components/common/Loading.vue';
import { confirmButtonLogout } from '@/utils/sweet-alert.util';

export default defineComponent({
  name: 'DashboardLayout',
  components: {
    UserAddOutlined,
    DashboardOutlined,
    ApiOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ApartmentOutlined,
    LockOutlined,
    SettingOutlined,
    LogoutOutlined,
    CloseOutlined,
    MailOutlined,
    DatabaseOutlined,
    Loading,
    SecurityScanOutlined,
    UserOutlined,
  },
  setup() {
    const session = useSessionStore();
    const router = useRouter();
    const common = useCommonStore();

    const { mySession } = storeToRefs(session);

    const logoutSession = async () => {
      confirmButtonLogout.fire().then(async (result) => {
        if (result.isConfirmed) {
          common.setIsLoading(true);
          const status = await session.logout();
          if (status) router.push('/session');
        }
      });
    };

    return {
      mySession,
      logoutSession,
      selectedKeys: ref<string[]>(['6']),
      collapsed: ref<boolean>(true),
    };
  },
});
</script>
