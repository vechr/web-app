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
      Dashboard Management
    </h2>
    <a-row>
      <a-col :span="24">
        <FormCreate style="float: right; margin-bottom: 20px" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-table
          v-if="dashboardList.length > 0"
          :dataSource="dashboardList"
          :columns="dashboardColumns"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <a-space :size="10">
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
import { useCommonStore, useDashboardManagementStore } from "@/store";
import { storeToRefs } from "pinia";
import { defineComponent, onBeforeMount } from "vue";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import { IDashboard } from "@/types";

export default defineComponent({
  components: { FormCreate, DeleteOutlined, EditOutlined },
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

    return {
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