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
      Device Management
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
          :options="deviceColumnsSort"
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
        <FormCreate style="float: right; margin-bottom: 20px" />
        <FormEdit />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-table
          v-if="deviceList.length > 0"
          :dataSource="deviceList"
          :columns="deviceColumns"
          :scroll="{ x: 1200 }"
          :pagination="false"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
              <router-link
                :to="{
                  name: 'topic-managements',
                  params: { deviceId: record.id },
                }"
                >{{ record.name }}</router-link
              >
            </template>
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
            <template v-if="column.key === 'isActive'">
              <span
                :style="{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }"
              >
                <CheckCircleFilled
                  :style="{ color: 'green' }"
                  v-if="record.isActive"
                />
              </span>
            </template>
            <template v-if="column.key === 'topics'">
              <a-space :size="10">
                <div v-if="record.topics.length > 0">
                  <a-tag
                    v-for="tag in record.topics"
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
                    {{ 'no topics'.toUpperCase() }}
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
import {
  DeleteOutlined,
  EditOutlined,
  CheckCircleFilled,
  SortAscendingOutlined,
  SortDescendingOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';
import { defineComponent, onBeforeMount, reactive } from 'vue';
import {
  useCommonStore,
  useDeviceManagementStore,
  useDeviceTypeManagementStore,
} from '@/ui/store';
import {
  ESortMode,
  IDevice,
  pageSizeOptions,
  sortMode,
  TQueryParamsFieldName,
} from '@/domain';
import FormCreate from '@/ui/components/device-managements/FormCreate.vue';
import FormEdit from '@/ui/components/device-managements/FormEdit.vue';

export default defineComponent({
  name: 'DeviceManagement',
  components: {
    DeleteOutlined,
    EditOutlined,
    CheckCircleFilled,
    FormCreate,
    FormEdit,
    SortAscendingOutlined,
    SortDescendingOutlined,
    FieldTimeOutlined,
  },
  setup() {
    const common = useCommonStore();
    const { isLoadingActive } = storeToRefs(common);

    const store = useDeviceManagementStore();
    const storeDeviceType = useDeviceTypeManagementStore();
    const { deviceList, deviceColumns, deviceColumnsSort, meta } =
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

    const onSearch = () => {
      store.getDevicePagination(params);
    };

    const onChangePagination = (pageNumber: number, pageSize: number) => {
      params.filters.pagination.limit = pageSize;
      params.filters.pagination.page = pageNumber;
      store.getDevicePagination(params);
    };

    const onDelete = (record: IDevice) => {
      store.deleteDeviceById(record.id);
    };

    onBeforeMount(() => {
      store.getDevicePagination(params);
      storeDeviceType.getOptionDeviceType();
    });

    const onEdit = (record: IDevice) => {
      common.setIsDrawerShow(true);
      store.getDeviceById(record.id);
    };

    return {
      pageSizeOptions,
      meta,
      deviceColumnsSort,
      sortMode,
      onSearch,
      ESortMode,
      params,
      onChangePagination,
      isLoadingActive,
      deviceList,
      deviceColumns,
      onDelete,
      onEdit,
    };
  },
});
</script>

<style></style>
