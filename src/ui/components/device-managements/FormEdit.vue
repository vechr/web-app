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
      :model="deviceEdit"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Name"
        name="name"
        :rules="[{ required: true, message: 'Please input name dashboard!' }]"
      >
        <a-input v-model:value="deviceEdit.name" />
      </a-form-item>

      <a-form-item
        label="Description"
        name="description"
        :rules="[{ required: true, message: 'Please input description!' }]"
      >
        <a-textarea v-model:value="deviceEdit.description" />
      </a-form-item>

      <a-form-item
        label="Device Status"
        name="isActive"
        :rules="[
          { required: true, message: 'Please input status of your device!' },
        ]"
      >
        <a-switch
          v-model:checked="deviceEdit.isActive"
          checked-children="Active"
          un-checked-children="Not Active"
        />
      </a-form-item>

      <a-form-item
        label="Device Type"
        name="deviceTypeId"
        :rules="[{ required: true, message: 'Please input device type!' }]"
      >
        <a-select
          v-model:value="deviceEdit.deviceTypeId"
          show-search
          placeholder="Select a Device Type"
          :options="optionDeviceType"
          :filter-option="filterOption"
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
import {
  useCommonStore,
  useDeviceManagementStore,
  useDeviceTypeStore,
} from '@/ui/store';
import { storeToRefs } from 'pinia';
import { defineComponent, onBeforeMount } from 'vue';

interface FormState {
  name: string;
  description: string;
  isActive: boolean;
  deviceTypeId: string;
}

export default defineComponent({
  setup() {
    const common = useCommonStore();
    const { isDrawerShow, isLoadingButton } = storeToRefs(common);

    const storeDevice = useDeviceManagementStore();
    const { deviceEdit, dataDetails } = storeToRefs(storeDevice);

    const storeDeviceType = useDeviceTypeStore();
    const { optionDeviceType } = storeToRefs(storeDeviceType);

    const filterOption = (input: string, option: any) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    onBeforeMount(() => {
      storeDeviceType.getOptionDeviceType();
    });

    const onFinish = (values: FormState) => {
      common.setIsLoadingButton(true);
      storeDevice.updateDeviceById(dataDetails.value.id, values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    const onClose = () => {
      common.setIsDrawerShow(false);
    };

    return {
      deviceEdit,
      onClose,
      optionDeviceType,
      filterOption,
      isLoadingButton,
      isDrawerShow,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>
