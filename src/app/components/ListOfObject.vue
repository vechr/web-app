<script lang="ts" setup>
import { PropType, reactive, toRefs } from 'vue';
import { BaseEntity } from '@/core/base/domain/entities';

const pagination = reactive({
  search: '',
  pageNumber: 1,
});

defineEmits(['onSearch', 'onChangePagination', 'onObjectSelected']);
const props = defineProps({
  pageSizeOptions: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => ['10', '25', '50', '75', '100', '125', '150', '170', '200'],
  },
  listOfObjects: {
    type: Array as PropType<Pick<BaseEntity, 'id' | 'name'>[]>,
    required: true,
    default: () => [],
  },
  total: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
});

const { listOfObjects, pageSizeOptions, total, pageSize } = toRefs(props);
</script>
<template>
  <div style="text-align: center">
    <a-input-search
      v-model:value="pagination.search"
      placeholder="Search modeling data"
      style="margin-bottom: 10px"
      @search="$emit('onSearch', pagination.search)"
      enter-button
    />
    <a-list size="small" bordered :data-source="listOfObjects">
      <template #renderItem="{ item }">
        <a-list-item>
          <a @click="$emit('onObjectSelected', item.id)">{{ item.name }}</a>
        </a-list-item>
      </template>
    </a-list>
    <a-pagination
      style="margin-top: 20px"
      :total="total"
      size="small"
      :pageSizeOptions="pageSizeOptions"
      v-model:pageSize="pageSize"
      v-model:current="pagination.pageNumber"
      @change="$emit('onChangePagination', pagination.pageNumber)"
      show-quick-jumper
    />
  </div>
</template>
