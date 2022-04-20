<template>
  <div v-if="!isLoadingActive">
    <h2
      :style="{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '50px',
      }"
    >
      Device Management
    </h2>
    <a-row>
      <a-col :span="24">
        <FormCreate style="float: right; margin-bottom: 20px" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-table
          v-if="deviceList.length > 0"
          :dataSource="deviceList"
          :columns="deviceColumns"
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
                <a-button type="primary" size="small">
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
                      16
                    )}`"
                  >
                    {{ tag }}
                  </a-tag>
                </div>
                <div v-else>
                  <a-tag color="#f50">
                    {{ "no topics".toUpperCase() }}
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
import {
  DeleteOutlined,
  EditOutlined,
  CheckCircleFilled,
} from "@ant-design/icons-vue";
import { useCommonStore, useDeviceManagementStore } from "@/store";
import { IDevice } from "@/types";
import { storeToRefs } from "pinia";
import { defineComponent, onBeforeMount } from "vue";
import FormCreate from '@/components/device-managements/FormCreate.vue'

export default defineComponent({
  name: "DeviceManagement",
  components: { DeleteOutlined, EditOutlined, CheckCircleFilled, FormCreate },
  setup() {
    const common = useCommonStore();
    const { isLoadingActive } = storeToRefs(common);

    const store = useDeviceManagementStore();
    const { deviceList, deviceColumns } = storeToRefs(store);

    const onDelete = (record: IDevice) => {
      store.deleteDeviceById(record.id);
    };

    onBeforeMount(() => {
      store.getDeviceList();
    });

    return { isLoadingActive, deviceList, deviceColumns, onDelete };
  },
});
</script>

<style>
</style>