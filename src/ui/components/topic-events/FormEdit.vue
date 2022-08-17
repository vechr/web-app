<template>
  <a-drawer
    title="Edit Topic Event"
    :visible="isDrawerShow"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
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
            height="600" 
            :mode="'text'"
            :fullWidthButton="false"
            v-model:json="topicEventEdit.eventExpression" 
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
  </a-drawer>
</template>
<script lang="ts">
import vueJsoneditor from 'vue3-ts-jsoneditor';
import { useCommonStore, useTopicEventStore } from '@/ui/store';
import { storeToRefs } from 'pinia';
import { defineComponent, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { isJsonString } from '@/utils/jsonCheck';

interface FormState {
  name: string;
  description: string;
  eventExpression: object;
}

export default defineComponent({
  name: 'FormEdit',
  components: { vueJsoneditor },
  setup() {
    const route = useRoute();
    const topicId = String(route.params.topicId);
    const json = ref({})

    const common = useCommonStore();
    const { isDrawerShow, isLoadingButton } = storeToRefs(common);

    const storeTopicEvent = useTopicEventStore();
    const { topicEventEdit } = storeToRefs(storeTopicEvent);

    onBeforeMount(() => {
      json.value = topicEventEdit.value.eventExpression
    });

    const onFinish = (values: FormState) => {
      values.eventExpression = json.value
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
