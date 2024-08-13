<script lang="ts" setup>
import { PropType, ref, toRefs } from 'vue';
import Form from '../components/Form.vue';
import ListOfObject from '../components/ListOfObject.vue';
import listOfDomain from '../components/ListOfDomain.vue';
import { TFormLayout } from '@/core/base/domain/entities/protocol';
import { BaseEntity } from '@/core/base/domain/entities';

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
  layout: {
    type: String as PropType<TFormLayout>,
    required: false,
    default: 'vertical',
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  fields: {
    type: Object as PropType<Record<string, any>>,
    required: true,
  },
  listOfObjects: {
    type: Array as PropType<Pick<BaseEntity, 'id' | 'name'>[]>,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
  pageSizeOptions: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => ['10', '25', '50', '75', '100', '125', '150', '170', '200'],
  },
});

// For Sidebar objects
const { listOfObjects, total, pageSize, pageSizeOptions } =
  toRefs(propsUnReactive);

// For Form objects
const { subjectRole, fields, title, description, layout, disabled } =
  toRefs(propsUnReactive);

const collapsedDomain = ref<boolean>(false);
const collapsedObjects = ref<boolean>(false);

defineEmits([
  'onSearch',
  'onChangePagination',
  'onSave',
  'onDelete',
  'onCopy',
  'onNew',
  'onDomainSelected',
  'onObjectSelected',
]);
</script>
<template>
  <a-layout class="modeling-layout-1">
    <a-layout-sider
      v-model:collapsed="collapsedDomain"
      collapsible
      class="modeling-sidebar-1"
    >
      <div class="modeling-sidebar-list-1">
        <listOfDomain @on-domain-selected="$emit('onDomainSelected', $event)" />
      </div>
    </a-layout-sider>
    <a-layout-content class="modeling-content-1">
      <div class="modeling-content-1-1">
        <a-layout class="modeling-layout-2">
          <a-layout-sider
            v-model:collapsed="collapsedObjects"
            collapsible
            class="modeling-sidebar-2"
          >
            <div class="modeling-sidebar-list-2">
              <ListOfObject
                :list-of-objects="listOfObjects"
                :page-size="pageSize"
                :total="total"
                :page-size-options="pageSizeOptions"
                @on-search="$emit('onSearch', $event)"
                @on-change-pagination="$emit('onChangePagination', $event)"
                @on-object-selected="$emit('onObjectSelected', $event)"
              />
            </div>
          </a-layout-sider>
          <a-layout-content class="modeling-content-2">
            <Form
              v-if="Object.keys(fields).length > 0"
              :fields="fields"
              :title="title"
              :subject-role="subjectRole"
              :description="description"
              :disabled="disabled"
              :layout="layout"
              @on-save="$emit('onSave')"
              @on-copy="$emit('onCopy')"
              @on-delete="$emit('onDelete')"
              @on-new="$emit('onNew')"
            />
            <div v-else class="empty-form">
              <a-empty :description="'There\'s no domain being selected'" />
            </div>
          </a-layout-content>
        </a-layout>
      </div>
    </a-layout-content>
  </a-layout>
</template>
