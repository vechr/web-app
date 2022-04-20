import { createApp } from 'vue';
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import 'ant-design-vue/dist/antd.css';
import '@/assets/main.css';

const app = createApp(App);
app
  .use(createPinia())
  .use(router)
  .use(Antd)
  .mount('#app')
