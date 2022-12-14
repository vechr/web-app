<template>
  <a-drawer
    title="Edit Topic"
    :visible="isDrawerShow"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form
      layout="vertical"
      :model="topicEdit"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Name"
        name="name"
        :rules="[
          { required: true, message: 'Please input Topic name!' },
          {
            required: true,
            pattern: new RegExp(/[\/]\S*$/gm),
            message:
              'Please use / character at the beginning and cannot contain any spaces. For example /mytopic, /my-topic!',
          },
        ]"
      >
        <a-input v-model:value="topicEdit.name" />
      </a-form-item>

      <a-form-item
        label="Description"
        name="description"
        :rules="[
          { required: true, message: 'Please input Topic description!' },
        ]"
      >
        <a-textarea v-model:value="topicEdit.description" />
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
import { useRoute } from 'vue-router';
import { useCommonStore, useTopicManagementStore } from '@/ui/store';

interface FormState {
  name: string;
  description: string;
}

export default defineComponent({
  name: 'FormEditTopic',
  setup() {
    const route = useRoute();
    const deviceId = String(route.params.deviceId);

    const common = useCommonStore();
    const { isDrawerShow, isLoadingButton } = storeToRefs(common);

    const storeTopic = useTopicManagementStore();
    const { topicEdit, dataDetails } = storeToRefs(storeTopic);

    const filterOption = (input: string, option: any) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const onFinish = (values: FormState) => {
      common.setIsLoadingButton(true);
      storeTopic.updateTopicById(deviceId, dataDetails.value.id, values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    const onClose = () => {
      common.setIsDrawerShow(false);
    };

    return {
      topicEdit,
      onClose,
      filterOption,
      isLoadingButton,
      isDrawerShow,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>
