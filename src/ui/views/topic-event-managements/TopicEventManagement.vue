<template>
  <a-breadcrumb>
    <a-breadcrumb-item>
      <router-link to="/device" custom v-slot="{ navigate, href }">
        <a @click="navigate" :href="href">Device Management</a>
      </router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item>
      <router-link
        :to="{ name: 'topic-managements', params: { deviceId: deviceId } }"
        custom
        v-slot="{ navigate, href }"
      >
        <a @click="navigate" :href="href">Topic Management</a>
      </router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item>Topic Event</a-breadcrumb-item>
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
      Topic Event
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
          :options="topicEventColumnsSort"
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
          v-if="can('topic-events:create@auth', 'any')"
        />
        <FormEdit v-if="can('topic-events:update@auth', 'any')" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-table
          v-if="topicEventList.length > 0"
          :dataSource="topicEventList"
          :columns="topicEventColumns"
          :scroll="{ x: 1200 }"
          :pagination="false"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'notificationEmailId'">
              <a-space :size="10">
                <div v-if="record.notificationEmailId.length > 0">
                  <a-tag
                    v-for="tag in record.notificationEmailId"
                    :key="tag"
                    :color="`#${Math.floor(Math.random() * 16777215).toString(
                      16,
                    )}`"
                  >
                    {{ hashMapNotificationEmailList.get(tag) }}
                  </a-tag>
                </div>
                <div v-else>
                  <a-tag color="#f50">
                    {{ 'no Notification Email'.toUpperCase() }}
                  </a-tag>
                </div>
              </a-space>
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
                <a-button
                  v-if="can('topic-events:update@auth', 'any')"
                  type="primary"
                  size="small"
                  @click="onEdit(record)"
                >
                  <template #icon>
                    <EditOutlined />
                  </template>
                </a-button>
                <a-button
                  v-if="can('topic-events:delete@auth', 'any')"
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
              <span> There's no topic events item found! </span>
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
import { useRoute } from 'vue-router';
import { useAbility } from '@casl/vue';
import {
  useTopicEventManagementStore,
  useCommonStore,
  useNotificationEmailManagementStore,
} from '@/ui/store';
import {
  ESortMode,
  ITopicEvent,
  pageSizeOptions,
  sortMode,
  TQueryParamsFieldName,
} from '@/domain';
import FormCreate from '@/ui/components/topic-event-managements/FormCreate.vue';
import FormEdit from '@/ui/components/topic-event-managements/FormEdit.vue';

export default defineComponent({
  name: 'TopicEvent',
  components: {
    FormEdit,
    FormCreate,
    DeleteOutlined,
    EditOutlined,
    SortAscendingOutlined,
    SortDescendingOutlined,
    FieldTimeOutlined,
  },
  setup() {
    const ability = useAbility();
    const route = useRoute();
    const deviceId = String(route.params.deviceId);
    const topicId = String(route.params.topicId);

    const common = useCommonStore();
    const { isLoadingActive } = storeToRefs(common);

    const topicEventStore = useTopicEventManagementStore();
    const {
      topicEventColumnsSort,
      topicEventEdit,
      topicEventList,
      topicEventColumns,
      meta,
    } = storeToRefs(topicEventStore);

    const notificationEmailStore = useNotificationEmailManagementStore();
    const { hashMapNotificationEmailList } = storeToRefs(
      notificationEmailStore,
    );

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
      topicEventStore.getTopicEventPagination(topicId, params);
    };

    const onSearch = () => {
      topicEventStore.getTopicEventPagination(topicId, params);
    };

    onBeforeMount(() => {
      topicEventStore.getTopicEventPagination(topicId, params);
      notificationEmailStore.getNotificationEmailList();
    });

    const onDelete = (record: ITopicEvent) => {
      topicEventStore.deleteTopicEventById(topicId, record.id);
    };

    const onEdit = (record: ITopicEvent) => {
      common.setIsDrawerShow(true);
      const topicEventFound: ITopicEvent | undefined =
        topicEventList.value.find((val) => val.id == record.id);
      if (topicEventFound !== undefined) {
        topicEventEdit.value.id = topicEventFound.id;
        topicEventEdit.value.description = topicEventFound.description;
        topicEventEdit.value.name = topicEventFound.name;
        topicEventEdit.value.notificationEmailId =
          topicEventFound.notificationEmailId;
        topicEventEdit.value.bodyEmail = topicEventFound.bodyEmail;
        topicEventEdit.value.htmlBodyEmail = topicEventFound.htmlBodyEmail;
        if (topicEventFound.eventExpression !== undefined) {
          topicEventEdit.value.eventExpression =
            topicEventFound.eventExpression;
        } else {
          topicEventEdit.value.eventExpression = '';
        }
      }
    };

    return {
      can: ability.can.bind(ability),
      topicEventColumnsSort,
      onSearch,
      meta,
      ESortMode,
      params,
      sortMode,
      pageSizeOptions,
      onChangePagination,
      hashMapNotificationEmailList,
      onDelete,
      onEdit,
      isLoadingActive,
      deviceId,
      topicEventList,
      topicEventColumns,
    };
  },
});
</script>

<style></style>
