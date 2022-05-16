import { createApp } from 'vue';
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import 'ant-design-vue/dist/antd.css';
import '@/assets/main.css';
import 'gridstack/dist/gridstack.min.css';
import 'gridstack/dist/h5/gridstack-dd-native';

const app = createApp(App);
app
  .use(createPinia())
  .use(router)
  .use(Antd)
  .mount('#app')
