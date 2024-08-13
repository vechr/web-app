<script lang="ts" setup>
import { PropType, ref, toRefs } from 'vue';
import {
  DeleteOutlined,
  CopyOutlined,
  SaveOutlined,
  AppstoreAddOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons-vue';
import { useAbility } from '@casl/vue';
import FormRecursive from './FormRecursive.vue';
import { TFormLayout } from '@/core/base/domain/entities/protocol';
import { transformFormtoBodyRequest } from '@/core/base/frameworks/utils';

const propsUnReactive = defineProps({
  title: {
    type: String,
    required: false,
  },
  subjectRole: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  fields: {
    type: Object as PropType<Record<string, any>>,
    required: true,
  },
  layout: {
    type: String as PropType<TFormLayout>,
    required: false,
    default: 'vertical',
  },
  disabled: {
    type: Boolean,
    required: false,
  },
});

const can = useAbility().can;

const { disabled, fields, layout } = toRefs(propsUnReactive);
const emit = defineEmits(['onSave', 'onDelete', 'onCopy', 'onNew']);

const formRef = ref();
const onSave = () => {
  formRef.value
    .validate()
    .then(() => {
      emit('onSave');
      formRef.value.resetFields();
    })
    .catch(() => {});
};

const onCopy = () => {
  formRef.value
    .validate()
    .then(() => {
      emit('onCopy');
      formRef.value.resetFields();
    })
    .catch(() => {});
};
</script>

<template>
  <a-page-header class="form-header">
    <template #tags>
      <a-typography-title :level="3">{{ title }}</a-typography-title>
      <a-typography-paragraph>{{ description }}</a-typography-paragraph>
    </template>
    <template #extra>
      <a-flex :justify="'flex-end'" :align="'center'" wrap="wrap" gap="small">
        <a-button
          v-if="can('create', subjectRole)"
          key="2"
          class="btn-info btn-min-width"
          type="primary"
          @click="$emit('onNew')"
          ><template #icon> <AppstoreAddOutlined /> </template>New</a-button
        >
        <a-button
          v-if="
            fields.name.value !== 'root' &&
            fields.name.value !== 'admin' &&
            fields.id.value !== '' &&
            can('create', subjectRole)
          "
          key="2"
          class="btn-min-width"
          type="primary"
          @click="onCopy"
          ><template #icon> <CopyOutlined /> </template>Copy</a-button
        >
        <a-popconfirm
          v-if="
            fields.name.value !== 'root' &&
            fields.name.value !== 'admin' &&
            fields.id.value !== '' &&
            can('delete', subjectRole)
          "
          title="Are you sure want to delete this item?"
          ok-text="Delete"
          cancel-text="Cancel"
          placement="topLeft"
          @confirm="$emit('onDelete')"
        >
          <template #icon
            ><question-circle-outlined style="color: red"
          /></template>
          <a-button key="3" class="btn-min-width" type="primary" danger
            ><template #icon> <DeleteOutlined /> </template>Delete</a-button
          >
        </a-popconfirm>
        <a-button
          v-if="can('update', subjectRole)"
          key="3"
          class="btn-success btn-min-width"
          type="primary"
          @click="onSave"
          ><template #icon> <SaveOutlined /> </template>Save</a-button
        >
      </a-flex>
    </template>
  </a-page-header>
  <a-form
    ref="formRef"
    :disabled="disabled"
    :layout="layout"
    :v-bind="{ labelCol: { span: 1 }, wrapperCol: { span: 14 } }"
    :model="transformFormtoBodyRequest(fields)"
    class="form-layout"
  >
    <FormRecursive :fields="fields" :is-array="false" :parent-field-name="[]" />
  </a-form>
</template>
