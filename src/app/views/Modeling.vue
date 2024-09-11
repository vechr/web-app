<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import ModelingDataObject from '../components/ModelingDataObject.vue';
import { BaseEntity } from '@/core/base/domain/entities';
import { store, TStore } from '@/app/store';
import {
  camelize,
  transformFormtoBodyRequest,
} from '@/core/base/frameworks/utils';
import { PAGE_SIZE } from '@/core/base/domain/constant';
import {
  ESortMode,
  IListPaginationRequest,
  IListRequestQuery,
  TBy,
  TMetaPaginationResponse,
} from '@/core/base/domain/entities/protocol';

const formFields = ref<any>({});
const titleForm = ref('');
const descriptionForm = ref('');

const storeSelected = ref();
const domainSelected = ref<TStore>('user');

const params = ref<IListRequestQuery<IListPaginationRequest, TBy, any>>({
  filters: {
    pagination: {
      page: 1,
      limit: PAGE_SIZE,
    },
    sort: {
      by: 'createdAt',
      mode: ESortMode.ASC,
    },
    field: {
      name: {
        contains: '',
      },
    },
  },
});

const paginationResponse = ref<{
  meta: TMetaPaginationResponse;
  data: Pick<BaseEntity, 'id' | 'name'>[];
}>({
  data: [],
  meta: {
    count: 0,
    page: 1,
    total: 0,
    totalPage: 0,
  },
});

const onSave = async () => {
  const copyObject = Object.assign({}, formFields.value);
  delete copyObject.id;
  delete copyObject.createdAt;
  delete copyObject.updatedAt;

  const dataSave = transformFormtoBodyRequest<any>(copyObject);

  await storeSelected.value.usecase.upsert(dataSave, false, 'Notification');

  paginationResponse.value =
    await storeSelected.value.usecase.getListPagination(params.value);

  onNew();
};

const onDelete = async () => {
  if (formFields.value.id === undefined) return;
  if (formFields.value.id.value === undefined) return;

  await storeSelected.value.usecase.delete(formFields.value.id.value);
  paginationResponse.value =
    await storeSelected.value.usecase.getListPagination(params.value);

  if (paginationResponse.value.data.length == 0) {
    params.value.filters.pagination.page = 1;
    paginationResponse.value =
      await storeSelected.value.usecase.getListPagination(params.value);
  }

  onNew();
};

const onCopy = async () => {
  formFields.value.name.value += '-copy';

  await onSave();
};

const onNew = () => {
  storeSelected.value.onNew();
};

const onSearch = async (searchValue: string) => {
  params.value.filters.field.name.contains = searchValue;
  paginationResponse.value =
    await storeSelected.value.usecase.getListPagination(params.value);
};

const onDomainSelected = async (domain: string) => {
  domainSelected.value = camelize(domain) as TStore;
  storeSelected.value = store[domainSelected.value]();
  const { fields, title, description } = storeToRefs(
    storeSelected.value,
  ) as any;
  // Load important data
  await storeSelected.value.loadImportantData();
  // Schema of the fields
  formFields.value = fields.value;
  // Title of the modeling page
  titleForm.value = title.value;
  // Description of the modeling page
  descriptionForm.value = description.value;

  // pagination of the list objects
  paginationResponse.value =
    await storeSelected.value.usecase.getListPagination(params.value);
};

const onObjectSelected = async (objectSelected: string) => {
  await storeSelected.value.objectSelected(objectSelected);
};

const onChangePagination = async (pageNumber: number) => {
  params.value.filters.pagination.page = pageNumber;
  paginationResponse.value =
    await storeSelected.value.usecase.getListPagination(params.value);
};
</script>
<template>
  <ModelingDataObject
    :list-of-objects="paginationResponse.data"
    :page-size="PAGE_SIZE"
    :subject-role="domainSelected"
    :total="paginationResponse.meta.total"
    @on-search="onSearch"
    @on-change-pagination="onChangePagination"
    @on-save="onSave"
    @on-copy="onCopy"
    @on-delete="onDelete"
    @on-new="onNew"
    @on-domain-selected="onDomainSelected"
    @on-object-selected="onObjectSelected"
    :fields="formFields"
    :title="titleForm"
    :description="descriptionForm"
    :disabled="false"
    :layout="'vertical'"
  />
</template>
