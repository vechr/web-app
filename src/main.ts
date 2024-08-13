import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';
import L from 'leaflet';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { abilitiesPlugin } from '@casl/vue';
import router from './app/router';
import App from '@/app/App.vue';
import 'ant-design-vue/dist/reset.css';
import '@/app/assets/styles/main.scss';
import 'gridstack/dist/gridstack.min.css';
import 'leaflet/dist/leaflet.css';
import BlankLayout from '@/app/layouts/BlankLayout.vue';
import DashboardLayout from '@/app/layouts/DashboardLayout.vue';
import ability from '@/core/base/frameworks/utils/ability.util';

// LEAFLET SETTING ICON
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'marker-icon-2x.png',
  iconUrl: 'marker-icon.png',
  shadowUrl: 'marker-shadow.png',
});

const app = createApp(App);
app
  .component('blank-layout', BlankLayout)
  .component('dashboard-layout', DashboardLayout)
  .use(router)
  .use(Antd)
  .use(createPinia())
  .use(VueSweetalert2)
  .use(abilitiesPlugin, ability, {
    useGlobalProperties: true,
  })
  .mount('#app');
