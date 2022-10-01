<template>
  <a-row type="flex" justify="center" align="middle" class="not-found">
    <a-col :span="8">
      <div class="text-center">
        <h2>Something is Wrong</h2>
        <h1>404</h1>
        <p>
          The link you followed probably broken, or the page has been removed
        </p>
        <router-link :to="{ name: 'home' }">
          <a-button type="primary">Return to Home</a-button>
        </router-link>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi';

export default defineComponent({
  name: 'NotFound',
});
</script>

<style lang="scss">
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}
.text-center {
  text-align: center;
  h1 {
    font-size: 180px;
    font-weight: 800;
    margin-bottom: 0;
  }
}
</style>
