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
      :model="userUpdate"
      name="basic"
      autocomplete="off"
      :rules="rules"
      @finish="onFinish"
    >
      <a-form-item
        label="Full Name"
        name="fullName"
        :rules="[{ required: true, message: 'Please input Full Name!' }]"
      >
        <a-input v-model:value="userUpdate.fullName" />
      </a-form-item>

      <a-form-item label="Description" name="description">
        <a-textarea v-model:value="userUpdate.description" />
      </a-form-item>

      <a-form-item
        label="Email Address"
        name="emailAddress"
        :rules="[
          {
            required: true,
            pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gm),
            message:
              'Please input email with correct format for example: me@mail.com!',
          },
        ]"
      >
        <a-input v-model:value="userUpdate.emailAddress" />
      </a-form-item>

      <a-form-item label="Phone Number" name="phoneNumber">
        <a-input v-model:value="userUpdate.phoneNumber" />
      </a-form-item>

      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input Username!' }]"
      >
        <a-input v-model:value="userUpdate.username" />
      </a-form-item>

      <a-form-item has-feedback label="Password" name="password">
        <a-input
          v-model:value="userUpdate.password"
          type="password"
          autocomplete="off"
        />
      </a-form-item>

      <a-form-item has-feedback label="Confirm Password" name="confirmPassword">
        <a-input
          v-model:value="userUpdate.confirmPassword"
          type="password"
          autocomplete="off"
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
  </a-drawer>
</template>
<script lang="ts">
import type { Rule } from 'ant-design-vue/es/form';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { useCommonStore, useUserManagementStore } from '@/ui/store';

export default defineComponent({
  name: 'FormEditDashboard',
  setup() {
    const common = useCommonStore();
    const { isLoadingButton, isDrawerShow } = storeToRefs(common);

    const store = useUserManagementStore();
    const { userUpdate, dataDetails } = storeToRefs(store);

    const onClose = () => {
      common.setIsDrawerShow(false);
    };

    const validatePass = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('Please input the password again');
      } else if (value !== userUpdate.value.password) {
        return Promise.reject("Two inputs don't match!");
      } else {
        return Promise.resolve();
      }
    };

    const rules: Record<string, Rule[]> = {
      confirmPassword: [{ validator: validatePass, trigger: 'change' }],
    };

    const onFinish = (values: any) => {
      common.setIsLoadingButton(true);
      values.roles = [];
      values.siteId = userUpdate.value.siteId;
      if (dataDetails?.value)
        store.updateUserById(dataDetails.value.id, values);
    };

    return {
      rules,
      userUpdate,
      isDrawerShow,
      isLoadingButton,
      onFinish,
      onClose,
    };
  },
});
</script>
