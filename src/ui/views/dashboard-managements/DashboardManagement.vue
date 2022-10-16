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
      Dashboard Management
    </h2>
    <a-row>
      <a-col :span="24">
        <!-- Filter Pagination -->
        <a-input-search
          :bordered="false"
          placeholder="Find by name"
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
          :options="dashboardColumnsSort"
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
          v-if="dashboardList.length > 0"
          :dataSource="dashboardList"
          :columns="dashboardColumns"
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
            <template v-if="column.key === 'devices'">
              <a-space :size="10">
                <div v-if="record.devices.length > 0">
                  <a-tag
                    v-for="tag in record.devices"
                    :key="tag"
                    :color="`#${Math.floor(Math.random() * 16777215).toString(
                      16,
                    )}`"
                  >
                    {{ tag }}
                  </a-tag>
                </div>
                <div v-else>
                  <a-tag color="#f50">
                    {{ 'no devices'.toUpperCase() }}
                  </a-tag>
                </div>
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
              <span> There's no dashboard item found! </span>
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
import FormCreate from '@/ui/components/dashboard-managements/FormCreate.vue';
import FormEdit from '@/ui/components/dashboard-managements/FormEdit.vue';
import {
  useCommonStore,
  useDashboardManagementStore,
  useDeviceManagementStore,
} from '@/ui/store';
import {
  ESortMode,
  IDashboard,
  TQueryParamsFieldName,
  pageSizeOptions,
  sortMode,
} from '@/domain';

export default defineComponent({
  components: {
    FormCreate,
    DeleteOutlined,
    EditOutlined,
    FormEdit,
    SortAscendingOutlined,
    SortDescendingOutlined,
    FieldTimeOutlined,
  },
  name: 'DashboardManagement',
  setup() {
    const deviceStore = useDeviceManagementStore();
    const store = useDashboardManagementStore();
    const common = useCommonStore();

    const { isLoadingActive } = storeToRefs(common);
    const { dashboardList, meta, dashboardColumns, dashboardColumnsSort } =
      storeToRefs(store);

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
      store.getDashboardPagination(params);
    };

    const onSearch = () => {
      store.getDashboardPagination(params);
    };

    onBeforeMount(() => {
      deviceStore.getOptionDevice();
      store.getDashboardPagination(params);
    });

    const onDelete = (record: IDashboard) => {
      store.deleteDashboardById(record.id);
    };

    const onEdit = (record: IDashboard) => {
      common.setIsDrawerShow(true);
      store.getDashboardById(record.id);
    };

    return {
      dashboardColumnsSort,
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
      dashboardColumns,
      dashboardList,
    };
  },
});
</script>

<style>
.center-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 60vh;
}
</style>
