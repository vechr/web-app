<template>
  <div>
    <a-button type="primary" @click="showModal" block>
      <template #icon><PlusOutlined /></template>Create Role
    </a-button>

    <a-modal
      v-model:visible="isModalShow"
      title="Create Role"
      @ok="handleOk"
      :footer="null"
      width="720px"
    >
      <a-form
        layout="vertical"
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Role Name"
          name="name"
          :rules="[{ required: true, message: 'Please input Role Name!' }]"
        >
          <a-input v-model:value="formState.name" />
        </a-form-item>

        <a-form-item label="Description" name="description">
          <a-textarea v-model:value="formState.description" />
        </a-form-item>

        <a-form-item
          label="Permission"
          name="permissions"
          :rules="[{ required: false }]"
          class="transfer-form"
        >
          <a-transfer
            :list-style="{
              width: '300px',
              height: '300px',
            }"
            pagination
            v-model:target-keys="formState.permissions"
            :data-source="transferSourceData"
            :titles="[' Available', ' Selected']"
            show-search
            :render="(item: any) => `${item.description} - ${item.title}`"
          />
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
    </a-modal>
  </div>
</template>

<script lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import {
  useCommonStore,
  usePermissionManagementStore,
  useRoleManagementStore,
} from '@/ui/store';
import { ICreateRole } from '@/domain';

export default defineComponent({
  name: 'FormCreateRole',
  components: { PlusOutlined },
  setup() {
    const common = useCommonStore();
    const store = useRoleManagementStore();
    const { isModalShow, isLoadingButton } = storeToRefs(common);

    const permissionStore = usePermissionManagementStore();
    const { transferSourceData } = storeToRefs(permissionStore);

    const showModal = () => {
      common.setIsModalShow(true);
    };

    const formState = reactive<ICreateRole>({
      name: '',
      description: '',
      permissions: [],
    });

    const onFinish = (values: any) => {
      common.setIsLoadingButton(true);
      store.createRole(values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    const handleOk = () => {
      common.setIsModalShow(false);
    };

    return {
      transferSourceData,
      isLoadingButton,
      formState,
      isModalShow,
      showModal,
      handleOk,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>
