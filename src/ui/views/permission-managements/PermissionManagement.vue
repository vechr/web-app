<template>
  <div v-if="!isLoadingActive">
    <h2
      :style="{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '50px',
      }"
      class="responsive-text"
    >
      List of Permission
    </h2>
    <a-row>
      <a-col :span="24">
        <!-- Filter Pagination -->
        <a-input-search
          :bordered="false"
          placeholder="Find by Name"
          enter-button
          class="table-input-search"
          v-model:value="params.filters.field.name.contains"
          @search="onSearch"
        />
        <a-select
          class="table-filter"
          ref="select"
          v-model:value="params.filters.sort.mode"
          :options="sortMode"
          @change="onSearch"
        >
          <template #suffixIcon
            ><sort-ascending-outlined
              v-if="params.filters.sort.mode === ESortMode.ASC"
              class="ant-select-suffix" /><sort-descending-outlined
              v-else
              class="ant-select-suffix"
          /></template>
        </a-select>
        <a-select
          class="table-filter"
          ref="select"
          v-model:value="params.filters.sort.by"
          :options="permissionColumnsSort"
          @change="onSearch"
        >
          <template #suffixIcon
            ><field-time-outlined class="ant-select-suffix"
          /></template>
        </a-select>
        <a-input-number
          id="inputLimit"
          v-model:value="params.filters.pagination.limit"
          :min="1"
          class="table-filter"
          @change="onSearch"
        />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-table
          v-if="data.length > 0"
          :dataSource="data"
          :columns="permissionColumns"
          :scroll="{ x: 1200 }"
          :pagination="false"
        >
        </a-table>
        <div v-else class="center-screen">
          <a-empty
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
            :image-style="{
              height: '60px',
            }"
          >
            <template #description>
              <span> There's no permissions found! </span>
            </template>
          </a-empty>
        </div>
        <!-- Pagination -->
        <div class="pagination-table">
          <a-pagination
            v-model:current="params.filters.pagination.page"
            v-model:pageSize="params.filters.pagination.limit"
            :pageSizeOptions="pageSizeOptions"
            show-quick-jumper
            :total="meta?.total"
            @change="onChangePagination"
          />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent, onBeforeMount, reactive } from 'vue';
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons-vue';
import { useCommonStore, usePermissionManagementStore } from '@/ui/store';
import {
  ESortMode,
  pageSizeOptions,
  sortMode,
  TQueryParamsFieldName,
} from '@/domain';

export default defineComponent({
  name: 'PermissionManagement',
  components: {
    SortAscendingOutlined,
    SortDescendingOutlined,
    FieldTimeOutlined,
  },
  setup() {
    const store = usePermissionManagementStore();
    const { data, permissionColumns, meta, permissionColumnsSort } =
      storeToRefs(store);

    const common = useCommonStore();
    const { isLoadingActive } = storeToRefs(common);

    const params = reactive<TQueryParamsFieldName>({
      filters: {
        pagination: {
          page: 1,
          limit: 10,
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

    const onChangePagination = (pageNumber: number, pageSize: number) => {
      params.filters.pagination.limit = pageSize;
      params.filters.pagination.page = pageNumber;
      store.getPermissionPagination(params);
    };

    const onSearch = () => {
      store.getPermissionPagination(params);
    };

    onBeforeMount(() => {
      store.getPermissionPagination(params);
    });

    return {
      permissionColumnsSort,
      onSearch,
      meta,
      ESortMode,
      params,
      sortMode,
      pageSizeOptions,
      onChangePagination,
      isLoadingActive,
      permissionColumns,
      data,
    };
  },
});
</script>
