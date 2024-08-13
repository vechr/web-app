<script lang="ts" setup>
import { PropType, toRefs } from 'vue';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons-vue';
import FormCommon from './FormCommon.vue';
import FormRecursive from './FormRecursive.vue';
import { EFormItem } from '@/core/base/domain/entities/protocol';
import {
  getDynamicObject,
  stringSplitByCapital,
} from '@/core/base/frameworks/utils';

const propsUnReactive = defineProps({
  titleForm: {
    type: String,
    required: false,
  },
  fields: {
    type: Object as PropType<Record<string, any>>,
    required: true,
  },
  parentFieldName: {
    type: Array as PropType<string[]>,
    required: true,
  },
  isArray: {
    type: Boolean,
    required: false,
  },
});

const { fields, titleForm } = toRefs(propsUnReactive);
const dynamicObjectCollection = getDynamicObject(fields.value);

const removeItem = (fieldName: string, index: number) => {
  fields.value[fieldName].value.splice(index, 1);
};

const addItem = (fieldName: string) => {
  fields.value[fieldName].value.push(
    JSON.parse(JSON.stringify(dynamicObjectCollection[fieldName])),
  );
};
</script>

<template>
  <!--  This is title for Form -->
  <a-divider
    class="form-title"
    v-if="titleForm"
    orientation="left"
    orientation-margin="0px"
  >
    <a-typography-title :level="3">{{ titleForm }}</a-typography-title>
  </a-divider>
  <div
    v-for="(fieldName, objectIndex) in Object.keys(fields)"
    :key="objectIndex"
  >
    <!-- -------------------------------------------------------------------------------------------------- -->
    <!-- Form Dynamic model Array -->
    <div
      class="form-layout"
      v-if="fields[fieldName].type === EFormItem.FormDynamicArray"
    >
      <!--  This is title for Form Dynamic model Array -->
      <a-divider
        class="form-title"
        v-if="fields[fieldName].titleForm"
        orientation="left"
        orientation-margin="0px"
      >
        <a-typography-title :level="4">{{
          fields[fieldName].titleForm
        }}</a-typography-title>
      </a-divider>
      <div
        v-for="(fieldChilds, arrayIndex) in fields[fieldName].value"
        :key="arrayIndex"
      >
        <FormRecursive
          :fields="fieldChilds"
          :is-array="true"
          :parent-field-name="
            parentFieldName.concat([fieldName, arrayIndex.toString()])
          "
        />
        <div style="margin-bottom: 30px" class="pull-right">
          <a-button
            type="primary"
            @click="removeItem(fieldName, arrayIndex)"
            class="btn-warning"
          >
            <template #icon>
              <MinusCircleOutlined />
            </template>
            Remove
          </a-button>
        </div>
      </div>
      <a-form-item>
        <a-button type="dashed" block @click="addItem(fieldName)">
          <PlusOutlined />
          Add
        </a-button>
      </a-form-item>
    </div>
    <!-- -------------------------------------------------------------------------------------------------- -->
    <!-- Form Common -->
    <a-form-item
      v-else
      :label="
        !fields[fieldName].hideLabel
          ? `${stringSplitByCapital(
              `${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1).replace('Id', '')}`,
            )} :`
          : ''
      "
      :name="parentFieldName.concat(fieldName)"
      has-feedback
      :rules="fields[fieldName].rules"
    >
      <!-- -------------------------------------------------------------------------------------------------- -->
      <!-- Form Dynamic model object -->
      <div
        v-if="fields[fieldName].type === EFormItem.FormDynamic"
        class="form-layout"
      >
        <FormRecursive
          :fields="fields[fieldName].value"
          :title-form="fields[fieldName].titleForm"
          :parent-field-name="parentFieldName.concat(fieldName)"
          :is-array="false"
        />
      </div>
      <div>
        <FormCommon :field="fields[fieldName]" />
      </div>
    </a-form-item>
  </div>
</template>
