<template>
  <a-drawer
    title="Edit Notification Email"
    :visible="isDrawerShow"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form
      layout="vertical"
      :model="notificationEmailEdit"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Name"
        name="name"
        :rules="[
          { required: true, message: 'Please input name notification email!' },
        ]"
      >
        <a-input v-model:value="notificationEmailEdit.name" />
      </a-form-item>

      <a-form-item
        label="Description"
        name="description"
        :rules="[{ required: true, message: 'Please input description!' }]"
      >
        <a-textarea v-model:value="notificationEmailEdit.description" />
      </a-form-item>

      <a-form-item
        label="Sender"
        name="sender"
        :rules="[
          {
            required: true,
            pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gm),
            message:
              'Please input sender email with correct format for example: me@mail.com!',
          },
        ]"
      >
        <a-input v-model:value="notificationEmailEdit.sender" />
      </a-form-item>

      <a-form-item
        label="Sender"
        name="sender"
        :rules="[
          {
            required: true,
            pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gm),
            message:
              'Please input recipient email with correct format for example: me@mail.com!',
          },
        ]"
      >
        <a-input v-model:value="notificationEmailEdit.recipient" />
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
import {
  useCommonStore,
  useNotificationEmailManagementStore,
} from '@/ui/store';

export default defineComponent({
  name: 'FormEditNotificationEmail',
  setup() {
    const common = useCommonStore();
    const { isDrawerShow, isLoadingButton } = storeToRefs(common);

    const store = useNotificationEmailManagementStore();
    const { notificationEmailEdit } = storeToRefs(store);

    const showModal = () => {
      common.setIsModalShow(true);
    };

    const onClose = () => {
      common.setIsDrawerShow(false);
    };

    const onFinish = (values: any) => {
      common.setIsLoadingButton(true);
      store.updateNotificationEmailById(notificationEmailEdit.value.id, values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    const handleOk = () => {
      common.setIsModalShow(false);
    };
    return {
      notificationEmailEdit,
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
