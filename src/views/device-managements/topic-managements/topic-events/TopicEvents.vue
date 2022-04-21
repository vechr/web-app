<template>
  <a-breadcrumb>
    <a-breadcrumb-item>
      <router-link to="/device" custom v-slot="{ navigate, href }">
        <a @click="navigate" :href="href">Device Management</a>
      </router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item>
      <router-link :to="{name: 'topic-managements', params: {deviceId: deviceId}}" custom v-slot="{ navigate, href }">
        <a @click="navigate" :href="href">Device Management</a>
      </router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item>Topic Event</a-breadcrumb-item>
  </a-breadcrumb>
  <h2
      :style="{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '50px',
      }"
      class="responsive-text"
    >
      Topic Event
    </h2> 
</template>

<script>
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent ({
  name: 'TopicEvent',
  setup() {
    const route = useRoute();
    const deviceId = route.params.deviceId;

    return {
      deviceId
    }
  }
});
</script>

<style>

</style>