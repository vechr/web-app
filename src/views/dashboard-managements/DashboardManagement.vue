<template>
  <div v-if="!isLoadingActive">
    <h3 :style="{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '50px'}">Dashboard Management</h3>
    <a-table v-if="dashboardList.length > 0" :dataSource="dashboardList" :columns="dashboardColumns" />
    <div v-else class="center-screen">
      <a-empty
        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        :image-style="{
          height: '60px',
        }"
      >
        <template #description>
          <span>
            There's no dashboard item found!, click button below for create
          </span>
        </template>
        <a-button type="primary">Create Now</a-button>
      </a-empty>
    </div>
  </div>
</template>

<script lang="ts">
import { useCommonStore, useDashboardManagementStore } from "@/store";
import { storeToRefs } from "pinia";
import { defineComponent, onBeforeMount } from "vue";

export default defineComponent({
  name: 'DashboardManagement',
  setup() {
    const store = useDashboardManagementStore()
    const common = useCommonStore()

    const { isLoadingActive } = storeToRefs(common);
    const { dashboardList, dashboardColumns } = storeToRefs(store);

    onBeforeMount(() => {
      store.getDashboardList();
    });

    return {
      isLoadingActive,
      dashboardColumns,
      dashboardList,
    }
  }
})
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