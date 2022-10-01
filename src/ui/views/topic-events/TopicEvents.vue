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
        <FormCreate style="float: right; margin-bottom: 20px" />
        <FormEdit />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-table
          v-if="topicEventList.length > 0"
          :dataSource="topicEventList"
          :columns="topicEventColumns"
          :scroll="{ x: 1200 }"
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
              <span> There's no dashboard item found! </span>
            </template>
          </a-empty>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';
import { defineComponent, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import {
  useTopicEventStore,
  useCommonStore,
  useNotificationEmailStore,
} from '@/ui/store';
import { ITopicEvent } from '@/domain';
import FormCreate from '@/ui/components/topic-events/FormCreate.vue';
import FormEdit from '@/ui/components/topic-events/FormEdit.vue';

export default defineComponent({
  name: 'TopicEvent',
  components: {
    FormEdit,
    FormCreate,
    DeleteOutlined,
    EditOutlined,
  },
  setup() {
    const route = useRoute();
    const deviceId = String(route.params.deviceId);
    const topicId = String(route.params.topicId);

    const common = useCommonStore();
    const { isLoadingActive } = storeToRefs(common);

    const topicEventStore = useTopicEventStore();
    const { topicEventEdit, topicEventList, topicEventColumns } =
      storeToRefs(topicEventStore);

    const notificationEmailStore = useNotificationEmailStore();
    const { hashMapNotificationEmailList } = storeToRefs(
      notificationEmailStore,
    );

    onBeforeMount(() => {
      topicEventStore.getTopicEventList(topicId);
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
