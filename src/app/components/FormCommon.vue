<script lang="ts" setup>
import { Dayjs } from 'dayjs';
import { toRefs } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { EFormItem } from '@/core/base/domain/entities/protocol';
import { filterOption } from '@/core/base/frameworks/utils';

const propsUnReactive = defineProps({
  field: {
    type: Object,
    required: true,
  },
});

const { field } = toRefs(propsUnReactive);
</script>
<template>
  <a-select
    v-if="field.type === EFormItem.Select"
    v-model:value="field.value"
    show-search
    :placeholder="field.placehorder"
    :options="field.options"
    :filter-option="filterOption"
    :bordered="field.bordered"
    :class="field.class"
    @change="field.change"
  />
  <a-select
    v-if="field.type === EFormItem.SelectMultiple"
    v-model:value="field.value"
    show-search
    :placeholder="field.placehorder"
    :options="field.options"
    :filter-option="filterOption"
    :mode="field.mode"
    :bordered="field.bordered"
    :class="field.class"
    @change="field.change"
  />
  <a-date-picker
    v-else-if="field.type === EFormItem.DatePicker"
    style="width: 100%"
    show-time
    v-model:value="field.value"
    :placeholder="field.placehorder"
    :class="field.class"
    :disabled="field.disabled"
    @change="
      function changeTanggal(date: Dayjs) {
        field.value = date.toISOString();
      }
    "
  />
  <a-input-password
    v-else-if="field.type === EFormItem.InputPassword"
    v-model:value="field.value"
    :placeholder="field.placehorder"
    :visibilityToggle="field.visibilityToggle"
    :bordered="field.bordered"
    :class="field.class"
    :allowClear="field.allowClear"
  >
    <template #prefix>
      <LockOutlined class="site-form-item-icon" />
    </template>
  </a-input-password>
  <a-checkbox
    v-else-if="field.type === EFormItem.Checkbox"
    v-model:checked="field.value"
  >
    {{ field.text ? field.text : field ? 'Yes' : 'No' }}
  </a-checkbox>
  <a-input
    v-else-if="field.type === EFormItem.InputUsername"
    v-model:value="field.value"
    :placeholder="field.placehorder"
    :disabled="field.disabled"
    :bordered="field.bordered"
    :size="field.size"
    :maxlength="field.maxlength"
    :allowClear="field.allowClear"
    :class="field.class"
  >
    <template #prefix>
      <UserOutlined class="site-form-item-icon" />
    </template>
  </a-input>
  <a-input
    v-else-if="field.type === EFormItem.Input"
    v-model:value="field.value"
    :placeholder="field.placehorder"
    :disabled="field.disabled"
    :bordered="field.bordered"
    :size="field.size"
    :maxlength="field.maxlength"
    :allowClear="field.allowClear"
    :class="field.class"
  /><a-input-number
    v-else-if="field.type === EFormItem.InputNumber"
    style="width: 100%"
    v-model:value="field.value"
    :placeholder="field.placehorder"
    :disabled="field.disabled"
    :bordered="field.bordered"
    :formatter="field.formatter"
    :parser="field.parser"
    :min="field.min"
    :max="field.max"
    :class="field.class"
  />
  <a-textarea
    v-else-if="field.type === EFormItem.TextArea"
    v-model:value="field.value"
    :placeholder="field.placehorder"
    :rows="field.rows"
    :showCount="field.showCount"
    :allowClear="field.allowClear"
    :autosize="field.autosize"
    :class="field.class"
  />
</template>
