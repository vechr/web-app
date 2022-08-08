<template>
  <div>
    <a-button type="primary" @click="showModal" block>
      <template #icon><PlusOutlined /></template>Create Dashboard
    </a-button>
    <a-modal
      v-model:visible="isModalShow"
      title="Create Dashboard"
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
import { useCommonStore, useDashboardManagementStore } from '@/store';
import { storeToRefs } from 'pinia';
import { defineComponent, reactive } from 'vue';

interface FormState {
  name: string;
  description: string;
}

export default defineComponent({
  name: 'FormDashboard',
  components: { PlusOutlined },
  setup() {
    const common = useCommonStore();
    const store = useDashboardManagementStore();

    const { isModalShow, isLoadingButton } = storeToRefs(common);

    const showModal = () => {
      common.setIsModalShow(true);
    };

    const formState = reactive<FormState>({
      name: '',
      description: '',
    });

    const onFinish = (values: any) => {
      common.setIsLoadingButton(true);
      store.createDashboard(values);
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
