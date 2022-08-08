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
            <template v-if="column.key === 'eventExpression'">
              <JsonTreeView :data="JSON.stringify(record.eventExpression)" />
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
import { JsonTreeView } from "json-tree-view-vue3"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue"
import { useTopicEventStore, useCommonStore } from "@/store"
import { storeToRefs } from "pinia"
import { defineComponent, onBeforeMount } from "vue"
import { useRoute } from "vue-router"
import { ITopicEvent } from "@/types"
import FormCreate from "@/components/device-managements/topic-managements/topic-events/FormCreate.vue"
import FormEdit from "@/components/device-managements/topic-managements/topic-events/FormEdit.vue"

export default defineComponent({
  name: "TopicEvent",
  components: {
    JsonTreeView,
    FormEdit,
    FormCreate,
    DeleteOutlined,
    EditOutlined,
  },
  setup() {
    const route = useRoute()
    const deviceId = route.params.deviceId
    const topicId = route.params.topicId

    const common = useCommonStore()
    const { isLoadingActive } = storeToRefs(common)

    const topicEventStore = useTopicEventStore()
    const { topicEventList, topicEventColumns } = storeToRefs(topicEventStore)

    onBeforeMount(() => {
      topicEventStore.getTopicEventList(topicId)
    })

    const onDelete = (record: ITopicEvent) => {
      topicEventStore.deleteTopicEventById(topicId, record.id)
    }

    const onEdit = (record: ITopicEvent) => {
      common.setIsDrawerShow(true)
      topicEventStore.getTopicEventById(topicId, record.id)
    }

    return {
      onDelete,
      onEdit,
      isLoadingActive,
      deviceId,
      topicEventList,
      topicEventColumns,
    }
  },
})
</script>

<style></style>
