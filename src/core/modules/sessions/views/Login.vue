<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from 'vue';
import {
  UserOutlined,
  LockOutlined,
  SettingOutlined,
  CloudServerOutlined,
  LoginOutlined,
} from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';
import { useSessionStore } from '../session.store';
import { SessionUsecase } from '../session.usecase';
import {
  TSettingBody,
  TCreateSessionRequestBody,
} from '@/core/modules/sessions/session.entity';

const remember = ref<boolean>(false);
const sessionStore = useSessionStore();
const { usecase } = storeToRefs(sessionStore);
const isSettingMode = ref<boolean>(false);

const dataSession = reactive<TCreateSessionRequestBody>({
  username: '',
  password: '',
});

const dataSetting = reactive<TSettingBody>({
  backedServer: '',
  backendProtocol: 'https://',
  natsProtocol: 'wss://',
  natsServer: '',
  natsUsername: '',
  natsPassword: '',
});

onBeforeMount(() => {
  const sessionLocalStorage = usecase.value.getSessionLocalStorage();

  dataSession.username = sessionLocalStorage.sessionBody.username;
  dataSession.password = sessionLocalStorage.sessionBody.password;

  remember.value = sessionLocalStorage.isRemember;

  const settingLocalStorage = SessionUsecase.getSettingLocalStorage();
  dataSetting.backedServer = settingLocalStorage.backedServer;
  dataSetting.backendProtocol = settingLocalStorage.backendProtocol;
  dataSetting.natsServer = settingLocalStorage.natsServer;
  dataSetting.natsProtocol = settingLocalStorage.natsProtocol;
  dataSetting.natsUsername = settingLocalStorage.natsUsername;
  dataSetting.natsPassword = settingLocalStorage.natsPassword;
});

const onFinish = async (values: TCreateSessionRequestBody) => {
  await usecase.value.login(values, remember.value);
};

const onChangeSettingMode = () => {
  isSettingMode.value = !isSettingMode.value;
};

const onSaveSetting = (values: TSettingBody) => {
  usecase.value.saveSettingLocalStorage(values);
  location.reload();
};
</script>

<template>
  <div class="container-auth-outer">
    <img src="/src/app/assets/logo.svg" alt="logo" />
    <div class="container-auth-img"></div>
    <div class="container-auth-login">
      <!-- Login Form -->
      <a-form
        v-if="!isSettingMode"
        :model="dataSession"
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
            v-model:value="dataSession.username"
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
            v-model:value="dataSession.password"
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

      <!-- Setting Form -->
      <a-form
        v-if="isSettingMode"
        :model="dataSetting"
        name="basic"
        autocomplete="off"
        layout="vertical"
        @finish="onSaveSetting"
      >
        <h2 class="auth-title">Settings</h2>
        <a-form-item
          label="Backend Server"
          name="backedServer"
          has-feedback
          :rules="[{ required: true, message: 'Backend Server is required!' }]"
        >
          <a-input
            placeholder="app.vechr.com"
            v-model:value="dataSetting.backedServer"
            :bordered="true"
          >
            <template #addonBefore>
              <a-select
                v-model:value="dataSetting.backendProtocol"
                style="width: 90px"
              >
                <a-select-option value="http://">http://</a-select-option>
                <a-select-option value="https://">https://</a-select-option>
              </a-select>
            </template>
            <template #addonAfter>
              <CloudServerOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="NATS Server"
          name="natsServer"
          has-feedback
          :rules="[{ required: true, message: 'NATS Server is required!' }]"
        >
          <a-input
            placeholder="nats.vechr.com"
            v-model:value="dataSetting.natsServer"
            :bordered="true"
          >
            <template #addonBefore>
              <a-select
                v-model:value="dataSetting.natsProtocol"
                style="width: 90px"
              >
                <a-select-option value="ws://">ws://</a-select-option>
                <a-select-option value="wss://">wss://</a-select-option>
              </a-select>
            </template>
            <template #addonAfter>
              <CloudServerOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="NATS Username"
          name="natsUsername"
          has-feedback
          :rules="[
            { required: true, message: 'Please input your nats username!' },
          ]"
        >
          <a-input
            placeholder="Type your nats username"
            v-model:value="dataSetting.natsUsername"
            :bordered="true"
          >
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="NATS Password"
          name="natsPassword"
          has-feedback
          :rules="[
            { required: true, message: 'Please input your nats password!' },
          ]"
        >
          <a-input-password
            placeholder="Type your natspassword"
            v-model:value="dataSetting.natsPassword"
            :bordered="true"
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
            >Save</a-button
          >
        </a-form-item>
      </a-form>

      <!-- Setting Button -->
      <a-button class="btn-setting" type="text" @click="onChangeSettingMode">
        {{ !isSettingMode ? ' Settings' : 'Back to login' }}
        <SettingOutlined v-if="!isSettingMode" />
        <LoginOutlined v-if="isSettingMode" />
      </a-button>
    </div>
  </div>
</template>
