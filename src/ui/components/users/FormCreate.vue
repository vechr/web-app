<template>
  <div>
    <a-button type="primary" @click="showModal" block>
      <template #icon><PlusOutlined /></template>Create User
    </a-button>
    <a-modal
      v-model:visible="isModalShow"
      title="Create User"
      @ok="handleOk"
      :footer="null"
    >
      <a-form
        ref="formRef"
        layout="vertical"
        :model="formState"
        name="basic"
        autocomplete="off"
        :rules="rules"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Full Name"
          name="fullName"
          :rules="[{ required: true, message: 'Please input Full Name!' }]"
        >
          <a-input v-model:value="formState.fullName" />
        </a-form-item>

        <a-form-item label="Description" name="description">
          <a-textarea v-model:value="formState.description" />
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
          <a-input v-model:value="formState.emailAddress" />
        </a-form-item>

        <a-form-item label="Phone Number" name="phoneNumber">
          <a-input v-model:value="formState.phoneNumber" />
        </a-form-item>

        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input Username!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item has-feedback label="Password" name="password">
          <a-input
            v-model:value="formState.password"
            type="password"
            autocomplete="off"
          />
        </a-form-item>

        <a-form-item
          has-feedback
          label="Confirm Password"
          name="confirmPassword"
        >
          <a-input
            v-model:value="formState.confirmPassword"
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
    </a-modal>
  </div>
</template>

<script lang="ts">
import type { Rule } from 'ant-design-vue/es/form';
import { PlusOutlined } from '@ant-design/icons-vue';
import type { FormInstance } from 'ant-design-vue';
import { defineComponent, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useCommonStore, useUserManagementStore } from '@/ui/store';
import { ICreateUser } from '@/domain';

export default defineComponent({
  name: 'FormCreateUser',
  components: { PlusOutlined },
  setup() {
    const formRef = ref<FormInstance>();
    const common = useCommonStore();
    const store = useUserManagementStore();

    const { isModalShow, isLoadingButton } = storeToRefs(common);

    const showModal = () => {
      common.setIsModalShow(true);
    };

    const formState = reactive<ICreateUser>({
      fullName: '',
      description: '',
      emailAddress: '',
      username: '',
      password: '',
      confirmPassword: '',
      roles: [],
    });

    const validatePass = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('Please input the password');
      } else {
        if (formState.confirmPassword !== '' && formRef.value) {
          formRef.value.validateFields('confirmPassword');
        }
        return Promise.resolve();
      }
    };
    const validatePass2 = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('Please input the password again');
      } else if (value !== formState.password) {
        return Promise.reject("Two inputs don't match!");
      } else {
        return Promise.resolve();
      }
    };

    const rules: Record<string, Rule[]> = {
      password: [
        { required: true, validator: validatePass, trigger: 'change' },
      ],
      confirmPassword: [{ validator: validatePass2, trigger: 'change' }],
    };

    const onFinish = (values: any) => {
      common.setIsLoadingButton(true);
      values.roles = []; // dummy roles
      store.createUser(values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    const handleOk = () => {
      common.setIsModalShow(false);
    };

    return {
      formRef,
      rules,
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
