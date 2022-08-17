<template>
  <div>
    <a-button type="primary" @click="showModal" block>
      <template #icon><PlusOutlined /></template>Create Topic Event
    </a-button>
    <a-modal
      v-model:visible="isModalShow"
      title="Create Topic Event"
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
          :rules="[{ required: true, message: 'Please input Topic name!' }]"
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
          label="Event Expression"
          name="eventExpression"
          :rules="[
            { required: true, message: 'Please input Event Expression!' },
          ]"
        >
          <vue-jsoneditor
            height="600"
            :fullWidthButton="false"
            :mode="'text'"
            v-model:json="formState.eventExpression" 
            @change="onChange"
          />
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
import vueJsoneditor from 'vue3-ts-jsoneditor';
import { PlusOutlined } from '@ant-design/icons-vue';
import { useCommonStore, useTopicEventStore } from '@/ui/store';
import { storeToRefs } from 'pinia';
import { defineComponent, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { isJsonString } from '@/utils/jsonCheck';

interface FormState {
  name: string;
  description: string;
  eventExpression: object;
}

export default defineComponent({
  name: 'FormDashboard',
  components: { PlusOutlined, vueJsoneditor },
  setup() {
    const route = useRoute();
    const topicId = String(route.params.topicId);

    const common = useCommonStore();
    const store = useTopicEventStore();
    const json = ref({})

    const { isModalShow, isLoadingButton } = storeToRefs(common);

    const showModal = () => {
      common.setIsModalShow(true);
    };

    const formState = reactive<FormState>({
      name: '',
      description: '',
      eventExpression: {},
    });

    const onFinish = (values: FormState) => {
      values.eventExpression = json.value
      common.setIsLoadingButton(true);
      store.createTopicEvent(topicId, values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    const handleOk = () => {
      common.setIsModalShow(false);
    };

    const onChange = (value: any) => {
      if (isJsonString(value.text)) {
        json.value = JSON.parse(value.text)
      }
    }

    return {
      onChange,
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
