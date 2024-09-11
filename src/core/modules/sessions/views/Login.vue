<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useCookies } from 'vue3-cookies';
import { storeToRefs } from 'pinia';
import { useSessionStore } from '../session.store';
import {
  decryptedDataString,
  encryptedDDataString,
} from '@/core/base/frameworks/utils';
import { TCreateSessionRequestBody } from '@/core/modules/sessions/session.entity';

interface CookieData {
  secureUser: string;
  securePass: string;
  remember: boolean;
}
const remember = ref<boolean>(false);
const sessionStore = useSessionStore();
const { usecase } = storeToRefs(sessionStore);
const { cookies } = useCookies();

const dataCookie = reactive<CookieData>({
  secureUser: '',
  securePass: '',
  remember: true,
});

const formData = reactive<TCreateSessionRequestBody>({
  username: '',
  password: '',
});

onBeforeMount(() => {
  dataCookie.secureUser = cookies.get('user-sec');
  dataCookie.securePass = cookies.get('pass-sec');
  dataCookie.remember = Boolean(cookies.get('remember'));

  formData.username = decryptedDataString(
    dataCookie.secureUser,
    import.meta.env.APP_SECRET_COOKIE,
  );
  formData.password = decryptedDataString(
    dataCookie.securePass,
    import.meta.env.APP_SECRET_COOKIE,
  );
  remember.value = dataCookie.remember;
});

const onFinish = async (values: TCreateSessionRequestBody) => {
  await usecase.value.login(values);
  if (remember.value) {
    cookies.set(
      'user-sec',
      encryptedDDataString(values.username, import.meta.env.APP_SECRET_COOKIE),
      '3d',
      undefined,
      undefined,
      true,
      'Strict',
    );
    cookies.set(
      'pass-sec',
      encryptedDDataString(values.password, import.meta.env.APP_SECRET_COOKIE),
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
</script>

<template>
  <div class="container-auth-outer">
    <img src="/src/app/assets/logo.svg" alt="logo" />
    <div class="container-auth-img"></div>
    <div class="container-auth-login">
      <a-form
        :model="formData"
        name="basic"
        autocomplete="off"
        layout="vertical"
        @finish="onFinish"
      >
        <h2 class="auth-title">Login</h2>
        <a-form-item
          label="Username"
          name="username"
          has-feedback
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input
            placeholder="Type your username"
            v-model:value="formData.username"
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
          has-feedback
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password
            placeholder="Type your password"
            v-model:value="formData.password"
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
