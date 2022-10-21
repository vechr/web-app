<template>
  <div v-if="!isLoadingActive">
    <div v-if="mySession !== undefined">
      <h2
        :style="{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '50px',
        }"
        class="responsive-text"
      >
        Hi, {{ mySession.fullName }}!
      </h2>
      <a-form
        :model="mySession"
        name="basic"
        autocomplete="off"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 28 }"
        @finish="onFinish"
      >
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input
            placeholder="Type your username"
            v-model:value="mySession.username"
          >
          </a-input>
        </a-form-item>

        <a-form-item
          label="Fullname"
          name="fullName"
          :rules="[{ required: true, message: 'Please input your fullname!' }]"
        >
          <a-input
            placeholder="Type your fullname"
            v-model:value="mySession.fullName"
          >
          </a-input>
        </a-form-item>

        <a-form-item
          label="Phone Number"
          name="phoneNumber"
          :rules="[
            { required: true, message: 'Please input your phone number!' },
          ]"
        >
          <a-input
            placeholder="Type your Phone Number"
            v-model:value="mySession.phoneNumber"
          >
          </a-input>
        </a-form-item>

        <a-form-item label="Description" name="description">
          <a-textarea
            placeholder="Type your Description"
            v-model:value="mySession.description"
          >
          </a-textarea>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { useCommonStore, useSessionStore } from '@/ui/store';
import { TUserFullInformation } from '@/domain';

export default defineComponent({
  name: 'Profile',
  setup() {
    const common = useCommonStore();
    const session = useSessionStore();
    const { mySession } = storeToRefs(session);
    const { isLoadingActive } = storeToRefs(common);

    const onFinish = (values: TUserFullInformation) => {
      console.log(values);
    };

    return {
      isLoadingActive,
      onFinish,
      mySession,
    };
  },
});
</script>

<style></style>
