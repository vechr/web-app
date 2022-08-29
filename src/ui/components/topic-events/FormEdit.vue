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
          <vue-jsoneditor
            height="300" 
            :mode="'text'"
            :fullWidthButton="false"
            v-model:json="topicEventEdit.eventExpression" 
            @change="onChange"
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
import vueJsoneditor from 'vue3-ts-jsoneditor';
import { useCommonStore, useNotificationEmailStore, useTopicEventStore } from '@/ui/store';
import { storeToRefs } from 'pinia';
import { defineComponent, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { isJsonString } from '@/utils/jsonCheck';
import Editor from '@tinymce/tinymce-vue'

interface FormState {
  name: string;
  description: string;
  eventExpression: object;
  notificationEmailId: string[],
  bodyEmail?: string,
  htmlBodyEmail?: string,
}

export default defineComponent({
  name: 'FormEditTopicEvent',
  components: { vueJsoneditor, 'editor': Editor },
  setup() {
    const route = useRoute();
    const topicId = String(route.params.topicId);
    const json = ref({})

    const common = useCommonStore();
    const { isDrawerShow, isLoadingButton } = storeToRefs(common);

    const storeTopicEvent = useTopicEventStore();
    const { topicEventEdit } = storeToRefs(storeTopicEvent);


    const storeNotificationStore = useNotificationEmailStore();
    const { optionNotificationEmail } = storeToRefs(storeNotificationStore);

    onBeforeMount(() => {
      json.value = topicEventEdit.value.eventExpression
    });

    const onFinish = (values: FormState) => {
      values.eventExpression = json.value
      values.htmlBodyEmail = topicEventEdit.value.htmlBodyEmail
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

    const onChange = (value: any) => {
      if (isJsonString(value.text)) {
        json.value = JSON.parse(value.text)
      }
    }

    return {
      optionNotificationEmail,
      onChange,
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
