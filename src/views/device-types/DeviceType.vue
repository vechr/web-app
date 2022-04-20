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
      Device Type Management
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
          v-if="deviceTypeList.length > 0"
          :dataSource="deviceTypeList"
          :columns="deviceTypeColumns"
          :scroll="{ x: 1200 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'devices'">
              <a-space :size="10">
                <div v-if="record.devices.length > 0">
                  <a-tag
                    v-for="tag in record.devices"
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
                    {{ "no devices".toUpperCase() }}
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
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import { useCommonStore, useDeviceTypeStore } from "@/store";
import { IDeviceType } from "@/types";
import { storeToRefs } from "pinia";
import { defineComponent, onBeforeMount } from "vue";
import FormCreate from "@/components/device-types/FormCreate.vue";
import FormEdit from "@/components/device-types/FormEdit.vue";

export default defineComponent({
  name: "DeviceType",
  components: { DeleteOutlined, EditOutlined, FormCreate, FormEdit },
  setup() {
    const common = useCommonStore();
    const { isLoadingActive } = storeToRefs(common);

    const store = useDeviceTypeStore();
    const { deviceTypeList, deviceTypeColumns } = storeToRefs(store);

    const onEdit = (record: IDeviceType) => {
      common.setIsDrawerShow(true);
      store.getDeviceTypeById(record.id);
    };

    const onDelete = (record: IDeviceType) => {
      store.deleteDeviceTypeById(record.id);
    };

    onBeforeMount(() => {
      store.getDeviceTypeList();
    });

    return {
      isLoadingActive,
      onDelete,
      deviceTypeList,
      deviceTypeColumns,
      onEdit,
    };
  },
});
</script>