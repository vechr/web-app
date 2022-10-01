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
      width="720px"
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
          <codemirror
            v-model="formState.eventExpression"
            placeholder="Input your expression value in here!"
            :style="{ height: '250px' }"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="extensions"
          />
        </a-form-item>

        <a-divider>Email Notification</a-divider>

        <a-form-item label="Notification Email" name="notificationEmailId">
          <a-select
            mode="tags"
            style="width: 100%"
            placeholder="Select a Notification Email"
            :options="optionNotificationEmail"
            v-model:value="formState.notificationEmailId"
            show-search
          ></a-select>
        </a-form-item>

        <a-form-item
          label="Body Text"
          name="bodyEmail"
          :rules="[{ message: 'Please input Body Text Email!' }]"
        >
          <a-textarea v-model:value="formState.bodyEmail" />
        </a-form-item>

        <a-form-item>
          <editor
            :init="{
              plugins: 'lists link image table code help wordcount',
              height: 500,
            }"
            v-model="formState.htmlBodyEmail"
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
import { PlusOutlined } from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';
import { defineComponent, onBeforeMount, reactive } from 'vue';
import { useRoute } from 'vue-router';
import Editor from '@tinymce/tinymce-vue';
import { Codemirror } from 'vue-codemirror';
import { jsonLanguage } from '@codemirror/lang-json';
import {
  useCommonStore,
  useNotificationEmailStore,
  useTopicEventStore,
} from '@/ui/store';

interface FormState {
  name: string;
  description: string;
  eventExpression: string;
  notificationEmailId: string[];
  bodyEmail?: string;
  htmlBodyEmail?: string;
}

export default defineComponent({
  name: 'FormCreateTopicEvent',
  components: { PlusOutlined, editor: Editor, Codemirror },
  setup() {
    // Code Editor
    const extensions = [jsonLanguage];

    const route = useRoute();
    const topicId = String(route.params.topicId);

    const common = useCommonStore();
    const store = useTopicEventStore();

    const storeNotificationStore = useNotificationEmailStore();
    const { optionNotificationEmail } = storeToRefs(storeNotificationStore);

    const { isModalShow, isLoadingButton } = storeToRefs(common);

    const showModal = () => {
      common.setIsModalShow(true);
    };

    const formState = reactive<FormState>({
      name: '',
      description: '',
      eventExpression: '',
      notificationEmailId: [],
      bodyEmail: '',
      htmlBodyEmail: '',
    });

    onBeforeMount(() => {
      storeNotificationStore.getOptionNotificationEmail();
    });

    const onFinish = (values: FormState) => {
      values.eventExpression = formState.eventExpression;
      values.htmlBodyEmail = formState.htmlBodyEmail;
      common.setIsLoadingButton(true);
      store.createTopicEvent(topicId, values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    const handleOk = () => {
      common.setIsModalShow(false);
    };

    return {
      extensions,
      optionNotificationEmail,
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
