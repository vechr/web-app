<script lang="ts" setup>
import { reactive } from 'vue';
import { useAbility } from '@casl/vue';
import { listOfDomains } from '../store';
import { camelize } from '@/core/base/frameworks/utils';

const can = useAbility().can;

defineEmits(['onDomainSelected']);

const searchObject = reactive<{
  textForSearch: string;
  dataAfterSearch: string[];
}>({
  textForSearch: '',
  dataAfterSearch: listOfDomains,
});

const onChange = () => {
  searchObject.dataAfterSearch = listOfDomains.filter((val: string) => {
    return Object.values(val)
      .join('')
      .toLowerCase()
      .includes(searchObject.textForSearch.toLowerCase());
  });
};
</script>

<template>
  <a-input
    v-model:value="searchObject.textForSearch"
    placeholder="Search modeling model"
    style="margin-bottom: 10px"
    @change="onChange"
  />
  <a-list size="small" bordered :data-source="searchObject.dataAfterSearch">
    <template #renderItem="{ item }">
      <a-list-item v-if="can('read', camelize(item))">
        <a @click="$emit('onDomainSelected', item)">{{ item }}</a>
      </a-list-item>
    </template>
  </a-list>
</template>
