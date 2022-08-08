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
        <json-editor-vue
          class="editor"
          name="eventExpression"
          v-model="topicEventEdit.eventExpression"
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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import JsonEditorVue from "json-editor-vue3"
import { useCommonStore, useTopicEventStore } from "@/store"
import { storeToRefs } from "pinia"
import { defineComponent } from "vue"
import { useRoute } from "vue-router"

interface FormState {
  name: string
  description: string
  eventExpression: object
}

export default defineComponent({
  name: "FormEdit",
  components: { JsonEditorVue },
  setup() {
    const route = useRoute()
    const topicId = route.params.topicId

    const common = useCommonStore()
    const { isDrawerShow, isLoadingButton } = storeToRefs(common)

    const storeTopicEvent = useTopicEventStore()
    const { topicEventEdit, dataDetails } = storeToRefs(storeTopicEvent)

    const onFinish = (values: FormState) => {
      common.setIsLoadingButton(true)
      storeTopicEvent.updateTopicEventById(
        topicId,
        dataDetails.value.id,
        values
      )
    }

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo)
    }

    const onClose = () => {
      common.setIsDrawerShow(false)
    }

    return {
      topicEventEdit,
      onClose,
      isLoadingButton,
      isDrawerShow,
      onFinish,
      onFinishFailed,
    }
  },
})
</script>
