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
      Email Notification Management
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
          :options="notificationEmailColumnsSort"
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
          v-if="can('email-notifications:create@auth', 'any')"
        />
        <FormEdit v-if="can('email-notifications:update@auth', 'any')" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-table
          v-if="notificationEmailList.length > 0"
          :dataSource="notificationEmailList"
          :columns="notificationEmailTypeColumns"
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
                  v-if="can('email-notifications:update@auth', 'any')"
                  type="primary"
                  size="small"
                  @click="onEdit(record)"
                >
                  <template #icon>
                    <EditOutlined />
                  </template>
                </a-button>
                <a-button
                  v-if="can('email-notifications:delete@auth', 'any')"
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
              <span> There's no email notifications item found! </span>
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
  FieldTimeOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';
import { defineComponent, onBeforeMount, reactive } from 'vue';
import { useAbility } from '@casl/vue';
import {
  useCommonStore,
  useNotificationEmailManagementStore,
} from '@/ui/store';
import {
  ESortMode,
  INotificationEmail,
  pageSizeOptions,
  sortMode,
  TQueryParamsFieldName,
} from '@/domain';
import FormCreate from '@/ui/components/notification-email-managements/FormCreate.vue';
import FormEdit from '@/ui/components/notification-email-managements/FormEdit.vue';

export default defineComponent({
  name: 'NotificationEmail',
  components: {
    DeleteOutlined,
    EditOutlined,
    FormCreate,
    FormEdit,
    SortAscendingOutlined,
    SortDescendingOutlined,
    FieldTimeOutlined,
  },
  setup() {
    const ability = useAbility();
    const common = useCommonStore();
    const { isLoadingActive } = storeToRefs(common);

    const store = useNotificationEmailManagementStore();
    const {
      notificationEmailList,
      notificationEmailTypeColumns,
      meta,
      notificationEmailColumnsSort,
    } = storeToRefs(store);

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
      store.getNotificationEmailPagination(params);
    };

    const onSearch = () => {
      store.getNotificationEmailPagination(params);
    };

    const onEdit = (record: INotificationEmail) => {
      common.setIsDrawerShow(true);
      store.getNotificationEmailById(record.id);
    };

    const onDelete = (record: INotificationEmail) => {
      store.deleteNotificationEmailById(record.id);
    };

    onBeforeMount(() => {
      store.getNotificationEmailPagination(params);
    });

    return {
      can: ability.can.bind(ability),
      notificationEmailColumnsSort,
      onSearch,
      meta,
      ESortMode,
      params,
      sortMode,
      pageSizeOptions,
      onChangePagination,
      isLoadingActive,
      notificationEmailList,
      notificationEmailTypeColumns,
      onEdit,
      onDelete,
    };
  },
});
</script>
