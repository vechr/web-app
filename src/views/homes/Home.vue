<template>
  <h2
    :style="{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '50px',
    }"
    class="responsive-text"
  >
    Home
  </h2> 
  <div style="padding: 2px">
    <a-row >
      <a-col :xs="24" :xl="8">
        <a-card title="Card title" :bordered="false">
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col :xs="24" :xl="8">
        <a-card title="Card title" :bordered="false">
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col :xs="24" :xl="8">
        <a-card title="Card title" :bordered="false">
          <p>card content</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'Home'
})
</script>

<style>
.ant-col {
  padding: 10px;
}

.ant-card {
  background: #ececec !important;
  border-radius: 20px !important;
}
</style>