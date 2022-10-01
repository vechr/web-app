<template>
  <a-drawer
    title="Edit Dashboard"
    :visible="isDrawerShow"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form
      layout="vertical"
      :model="dashboardEdit"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
    >
      <a-form-item
        label="Name"
        name="name"
        :rules="[{ required: true, message: 'Please input name dashboard!' }]"
      >
        <a-input v-model:value="dashboardEdit.name" />
      </a-form-item>

      <a-form-item
        label="Description"
        name="description"
        :rules="[{ required: true, message: 'Please input description!' }]"
      >
        <a-textarea v-model:value="dashboardEdit.description" />
      </a-form-item>

      <a-form-item
        label="Devices"
        name="devices"
        :rules="[{ required: false }]"
      >
        <a-select
          mode="tags"
          style="width: 100%"
          placeholder="Tags Mode"
          :options="optionDevice"
          v-model:value="dashboardEdit.devices"
        ></a-select>
      </a-form-item>

      <a-form-item>
        <a-button
          type="primary"
          :loading="isLoadingButton"
          html-type="submit"
          :style="{ float: 'right' }"
          >Submit</a-button
        >
      </a-form-item>
    </a-form>
  </a-drawer>
</template>
<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent, onBeforeMount } from 'vue';
import {
  useCommonStore,
  useDashboardManagementStore,
  useDeviceManagementStore,
} from '@/ui/store';

export default defineComponent({
  name: 'FormEditDashboard',
  setup() {
    const common = useCommonStore();
    const { isLoadingButton, isDrawerShow } = storeToRefs(common);

    const dashboardStore = useDashboardManagementStore();
    const { dashboardEdit, dataDetails } = storeToRefs(dashboardStore);

    const deviceStore = useDeviceManagementStore();
    const { optionDevice } = storeToRefs(deviceStore);

    const onClose = () => {
      common.setIsDrawerShow(false);
    };

    onBeforeMount(() => {
      deviceStore.getOptionDevice();
    });

    const onFinish = (values: any) => {
      common.setIsLoadingButton(true);
      dashboardStore.updateDashboardById(dataDetails.value.id, values);
    };

    return {
      dashboardEdit,
      optionDevice,
      isDrawerShow,
      isLoadingButton,
      onFinish,
      onClose,
    };
  },
});
</script>
