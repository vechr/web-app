<script lang="ts" setup>
import { useRoute } from 'vue-router';
import Loading from '@/app/components/Loading.vue';

const route = useRoute();
</script>

<template>
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
</template>
