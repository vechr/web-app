import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import 'ant-design-vue/dist/antd.css';
import '@/assets/styles/app.scss';
import 'gridstack/dist/gridstack.min.css';
import 'gridstack/dist/h5/gridstack-dd-native';
import 'leaflet/dist/leaflet.css';

// LEAFLET SETTING ICON
import L from 'leaflet';
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'marker-icon-2x.png',
  iconUrl: 'marker-icon.png',
  shadowUrl: 'marker-shadow.png',
});

const app = createApp(App);
app.use(createPinia()).use(router).use(Antd).mount('#app');
