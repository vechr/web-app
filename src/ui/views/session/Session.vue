<template>
  <div class="container-auth-outer">
    <div class="container-auth-img"></div>
    <div class="container-auth-login">
      <a-form
        :model="formState"
        name="basic"
        autocomplete="off"
        layout="vertical"
        @finish="onFinish"
      >
        <h2 class="auth-title">Login</h2>
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input
            placeholder="Type your username"
            v-model:value="formState.username"
          >
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password
            placeholder="Type your password"
            v-model:value="formState.password"
          >
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button
            class="btn-auth"
            shape="round"
            size="large"
            type="primary"
            html-type="submit"
            >Login</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { useCommonStore, useSessionStore } from '@/ui/store';

interface FormState {
  username: string;
  password: string;
}

export default defineComponent({
  name: 'Session',
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const common = useCommonStore();
    const store = useSessionStore();
    const router = useRouter();

    const formState = reactive<FormState>({
      username: '',
      password: '',
    });
    const onFinish = async (values: FormState) => {
      common.setIsLoading(true);
      const status = await store.login(values);
      if (status) router.push({ name: 'home' });
    };

    return {
      formState,
      onFinish,
    };
  },
});
</script>
