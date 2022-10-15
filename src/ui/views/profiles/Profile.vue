<template>
  <div v-if="!isLoadingActive">
    <div v-if="dataDetails !== undefined">
      <h2>Hi, {{ dataDetails.fullName }}!</h2>
      <a-form
        :model="dataDetails"
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
            v-model:value="dataDetails.username"
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
            v-model:value="dataDetails.fullName"
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
            v-model:value="dataDetails.phoneNumber"
          >
          </a-input>
        </a-form-item>

        <a-form-item label="Description" name="description">
          <a-textarea
            placeholder="Type your Description"
            v-model:value="dataDetails.description"
          >
          </a-textarea>
        </a-form-item>

        <a-form-item label="Site" name="site">
          <a-textarea
            placeholder="Type your Site"
            v-model:value="dataDetails.site.name"
          >
          </a-textarea>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 4, span: 28 }">
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
    </div>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent, onBeforeMount } from 'vue';
import { useCommonStore, useSessionStore } from '@/ui/store';
import { useUserStore } from '@/ui/store/users/user';
import { TUserFullInformation } from '@/domain';

export default defineComponent({
  name: 'Profile',
  setup() {
    const common = useCommonStore();
    const session = useSessionStore();
    const user = useUserStore();
    const { dataDetails } = storeToRefs(user);
    const { mySession } = storeToRefs(session);
    const { isLoadingActive } = storeToRefs(common);

    onBeforeMount(async () => {
      if (dataDetails?.value === undefined) {
        if (mySession?.value !== undefined && mySession.value.id !== undefined)
          await user.getUserById(mySession.value.id);
      }
    });

    const onFinish = (values: TUserFullInformation) => {
      console.log(values);
    };

    return {
      isLoadingActive,
      onFinish,
      dataDetails,
    };
  },
});
</script>

<style></style>
