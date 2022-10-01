<template>
  <div>
    <a-button type="primary" @click="showModal" block>
      <template #icon><PlusOutlined /></template>Create Topic
    </a-button>
    <a-modal
      v-model:visible="isModalShow"
      title="Create Topic"
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
          <a-input v-model:value="formState.name" />
        </a-form-item>

        <a-form-item
          label="Description"
          name="description"
          :rules="[
            { required: true, message: 'Please input Topic description!' },
          ]"
        >
          <a-textarea v-model:value="formState.description" />
        </a-form-item>

        <a-form-item
          label="Widget Type"
          name="widgetType"
          :rules="[{ required: false, message: 'Please input widget type!' }]"
        >
          <a-select
            v-model:value="formState.widgetType"
            show-search
            placeholder="Select a Widget Type"
            :options="getWidgetType"
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
import { storeToRefs } from 'pinia';
import { defineComponent, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useCommonStore, useTopicManagementStore } from '@/ui/store';
import { useWidgetStore } from '@/ui/store';

interface FormState {
  name: string;
  description: string;
  widgetType: string;
}

export default defineComponent({
  name: 'FormCreateTopic',
  components: { PlusOutlined },
  setup() {
    const route = useRoute();
    const deviceId = String(route.params.deviceId);

    const common = useCommonStore();
    const widgetStore = useWidgetStore();
    const store = useTopicManagementStore();

    const { getWidgetType } = storeToRefs(widgetStore);
    const { isModalShow, isLoadingButton } = storeToRefs(common);

    const filterOption = (input: string, option: any) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    const showModal = () => {
      common.setIsModalShow(true);
    };

    const formState = reactive<FormState>({
      name: '',
      description: '',
      widgetType: '',
    });

    const onFinish = (values: any) => {
      common.setIsLoadingButton(true);
      store.createTopic(deviceId, values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    const handleOk = () => {
      common.setIsModalShow(false);
    };
    return {
      filterOption,
      getWidgetType,
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
