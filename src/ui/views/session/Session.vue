<template>
  <div class="container-auth-outer">
    <img src="@/ui/assets/logo.svg" alt="logo" />
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
            :bordered="false"
            class="input-auth"
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
            :bordered="false"
            class="input-auth"
          >
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item name="remember">
          <a-checkbox v-model:checked="remember">Remember me</a-checkbox>
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
import { defineComponent, onBeforeMount, reactive, ref } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useCookies } from 'vue3-cookies';
import { useCommonStore, useSessionStore } from '@/ui/store';
import {
  decryptedDataString,
  encryptedDDataString,
} from '@/utils/security.util';

interface FormState {
  username: string;
  password: string;
}

interface CookieData {
  secureUser: string;
  securePass: string;
  remember: boolean;
}

export default defineComponent({
  name: 'Session',
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const remember = ref<boolean>(false);
    const common = useCommonStore();
    const store = useSessionStore();
    const { cookies } = useCookies();

    const dataCookie = reactive<CookieData>({
      secureUser: '',
      securePass: '',
      remember: true,
    });

    const formState = reactive<FormState>({
      username: '',
      password: '',
    });

    onBeforeMount(() => {
      dataCookie.secureUser = cookies.get('user-sec');
      dataCookie.securePass = cookies.get('pass-sec');
      dataCookie.remember = Boolean(cookies.get('remember'));

      formState.username = decryptedDataString(dataCookie.secureUser);
      formState.password = decryptedDataString(dataCookie.securePass);
      remember.value = dataCookie.remember;
    });

    const onFinish = (values: FormState) => {
      common.setIsLoading(true);
      store.login(values);
      if (remember.value) {
        cookies.set(
          'user-sec',
          encryptedDDataString(values.username),
          '3d',
          undefined,
          undefined,
          true,
          'Strict',
        );
        cookies.set(
          'pass-sec',
          encryptedDDataString(values.password),
          '3d',
          undefined,
          undefined,
          true,
          'Strict',
        );
        cookies.set('remember', String(remember.value));
      } else {
        cookies.remove('user-sec');
        cookies.remove('pass-sec');
        cookies.remove('remember');
      }
    };

    return {
      remember,
      formState,
      onFinish,
    };
  },
});
</script>
