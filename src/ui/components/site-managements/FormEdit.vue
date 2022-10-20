<template>
  <a-drawer
    title="Edit Site"
    :visible="isDrawerShow"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form
      layout="vertical"
      :model="updateSite"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
    >
      <a-form-item
        label="Site Name"
        name="name"
        :rules="[{ required: true, message: 'Please input Site Name!' }]"
      >
        <a-input v-model:value="updateSite.name" />
      </a-form-item>

      <a-form-item label="Description" name="description">
        <a-textarea v-model:value="updateSite.description" />
      </a-form-item>

      <a-form-item
        label="Code"
        name="code"
        :rules="[{ required: true, message: 'Please input Code!' }]"
      >
        <a-input v-model:value="updateSite.code" />
      </a-form-item>

      <a-form-item
        label="Location"
        name="location"
        :rules="[{ required: true, message: 'Please input Location!' }]"
      >
        <a-input v-model:value="updateSite.location" />
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
import { useCommonStore, useSiteManagementStore } from '@/ui/store';

export default defineComponent({
  name: 'FormEditDashboard',
  setup() {
    const common = useCommonStore();
    const { isLoadingButton, isDrawerShow } = storeToRefs(common);

    const store = useSiteManagementStore();
    const { updateSite, dataDetails } = storeToRefs(store);

    const onClose = () => {
      common.setIsDrawerShow(false);
    };

    const onFinish = (values: any) => {
      common.setIsLoadingButton(true);
      if (dataDetails?.value)
        store.updateSiteById(dataDetails.value.id, values);
    };

    return {
      updateSite,
      isDrawerShow,
      isLoadingButton,
      onFinish,
      onClose,
    };
  },
});
</script>
