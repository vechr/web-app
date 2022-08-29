<template>
  <div>
    <a-button type="primary" @click="showModal">
      <template #icon><PlusOutlined /></template>
      Create Device
    </a-button>
    <a-modal
      v-model:visible="isModalShow"
      title="Create Device"
      @ok="handleOk"
      :footer="null"
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
          label="Name"
          name="name"
          :rules="[{ required: true, message: 'Please input name device!' }]"
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
          :style="{ display: 'none' }"
          label="Active"
          name="isActive"
          :rules="[
            { required: true, message: 'Please input status of your device!' },
          ]"
        >
          <a-checkbox v-model:checked="formState.isActive">Active</a-checkbox>
        </a-form-item>

        <a-form-item
          label="Device Type"
          name="deviceTypeId"
          :rules="[{ required: true, message: 'Please input device type!' }]"
        >
          <a-select
            v-model:value="formState.deviceTypeId"
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
    </a-modal>
  </div>
</template>
<script lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue';
import {
  useCommonStore,
  useDeviceManagementStore,
  useDeviceTypeStore,
} from '@/ui/store';
import { storeToRefs } from 'pinia';
import { defineComponent, onBeforeMount, reactive } from 'vue';

interface FormState {
  name: string;
  description: string;
  isActive: boolean;
  deviceTypeId: string;
}

export default defineComponent({
  name: 'FormCreateDevice',
  components: { PlusOutlined },
  setup() {
    const common = useCommonStore();
    const store = useDeviceManagementStore();
    const storeDeviceType = useDeviceTypeStore();

    const { optionDeviceType } = storeToRefs(storeDeviceType);

    const filterOption = (input: string, option: any) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    const { isModalShow, isLoadingButton } = storeToRefs(common);

    const showModal = () => {
      common.setIsModalShow(true);
    };

    const formState = reactive<FormState>({
      name: '',
      description: '',
      isActive: true,
      deviceTypeId: '',
    });

    onBeforeMount(() => {
      storeDeviceType.getOptionDeviceType();
    });

    const onFinish = (values: FormState) => {
      common.setIsLoadingButton(true);
      store.createDevice(values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    const handleOk = () => {
      common.setIsModalShow(false);
    };
    return {
      optionDeviceType,
      filterOption,
      isLoadingButton,
      formState,
      isModalShow,
      showModal,
      handleOk,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>

<style>
.ant-modal-header {
  border-radius: 10px 10px 0 0 !important;
}
.ant-modal-content {
  border-radius: 10px !important;
}
</style>
