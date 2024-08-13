<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const defaultLayout = 'dashboard-layout';

const route = useRoute();

const layout = computed(() => route.meta.layout ?? defaultLayout);
</script>

<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>
