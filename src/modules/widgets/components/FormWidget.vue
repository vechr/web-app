<!-- <template>
  <a-drawer
    v-model:visible="configVisible"
    class="configurator"
    :title="`${titleConfig} Configuration`"
    width="90%"
    :closable="false"
    @close="onConfigClose"
  >
    <a-form
      layout="vertical"
      :model="formState"
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
          v-model:json="formState.widgetData"
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
          v-model:checked="formState.shiftData"
          checked-children="Shifted"
          un-checked-children="Unshifted"
        />
      </a-form-item>

      <a-form-item
        label="Name"
        name="name"
        :rules="[{ required: true, message: 'Please input name widget!' }]"
      >
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item
        label="Description"
        name="description"
        :rules="[{ required: true, message: 'Please input description!' }]"
      >
        <a-textarea v-model:value="formState.description" />
      </a-form-item>

      <a-form-item
        label="Topic"
        name="topicId"
        :rules="[{ required: true, message: 'Please select Topic!' }]"
      >
        <a-select
          v-model:value="formState.topicId"
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
import { ref } from 'vue';
import { SelectProps } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import { GridStack } from 'gridstack';
import { createWidget } from '@/modules/widgets/services/widget/widget-selection';
import { useDashboardStore } from '@/modules/dashboards/dashboard.store';

const widgetDrawer = useWidgetDrawerStore();
const {
  configVisible,
  titleConfig,
  visible,
  widgetSelection,
  formState,
  dashboardId,
  grid,
} = storeToRefs(widgetDrawer);

const options = ref<SelectProps['options']>([]);

// Dashboard Data
const storeDashboard = useDashboardStore();
const { dataFull } = storeToRefs(storeDashboard);

const onConfigClose = () => {
  formState.value.topicId = '';
};

// On Create
const onFinish = (values: { topicId: string }) => {
  // logic
  formState.value.topicId = values.topicId;
  formState.value.dashboardId = dashboardId.value as string;
  // Create Widget
  createWidget(widgetSelection.value, grid.value as GridStack, formState.value);
  clearForm();
};

const clearForm = () => {
  configVisible.value = false;
  visible.value = false;

  formState.value.topicId = '';
  formState.value.name = '';
  formState.value.description = '';
  formState.value.shiftData = true;
  formState.value.widgetType = '';
};

const onFinishFailed = () => {
  // Catch Exception when error submit
  // console.log('Failed:', errorInfo);
};

const handleFocus = () => {
  options.value = dataFull.value
    .find((dashboard) => dashboard.id === dashboardId.value)
    ?.devices?.map((device) => ({
      label: device.name,
      options: device.topics
        ?.filter((topic) => topic.widgetType === widgetSelection.value)
        .map((topic) => ({
          value: topic.id,
          label: topic.name,
        })),
    }));
};
</script> -->
