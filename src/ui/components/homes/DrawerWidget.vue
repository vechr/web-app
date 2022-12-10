<template>
  <a-drawer
    v-model:visible="visible"
    class="custom-class"
    style="color: red"
    title="Dashboard Widget"
    placement="right"
  >
    <FormWidget />
    <PanelWidget />
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import FormWidget from './FormWidget.vue';
import PanelWidget from './PanelWidget.vue';
import { IFormWidget } from '@/domain';
import { useWidgetDrawerStore } from '@/ui/store';

export default defineComponent({
  name: 'DrawerWidget',
  components: {
    FormWidget,
    PanelWidget,
  },
  setup() {
    const widgetDrawer = useWidgetDrawerStore();
    const { visible } = storeToRefs(widgetDrawer);

    // Get Dashboard
    const route = useRoute();
    const dashboardId = route.params.dashboardId;

    const titleConfig = ref<string>('');
    const widgetSelection = ref<string>('');
    const configVisible = ref<boolean>(false);
    const json = ref({});

    const formState = reactive<IFormWidget>({
      topicId: '',
      name: '',
      description: '',
      shiftData: true,
      dashboardId: typeof dashboardId === 'string' ? dashboardId : '',
      widgetType: '',
      widgetData: {},
    });

    return {
      formState,
      titleConfig,
      widgetSelection,
      configVisible,
      json,
      visible,
      dashboardId,
    };
  },
});
</script>
