<template>
  <a-drawer
      v-model:visible="configVisible"
      title="Two-level Drawer"
      width="320"
      :closable="false"
    >
      <h1>Config</h1>
    </a-drawer>
</template>

<script>
import { defineComponent, ref } from "vue-demi";

export default defineComponent({
  name:'WidgetCreate',
  setup() {
    const configVisible = ref<boolean>(false)
    return {
      configVisible
    }
  }
})
</script>

<style>

</style>