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
        <FormCreate style="float: right; margin-bottom: 20px" />
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
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
import { defineComponent, onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import FormCreate from '@/ui/components/topic-managements/FormCreate.vue';
import FormEdit from '@/ui/components/topic-managements/FormEdit.vue';
import { useCommonStore, useTopicManagementStore } from '@/ui/store';
import { ITopic } from '@/domain';

export default defineComponent({
  name: 'TopicManagement',
  components: {
    DeleteOutlined,
    EditOutlined,
    FormCreate,
    FormEdit,
  },
  setup() {
    const route = useRoute();
    const deviceId = String(route.params.deviceId);

    const common = useCommonStore();
    const { isLoadingActive } = storeToRefs(common);

    const topicStore = useTopicManagementStore();
    const { topicList, topicColumns } = storeToRefs(topicStore);

    onBeforeMount(() => {
      topicStore.getTopicList(deviceId);
    });

    const onDelete = (record: ITopic) => {
      topicStore.deleteTopicById(deviceId, record.id);
    };

    const onEdit = (record: ITopic) => {
      common.setIsDrawerShow(true);
      topicStore.getTopicById(deviceId, record.id);
    };

    return {
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
