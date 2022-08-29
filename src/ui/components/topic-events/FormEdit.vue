<template>
  <a-drawer
    title="Edit Topic Event"
    :visible="isDrawerShow"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
    :width="720"
    class="topic-event-drawer"
  >
    <a-form
      layout="vertical"
      :model="topicEventEdit"
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
        <a-input v-model:value="topicEventEdit.name" />
      </a-form-item>

      <a-form-item
        label="Description"
        name="description"
        :rules="[
          { required: true, message: 'Please input Topic description!' },
        ]"
      >
        <a-textarea v-model:value="topicEventEdit.description" />
      </a-form-item>

      <a-form-item
        label="Event Expression"
        name="eventExpression"
        :rules="[{ required: true, message: 'Please input Event Expression!' }]"
      >
        <codemirror
          v-model="topicEventEdit.eventExpression"
          placeholder="Input your expression value in here!"
          :style="{ height: '250px' }"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="2"
          :extensions="extensions"
        />
      </a-form-item>

      <a-divider>Email Notification</a-divider>

      <a-form-item
          label="Notification Email"
          name="notificationEmailId"
        >
          <a-select
            mode="tags"
            style="width: 100%"
            placeholder="Select a Notification Email"
            :options="optionNotificationEmail"
            v-model:value="topicEventEdit.notificationEmailId"
            show-search
          ></a-select>
        </a-form-item>

      <a-form-item
        label="Body Text"
        name="bodyEmail"
        :rules="[
          { message: 'Please input Body Text Email!' },
        ]"
      >
        <a-textarea v-model:value="topicEventEdit.bodyEmail" />
      </a-form-item>

      <a-form-item
        label="HTML Body Email"
      >
        <editor
          :init="{
            plugins: 'lists link image table code help wordcount',
            height: 500
          }"
          v-model="topicEventEdit.htmlBodyEmail"
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
  </a-drawer>
</template>
<script lang="ts">
import { useCommonStore, useNotificationEmailStore, useTopicEventStore } from '@/ui/store';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import Editor from '@tinymce/tinymce-vue';
import { Codemirror } from 'vue-codemirror';
import { jsonLanguage } from '@codemirror/lang-json';

interface FormState {
  name: string;
  description: string;
  eventExpression: string;
  notificationEmailId: string[],
  bodyEmail?: string,
  htmlBodyEmail?: string,
}

export default defineComponent({
  name: 'FormEditTopicEvent',
  components: { 'editor': Editor, Codemirror },
  setup() {
    // Code Editor
    const extensions = [jsonLanguage]
    
    const route = useRoute();
    const topicId = String(route.params.topicId);
    
    const common = useCommonStore();
    const { isDrawerShow, isLoadingButton } = storeToRefs(common);
    
    const storeTopicEvent = useTopicEventStore();
    const { topicEventEdit } = storeToRefs(storeTopicEvent);
    
    const storeNotificationStore = useNotificationEmailStore();
    const { optionNotificationEmail } = storeToRefs(storeNotificationStore);

    const onFinish = (values: FormState) => {
      values.htmlBodyEmail = topicEventEdit.value.htmlBodyEmail
      values.eventExpression = topicEventEdit.value.eventExpression
      common.setIsLoadingButton(true);
      storeTopicEvent.updateTopicEventById(
        topicId,
        topicEventEdit.value.id,
        values
      );
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    const onClose = () => {
      common.setIsDrawerShow(false);
    };

    return {
      extensions,
      optionNotificationEmail,
      topicEventEdit,
      onClose,
      isLoadingButton,
      isDrawerShow,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>
