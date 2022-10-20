<template>
  <a-breadcrumb>
    <a-breadcrumb-item>
      <router-link to="/device" custom v-slot="{ navigate, href }">
        <a @click="navigate" :href="href">Device Management</a>
      </router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item>Topic</a-breadcrumb-item>
  </a-breadcrumb>
  <div v-if="!isLoadingActive">
    <h2
      :style="{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '50px',
        marginTop: '50px',
      }"
      class="responsive-text"
    >
      Topic Management
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
          :options="topicColumnsSort"
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
          v-if="topicList.length > 0"
          :dataSource="topicList"
          :columns="topicColumns"
          :scroll="{ x: 1200 }"
          :pagination="false"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
              <router-link
                :to="{
                  name: 'topic-event',
                  params: { deviceId: deviceId, topicId: record.id },
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
            <template v-if="column.key === 'widgetType'">
              <a-space :size="10">
                <div v-if="record.widgetType">
                  <a-tag
                    :color="`#${Math.floor(Math.random() * 16777215).toString(
                      16,
                    )}`"
                  >
                    {{ record.widgetType }}
                  </a-tag>
                </div>
                <div v-else>
                  <a-tag color="#2285b4">
                    {{ 'not defined'.toUpperCase() }}
                  </a-tag>
                </div>
              </a-space>
            </template>
            <template v-if="column.key === 'topicEvents'">
              <a-space :size="10">
                <div v-if="record.topicEvents.length > 0">
                  <a-tag
                    v-for="tag in record.topicEvents"
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
                    {{ 'no topic events'.toUpperCase() }}
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
  FieldTimeOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, onBeforeMount, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import FormCreate from '@/ui/components/topic-managements/FormCreate.vue';
import FormEdit from '@/ui/components/topic-managements/FormEdit.vue';
import { useCommonStore, useTopicManagementStore } from '@/ui/store';
import {
  ESortMode,
  ITopic,
  pageSizeOptions,
  sortMode,
  TQueryParamsFieldName,
} from '@/domain';

export default defineComponent({
  name: 'TopicManagement',
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
    const route = useRoute();
    const deviceId = String(route.params.deviceId);

    const common = useCommonStore();
    const { isLoadingActive } = storeToRefs(common);

    const topicStore = useTopicManagementStore();
    const { topicList, topicColumns, meta, topicColumnsSort } =
      storeToRefs(topicStore);

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
      topicStore.getTopicPagination(deviceId, params);
    };

    onBeforeMount(() => {
      topicStore.getTopicPagination(deviceId, params);
    });

    const onSearch = () => {
      topicStore.getTopicPagination(deviceId, params);
    };

    const onDelete = (record: ITopic) => {
      topicStore.deleteTopicById(deviceId, record.id);
    };

    const onEdit = (record: ITopic) => {
      common.setIsDrawerShow(true);
      topicStore.getTopicById(deviceId, record.id);
    };

    return {
      topicColumnsSort,
      onSearch,
      meta,
      ESortMode,
      params,
      sortMode,
      pageSizeOptions,
      onChangePagination,
      deviceId,
      isLoadingActive,
      topicList,
      topicColumns,
      onDelete,
      onEdit,
    };
  },
});
</script>

<style></style>
