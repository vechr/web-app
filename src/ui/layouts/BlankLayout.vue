<template>
  <Loading v-if="isLoadingActive" />
  <router-view v-else></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useCommonStore } from '../store';
import Loading from '@/ui/components/common/Loading.vue';

export default defineComponent({
  name: 'BlankLayout',
  components: {
    Loading,
  },
  setup() {
    const common = useCommonStore();
    const { isLoadingActive } = storeToRefs(common);
    return {
      isLoadingActive,
    };
  },
});
</script>
