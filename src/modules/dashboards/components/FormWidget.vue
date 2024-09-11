<template>
  <a-drawer
    v-model:open="isOpen"
    :title="`${titleConfig} Configuration`"
    width="70%"
    @close="onConfigClose"
  >
    <a-form
      layout="vertical"
      :model="formWidgetData"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        v-if="widgetSelection !== EWidget.MAPS"
        label="Chart Configuration"
        name="widgetData"
        :rules="[
          { required: true, message: 'Please input configuration Chart!' },
        ]"
      >
        <vue-jsoneditor
          height="600"
          :mode="'tree'"
          v-model:json="formWidgetData.widgetData"
          :fullWidthButton="false"
        />
      </a-form-item>

      <a-form-item
        label="Shifted the Data"
        name="shiftData"
        v-if="
          widgetSelection !== EWidget.GAUGE &&
          widgetSelection !== EWidget.BAR &&
          widgetSelection !== EWidget.LINE
        "
      >
        <a-switch
          v-model:checked="formWidgetData.shiftData"
          checked-children="Shifted"
          un-checked-children="Unshifted"
        />
      </a-form-item>

      <a-form-item
        label="Name"
        name="name"
        :rules="[{ required: true, message: 'Please input name widget!' }]"
      >
        <a-input v-model:value="formWidgetData.name" />
      </a-form-item>

      <a-form-item
        label="Description"
        name="description"
        :rules="[{ required: true, message: 'Please input description!' }]"
      >
        <a-textarea v-model:value="formWidgetData.description" />
      </a-form-item>

      <a-form-item
        label="Topic"
        name="topicId"
        :rules="[{ required: true, message: 'Please select Topic!' }]"
      >
        <a-select
          v-model:value="formWidgetData.topicId"
          placeholder="Select a Topic"
          style="width: 100%"
          :options="options"
          @focus="handleFocus"
        ></a-select>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" :style="{ float: 'right' }"
          >Create Widget</a-button
        >
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script lang="ts" setup>
import vueJsoneditor from 'vue3-ts-jsoneditor';
import { PropType, ref, toRefs, watch } from 'vue';
import { SelectProps } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import { GridStack } from 'gridstack';
import { useDashboardStore } from '../dashboard.store';
import { createWidget } from '@/modules/widgets/services';
import {
  TCreateWidgetRequestBody,
  EWidget,
} from '@/modules/widgets/widget.entity';

const propsUnReactive = defineProps({
  titleConfig: {
    type: String,
    required: true,
  },
  widgetSelection: {
    type: String,
    required: true,
  },
  dashboardId: {
    type: String,
    required: true,
  },
  grid: {
    required: true,
  },
  widgetData: {
    type: Object as PropType<any>,
    required: true,
  },
  widgetType: {
    type: String,
    required: true,
  },
});

const {
  dashboardId,
  titleConfig,
  widgetSelection,
  grid,
  widgetData,
  widgetType,
} = toRefs(propsUnReactive);

const emit = defineEmits(['onClearForm']);

const options = ref<SelectProps['options']>([]);
const isOpen = ref<boolean>(false);

const initialWidgetFromData = {
  dashboardId: dashboardId.value,
  description: '',
  name: '',
  topicId: '',
  widgetData: widgetData.value,
  widgetType: widgetType.value,
  shiftData: true,
  node: {
    h: 0,
    w: 0,
    x: 0,
    y: 0,
    content: '',
  },
  nodeId: '',
};

const formWidgetData = ref<TCreateWidgetRequestBody>(initialWidgetFromData);

watch([widgetData, widgetType], ([newWidgetData, newWidgetType]) => {
  formWidgetData.value.widgetData = newWidgetData;
  formWidgetData.value.widgetType = newWidgetType;
});

// Dashboard Data
const dashboardStore = useDashboardStore();
const { dashboards } = storeToRefs(dashboardStore);

const onConfigClose = () => {
  formWidgetData.value.topicId = '';
};

// On Create
const onFinish = (values: { topicId: string }) => {
  // logic
  formWidgetData.value.topicId = values.topicId;
  formWidgetData.value.dashboardId = dashboardId.value as string;
  // Create Widget
  createWidget(
    widgetSelection.value,
    grid.value as GridStack,
    formWidgetData.value,
  );
  emit('onClearForm');
  clearForm();
};

const showFormWidget = () => {
  isOpen.value = true;
};

defineExpose({ showFormWidget });

const clearForm = () => {
  // configVisible.value = false;
  // visible.value = false;

  formWidgetData.value = initialWidgetFromData;
};

const onFinishFailed = () => {
  // Catch Exception when error submit
  // console.log('Failed:', errorInfo);
};

const handleFocus = () => {
  options.value = dashboards.value
    .find((dashboard) => dashboard.id === dashboardId.value)
    ?.devices?.map((dashboardDevice) => ({
      label: dashboardDevice.device.name,
      options: dashboardDevice.device.topics
        ?.filter((topic) => topic.widgetType === widgetSelection.value)
        .map((topic) => ({
          value: topic.id,
          label: topic.name,
        })),
    }));
};
</script>
