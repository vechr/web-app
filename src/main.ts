import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';
import L from 'leaflet';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import App from './ui/App.vue';
import router from './ui/router';
import 'ant-design-vue/dist/antd.css';
import './ui/assets/styles/app.scss';
import 'gridstack/dist/gridstack.min.css';
import 'leaflet/dist/leaflet.css';

// LEAFLET SETTING ICON
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'marker-icon-2x.png',
  iconUrl: 'marker-icon.png',
  shadowUrl: 'marker-shadow.png',
});

const app = createApp(App);
app.use(createPinia()).use(router).use(Antd).use(VueSweetalert2).mount('#app');
