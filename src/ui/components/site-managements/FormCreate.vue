<template>
  <div>
    <a-button type="primary" @click="showModal" block>
      <template #icon><PlusOutlined /></template>Create Site
    </a-button>

    <a-modal
      v-model:visible="isModalShow"
      title="Create Site"
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
          label="Site Name"
          name="name"
          :rules="[{ required: true, message: 'Please input Site Name!' }]"
        >
          <a-input v-model:value="formState.name" />
        </a-form-item>

        <a-form-item label="Description" name="description">
          <a-textarea v-model:value="formState.description" />
        </a-form-item>

        <a-form-item
          label="Code"
          name="code"
          :rules="[{ required: true, message: 'Please input Code!' }]"
        >
          <a-input v-model:value="formState.code" />
        </a-form-item>

        <a-form-item
          label="Location"
          name="location"
          :rules="[{ required: true, message: 'Please input Location!' }]"
        >
          <a-input v-model:value="formState.location" />
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
import { defineComponent, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useCommonStore, useSiteManagementStore } from '@/ui/store';
import { ICreateSite } from '@/domain';

export default defineComponent({
  name: 'FormCreateRole',
  components: { PlusOutlined },
  setup() {
    const common = useCommonStore();
    const store = useSiteManagementStore();
    const { isModalShow, isLoadingButton } = storeToRefs(common);

    const showModal = () => {
      common.setIsModalShow(true);
    };

    const formState = reactive<ICreateSite>({
      name: '',
      description: '',
      code: '',
      location: '',
    });

    const onFinish = (values: any) => {
      common.setIsLoadingButton(true);
      store.createSite(values);
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
