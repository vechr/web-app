<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DashboardLayout from '@/ui/layouts/DashboardLayout.vue';
import BlankLayout from '@/ui/layouts/BlankLayout.vue';
const defaultLayout = 'dashboard-layout';

export default defineComponent({
  components: {
    DashboardLayout,
    BlankLayout,
  },
  computed: {
    layout() {
      return this.$route.meta.layout || defaultLayout;
    },
  },
});
</script>
