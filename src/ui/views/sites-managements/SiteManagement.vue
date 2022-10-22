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
      Site Management
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
          :options="siteColumnsSort"
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
          v-if="can('sites:create@auth', 'any')"
        />
        <FormEdit v-if="can('sites:udpate@auth', 'any')" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-table
          v-if="data.length > 0"
          :dataSource="data"
          :columns="siteColumns"
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
                <a-button
                  v-if="can('sites:update@auth', 'any')"
                  type="primary"
                  size="small"
                  @click="onEdit(record)"
                >
                  <template #icon>
                    <EditOutlined />
                  </template>
                </a-button>
                <a-button
                  v-if="can('sites:delete@auth', 'any')"
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
              <span> There's no sites found! </span>
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
import { useAbility } from '@casl/vue';
import { useCommonStore, useSiteManagementStore } from '@/ui/store';
import {
  ESortMode,
  pageSizeOptions,
  Role,
  sortMode,
  TQueryParamsFieldName,
} from '@/domain';
import FormCreate from '@/ui/components/site-managements/FormCreate.vue';
import FormEdit from '@/ui/components/site-managements/FormEdit.vue';

export default defineComponent({
  name: 'RoleManagement',
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
    const ability = useAbility();
    const store = useSiteManagementStore();
    const { data, siteColumns, meta, siteColumnsSort } = storeToRefs(store);

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
      store.getSitePagination(params);
    };

    const onSearch = () => {
      store.getSitePagination(params);
    };

    onBeforeMount(() => {
      store.getSitePagination(params);
    });

    const onDelete = (record: Partial<Role>) => {
      if (record.id) store.deleteSiteById(record.id);
    };

    const onEdit = (record: any) => {
      common.setIsDrawerShow(true);
      store.getSiteById(record.id);
    };

    return {
      can: ability.can.bind(ability),
      siteColumnsSort,
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
      siteColumns,
      data,
    };
  },
});
</script>
