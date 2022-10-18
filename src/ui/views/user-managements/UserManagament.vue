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
      User Management
    </h2>
    <a-row>
      <a-col :span="24">
        <!-- Filter Pagination -->
        <a-input-search
          :bordered="false"
          placeholder="Find by Username"
          enter-button
          class="table-input-search"
          v-model:value="params.filters.field.username.contains"
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
          :options="userColumnsSort"
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
        <!-- Create Data -->
        <FormCreate
          style="float: right; margin-bottom: 20px"
          class="table-btn-create"
        />
        <FormEdit />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-table
          v-if="data.length > 0"
          :dataSource="data"
          :columns="userColumns"
          :scroll="{ x: 1200 }"
          :pagination="false"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <a-space
                :size="10"
                :style="{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }"
              >
                <a-button type="primary" size="small" @click="onEdit(record)">
                  <template #icon>
                    <EditOutlined />
                  </template>
                </a-button>
                <a-button
                  type="primary"
                  size="small"
                  danger
                  @click="onDelete(record)"
                >
                  <template #icon>
                    <DeleteOutlined />
                  </template>
                </a-button>
              </a-space>
            </template>
          </template>
        </a-table>
        <div v-else class="center-screen">
          <a-empty
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
            :image-style="{
              height: '60px',
            }"
          >
            <template #description>
              <span> There's no users found! </span>
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
  DeleteOutlined,
  EditOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons-vue';
import {
  useCommonStore,
  useRoleManagements,
  useUserManagementStore,
} from '@/ui/store';
import {
  ESortMode,
  pageSizeOptions,
  sortMode,
  TQueryParamsFieldUsername,
  TUser,
} from '@/domain';
import FormCreate from '@/ui/components/users/FormCreate.vue';
import FormEdit from '@/ui/components/users/FormEdit.vue';

export default defineComponent({
  name: 'UserManagement',
  components: {
    DeleteOutlined,
    EditOutlined,
    SortAscendingOutlined,
    SortDescendingOutlined,
    FieldTimeOutlined,
    FormCreate,
    FormEdit,
  },
  setup() {
    const store = useUserManagementStore();
    const { data, userColumns, meta, userColumnsSort } = storeToRefs(store);

    const common = useCommonStore();
    const { isLoadingActive } = storeToRefs(common);

    const roles = useRoleManagements();

    const params = reactive<TQueryParamsFieldUsername>({
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
          username: {
            contains: '',
          },
        },
      },
    });

    const onChangePagination = (pageNumber: number, pageSize: number) => {
      params.filters.pagination.limit = pageSize;
      params.filters.pagination.page = pageNumber;
      store.getUserPagination(params);
    };

    const onSearch = () => {
      store.getUserPagination(params);
    };

    onBeforeMount(() => {
      roles.getOptionRole();
      store.getUserPagination(params);
    });

    const onDelete = (record: Partial<TUser>) => {
      if (record.id) store.deleteUserById(record.id);
    };

    const onEdit = (record: any) => {
      common.setIsDrawerShow(true);
      store.getUserById(record.id);
    };

    return {
      userColumnsSort,
      onSearch,
      meta,
      ESortMode,
      params,
      sortMode,
      pageSizeOptions,
      onChangePagination,
      onEdit,
      onDelete,
      isLoadingActive,
      userColumns,
      data,
    };
  },
});
</script>

<style></style>
