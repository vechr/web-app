<template>
  <a-drawer
    title="Edit Device Type"
    :visible="isDrawerShow"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form
      layout="vertical"
      :model="deviceTypeEdit"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Name"
        name="name"
        :rules="[{ required: true, message: 'Please input name device type!' }]"
      >
        <a-input v-model:value="deviceTypeEdit.name" />
      </a-form-item>

      <a-form-item
        label="Description"
        name="description"
        :rules="[{ required: true, message: 'Please input description!' }]"
      >
        <a-textarea v-model:value="deviceTypeEdit.description" />
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
import { defineComponent } from 'vue';
import { useCommonStore, useDeviceTypeStore } from '@/ui/store';

export default defineComponent({
  name: 'FormEditDeviceType',
  setup() {
    const common = useCommonStore();
    const { isDrawerShow, isLoadingButton } = storeToRefs(common);

    const store = useDeviceTypeStore();
    const { dataDetails, deviceTypeEdit } = storeToRefs(store);

    const showModal = () => {
      common.setIsModalShow(true);
    };

    const onClose = () => {
      common.setIsDrawerShow(false);
    };

    const onFinish = (values: any) => {
      common.setIsLoadingButton(true);
      store.updateDeviceTypeById(dataDetails.value.id, values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    const handleOk = () => {
      common.setIsModalShow(false);
    };
    return {
      deviceTypeEdit,
      onClose,
      isLoadingButton,
      isDrawerShow,
      showModal,
      handleOk,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>
