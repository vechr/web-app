<script lang="ts" setup>
import { ref } from 'vue';
import Container from 'typedi';
import { SaveOutlined } from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';
import { message } from 'ant-design-vue';
import { SessionUsecase } from '../../../core/modules/sessions/session.usecase';
import FormRecursive from '@/app/components/FormRecursive.vue';
import { transformFormtoBodyRequest } from '@/core/base/frameworks/utils';
import { useUserStore } from '@/modules/users/user.store';

const userStore = useUserStore();
const sessionUsecase = ref(Container.get(SessionUsecase));

// load some important properties
userStore.loadImportantData();

// find the current user by session id
userStore.objectSelected(sessionUsecase.value.currentSession?.id ?? '');

const { fields } = storeToRefs(userStore);

const formRef = ref();
const onSave = async () => {
  formRef.value
    .validate()
    .then(async () => {
      const copyObject = Object.assign({}, fields.value);
      delete copyObject.id;
      delete copyObject.createdAt;
      delete copyObject.updatedAt;

      const dataSave = transformFormtoBodyRequest<any>(copyObject);

      await userStore.usecase.updateById(
        fields.value.id?.value ?? '',
        dataSave,
        false,
        'Notification',
      );
    })
    .catch(() => {
      message.warn('please fill the required fields!');
    });
};
</script>
<template>
  <div>
    <a-page-header class="form-header">
      <template #tags>
        <a-typography-title :level="3">My Profile</a-typography-title>
        <a-typography-paragraph>{{
          sessionUsecase.currentSession?.fullName
        }}</a-typography-paragraph>
      </template>
      <template #extra>
        <a-flex :justify="'flex-end'" :align="'center'" wrap="wrap" gap="small">
          <a-button
            key="1"
            class="btn-success btn-min-width"
            type="primary"
            @click="onSave"
            ><template #icon> <SaveOutlined /> </template>Save</a-button
          >
        </a-flex>
      </template>
    </a-page-header>
    <a-form
      ref="formRef"
      :disabled="false"
      :layout="'vertical'"
      :v-bind="{ labelCol: { span: 1 }, wrapperCol: { span: 14 } }"
      :model="transformFormtoBodyRequest(fields)"
      class="form-layout"
    >
      <FormRecursive
        :fields="fields"
        :is-array="false"
        :parent-field-name="[]"
      />
    </a-form>
  </div>
</template>
