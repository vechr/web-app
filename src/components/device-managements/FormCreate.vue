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
          :rules="[{ required: true, message: 'Please input name dashboard!' }]"
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
          :style="{display: 'none'}"
          label="Active"
          name="isActive"
          :rules="[{ required: true, message: 'Please input status of your device!' }]"
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
            :options="options"
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
import { PlusOutlined } from "@ant-design/icons-vue";
import { useCommonStore, useDeviceManagementStore } from "@/store";
import { storeToRefs } from "pinia";
import { defineComponent, reactive, ref } from "vue";
import { SelectProps } from "ant-design-vue";

interface FormState {
  name: string;
  description: string;
  isActive: boolean;
  deviceTypeId: string;
}

export default defineComponent({
  name: "FormDashboard",
  components: { PlusOutlined },
  setup() {
    const common = useCommonStore();
    const store = useDeviceManagementStore();

    const options = ref<SelectProps['options']>([
      { value: '5e974ef5-5e3b-456d-86c3-94291bfe5021', label: 'Arduino A' },
      { value: '5e974ef5-5e3b-456d-86c3-94291bfe5021', label: 'Arduino B' },
      { value: '5e974ef5-5e3b-456d-86c3-94291bfe5021', label: 'Arduino C' },
    ]);

    const filterOption = (input: string, option: any) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    const { isModalShow, isLoadingButton } = storeToRefs(common);

    const showModal = () => {
      common.setIsModalShow(true);
    };

    const formState = reactive<FormState>({
      name: "",
      description: "",
      isActive: true,
      deviceTypeId: ""
    });

    const onFinish = (values: FormState) => {
      common.setIsLoadingButton(true);
      store.createDevice(values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };

    const handleOk = () => {
      common.setIsModalShow(false);
    };
    return {
      options,
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