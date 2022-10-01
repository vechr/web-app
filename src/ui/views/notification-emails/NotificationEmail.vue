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
      Notification Email Management
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
          v-if="notificationEmailList.length > 0"
          :dataSource="notificationEmailList"
          :columns="notificationEmailTypeColumns"
          :scroll="{ x: 1200 }"
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
import { useCommonStore, useNotificationEmailStore } from '@/ui/store';
import { INotificationEmail } from '@/domain';
import FormCreate from '@/ui/components/notification-emails/FormCreate.vue';
import FormEdit from '@/ui/components/notification-emails/FormEdit.vue';

export default defineComponent({
  name: 'NotificationEmail',
  components: { DeleteOutlined, EditOutlined, FormCreate, FormEdit },
  setup() {
    const common = useCommonStore();
    const { isLoadingActive } = storeToRefs(common);

    const store = useNotificationEmailStore();
    const { notificationEmailList, notificationEmailTypeColumns } =
      storeToRefs(store);

    const onEdit = (record: INotificationEmail) => {
      common.setIsDrawerShow(true);
      store.getNotificationEmailById(record.id);
    };

    const onDelete = (record: INotificationEmail) => {
      store.deleteNotificationEmailById(record.id);
    };

    onBeforeMount(() => {
      store.getNotificationEmailList();
    });

    return {
      isLoadingActive,
      notificationEmailList,
      notificationEmailTypeColumns,
      onEdit,
      onDelete,
    };
  },
});
</script>
