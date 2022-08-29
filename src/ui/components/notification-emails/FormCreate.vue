<template>
  <div>
    <a-button type="primary" @click="showModal">
      <template #icon><PlusOutlined /></template>
      Create Notification Email
    </a-button>
    <a-modal
      v-model:visible="isModalShow"
      title="Create Notification Email"
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
          :rules="[{ required: true, message: 'Please input name notification email!' }]"
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
          label="Sender"
          name="sender"
          :rules="[{ required: true, pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gm), message: 'Please input sender email with correct format for example: me@mail.com!' }]"
        >
          <a-input v-model:value="formState.sender" />
        </a-form-item>

        <a-form-item
          label="Recipient"
          name="recipient"
          :rules="[{ required: true, pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gm), message: 'Please input recipient email with correct format for example: me@mail.com!' }]"
        >
          <a-input v-model:value="formState.recipient" />
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
import { useCommonStore, useNotificationEmailStore } from '@/ui/store';
import { storeToRefs } from 'pinia';
import { defineComponent, reactive } from 'vue';

interface FormState {
  name: string;
  description: string;
  sender: string;
  recipient: string;
}

export default defineComponent({
  name: 'FormCreateNotificationEmail',
  components: { PlusOutlined },
  setup() {
    const common = useCommonStore();
    const store = useNotificationEmailStore();

    const { isModalShow, isLoadingButton } = storeToRefs(common);

    const showModal = () => {
      common.setIsModalShow(true);
    };

    const formState = reactive<FormState>({
      name: '',
      description: '',
      sender: '',
      recipient: ''
    });

    const onFinish = (values: any) => {
      common.setIsLoadingButton(true);
      store.createNotificationEmail(values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    const handleOk = () => {
      common.setIsModalShow(false);
    };
    return {
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
