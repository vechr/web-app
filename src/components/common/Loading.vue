<template>
  <div v-if="isLoadingActive" class="center-screen">
    <a-spin :indicator="indicator" />
  </div>
</template>
<script lang="ts">
import { useCommonStore } from '@/store';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';
import { defineComponent, h } from 'vue';
export default defineComponent({
  setup() {
    const common = useCommonStore()

    const { isLoadingActive } = storeToRefs(common);

    const indicator = h(LoadingOutlined, {
      style: {
        fontSize: '40px',
      },
      spin: true,
    });

    return {
      indicator,
      isLoadingActive
    };
  },
});
</script>

<style>
.center-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 80vh;
}
</style>