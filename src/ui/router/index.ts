import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { usePermissionManagementStore, useSessionStore } from '../store';
import DashboardManagement from '@/ui/views/dashboard-managements/DashboardManagement.vue';
import DeviceManagement from '@/ui/views/device-managements/DeviceManagement.vue';
import UserManagement from '@/ui/views/user-managements/UserManagament.vue';
import Home from '@/ui/views/homes/Home.vue';
import About from '@/ui/views/abouts/About.vue';
import Profile from '@/ui/views/profiles/Profile.vue';
import DeviceTypeManagement from '@/ui/views/device-type-managements/DeviceTypeManagement.vue';
import RoleManagement from '@/ui/views/roles-managements/RoleManagement.vue';
import PermissionManagement from '@/ui/views/permission-managements/PermissionManagement.vue';
import SiteManagement from '@/ui/views/sites-managements/SiteManagement.vue';
import TopicManagement from '@/ui/views/topic-managements/TopicManagement.vue';
import TopicEventManagement from '@/ui/views/topic-event-managements/TopicEventManagement.vue';
import Logging from '@/ui/views/homes/Logging.vue';
import Dashboard from '@/ui/views/homes/Dashboard.vue';
import NotificationEmailManagement from '@/ui/views/notification-email-managements/NotificationEmailManagement.vue';
import NotFound from '@/ui/views/common/NotFound.vue';
import Session from '@/ui/views/session/Session.vue';
import { EErrorJwtCode } from '@/domain';
import ability, { permissionAbility, TPermission } from '@/utils/ability';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/session',
    name: 'login',
    component: Session,
    meta: {
      layout: 'blank-layout',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: {
      layout: 'blank-layout',
    },
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      layout: 'dashboard-layout',
    },
  },
  {
    path: '/dashboard/:dashboardId',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      layout: 'dashboard-layout',
    },
  },
  {
    path: '/dashboard/:dashboardId/device/:deviceId/topicId/:topicId/topic/:topicName/logging',
    name: 'logging',
    component: Logging,
    meta: {
      layout: 'dashboard-layout',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      layout: 'dashboard-layout',
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      layout: 'dashboard-layout',
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard-managements',
    component: DashboardManagement,
    meta: {
      layout: 'dashboard-layout',
    },
  },
  {
    path: '/device',
    name: 'device-managements',
    component: DeviceManagement,
    meta: {
      layout: 'dashboard-layout',
    },
  },
  {
    path: '/email',
    name: 'notification-email-managements',
    component: NotificationEmailManagement,
    meta: {
      layout: 'dashboard-layout',
    },
  },
  {
    path: '/device/:deviceId/topic',
    name: 'topic-managements',
    component: TopicManagement,
    meta: {
      layout: 'dashboard-layout',
    },
  },
  {
    path: '/device/:deviceId/topic/:topicId/topic-event',
    name: 'topic-event',
    component: TopicEventManagement,
    meta: {
      layout: 'dashboard-layout',
    },
  },
  {
    path: '/device-type',
    name: 'device-types',
    component: DeviceTypeManagement,
    meta: {
      layout: 'dashboard-layout',
    },
  },
  {
    path: '/user',
    name: 'user-managements',
    component: UserManagement,
    meta: {
      layout: 'dashboard-layout',
    },
  },
  {
    path: '/role',
    name: 'role-managements',
    component: RoleManagement,
    meta: {
      layout: 'dashboard-layout',
    },
  },
  {
    path: '/permission',
    name: 'permission-managements',
    component: PermissionManagement,
    meta: {
      layout: 'dashboard-layout',
    },
  },
  {
    path: '/site',
    name: 'site-managements',
    component: SiteManagement,
    meta: {
      layout: 'dashboard-layout',
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  // Permission Variable
  const permission = ref<TPermission>([]);

  // Permission Store
  const permissionStore = usePermissionManagementStore();
  await permissionStore.getOptionPermission();
  const { permissionSourceList } = storeToRefs(permissionStore);

  // Sessions Store
  const session = useSessionStore();
  const { mySession } = storeToRefs(session);
  let authenticated = false;

  const result = await session.statusToken();
  authenticated = result.status;

  if (!authenticated) {
    if (result.error.code === EErrorJwtCode.TOKEN_EXPIRED) {
      const { status } = await session.refresh();
      authenticated = status;
    }
  }

  if (authenticated) {
    if (mySession?.value === undefined) {
      await session.userMe();
    }
  }

  // Set permission List
  if (mySession?.value) permission.value = permissionAbility(mySession?.value);

  if (permission.value.length > 0) {
    const intersecPermission = permissionSourceList.value.filter((t) =>
      permission.value.some((p) => p.action === t.action),
    );

    if (intersecPermission.find((val) => val.action === 'root')) {
      ability.update([
        {
          action: 'manage',
          subject: 'all',
        },
      ]);
    } else {
      ability.update(intersecPermission);
    }
  }

  if (to.name !== 'login' && !authenticated) next({ name: 'login' });
  else next();
});

export default router;
