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
      Dashboard Management
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
          v-if="dashboardList.length > 0"
          :dataSource="dashboardList"
          :columns="dashboardColumns"
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
import FormCreate from "@/components/dashboard-managements/FormCreate.vue";
import FormEdit from "@/components/dashboard-managements/FormEdit.vue";
import { useCommonStore, useDashboardManagementStore } from "@/store";
import { storeToRefs } from "pinia";
import { defineComponent, onBeforeMount } from "vue";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import { IDashboard } from "@/types";

export default defineComponent({
  components: { FormCreate, DeleteOutlined, EditOutlined, FormEdit },
  name: "DashboardManagement",
  setup() {
    const store = useDashboardManagementStore();
    const common = useCommonStore();

    const { isLoadingActive } = storeToRefs(common);
    const { dashboardList, dashboardColumns } = storeToRefs(store);

    onBeforeMount(() => {
      store.getDashboardList();
    });

    const onDelete = (record: IDashboard) => {
      store.deleteDashboardById(record.id);
    };

    const onEdit = (record: IDashboard) => {
      common.setIsDrawerShow(true);
      store.getDashboardById(record.id);
    };

    return {
      onEdit,
      onDelete,
      isLoadingActive,
      dashboardColumns,
      dashboardList,
    };
  },
});
</script>

<style>
.center-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 60vh;
}
</style>