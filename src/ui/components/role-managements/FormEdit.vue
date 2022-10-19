<template>
  <a-drawer
    title="Edit User"
    :visible="isDrawerShow"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form
      layout="vertical"
      :model="updateRole"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
    >
      <a-form-item
        label="Role Name"
        name="name"
        :rules="[{ required: true, message: 'Please input Role Name!' }]"
      >
        <a-input v-model:value="updateRole.name" />
      </a-form-item>

      <a-form-item label="Description" name="description">
        <a-textarea v-model:value="updateRole.description" />
      </a-form-item>

      <a-form-item
        label="Permission"
        name="permissions"
        :rules="[{ required: false }]"
      >
        <a-select
          mode="tags"
          style="width: 100%"
          placeholder="Tags Mode"
          :options="optionPermissions"
          v-model:value="updateRole.permissions"
        ></a-select>
      </a-form-item>

      <a-form-item>
        <a-button
          type="primary"
          :loading="isLoadingButton"
          html-type="submit"
          :style="{ float: 'right' }"
          >Submit</a-button
        >
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import {
  useCommonStore,
  useRoleManagementStore,
  usePermissionManagementStore,
} from '@/ui/store';

export default defineComponent({
  name: 'FormEditDashboard',
  setup() {
    const common = useCommonStore();
    const { isLoadingButton, isDrawerShow } = storeToRefs(common);

    const store = useRoleManagementStore();
    const { updateRole, dataDetails } = storeToRefs(store);

    const permissionStore = usePermissionManagementStore();
    const { optionPermissions } = storeToRefs(permissionStore);

    const onClose = () => {
      common.setIsDrawerShow(false);
    };

    const onFinish = (values: any) => {
      common.setIsLoadingButton(true);
      if (dataDetails?.value)
        store.updateRoleById(dataDetails.value.id, values);
    };

    return {
      optionPermissions,
      updateRole,
      isDrawerShow,
      isLoadingButton,
      onFinish,
      onClose,
    };
  },
});
</script>
