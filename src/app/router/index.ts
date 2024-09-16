import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import { ref } from 'vue';
import { usePermissionStore } from '@/modules/permissions/permission.store';
import { useSessionStore } from '@/core/modules/sessions/session.store';
import NotFound from '@/app/views/NotFound.vue';
import Home from '@/app/views/Home.vue';
import Modeling from '@/app/views/Modeling.vue';
import Profile from '@/modules/users/views/Profile.vue';
import { permissionAbility } from '@/core/base/frameworks/utils';
import ability, {
  TPermissionAbilities,
} from '@/core/base/frameworks/utils/ability.util';
import { AUTHENTICATION_ENABLED } from '@/core/base/domain/constant';
import Login from '@/core/modules/sessions/views/Login.vue';
import { EErrorJwtCode } from '@/core/modules/sessions/session.entity';
import DashboardOverview from '@/modules/dashboards/views/DashboardOverview.vue';
import Dashboard from '@/modules/dashboards/views/Dashboard.vue';
import Logging from '@/modules/logging/views/Logging.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/session',
    name: 'login',
    component: Login,
    meta: {
      layout: 'blank-layout',
      title: 'Login Page',
    },
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      layout: 'dashboard-layout',
      title: 'Home Page',
    },
  },
  {
    path: '/Profile',
    name: 'profile',
    component: Profile,
    meta: {
      layout: 'dashboard-layout',
      title: 'My Profile',
    },
  },
  {
    path: '/modeling',
    name: 'modeling',
    component: Modeling,
    meta: {
      layout: 'dashboard-layout',
      title: 'Modeling Page',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: {
      layout: 'blank-layout',
      title: 'Not Found',
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard-overview',
    component: DashboardOverview,
    meta: {
      layout: 'dashboard-layout',
      title: 'Dashboard Overview',
    },
  },
  {
    path: '/dashboard/:dashboardId',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      layout: 'dashboard-layout',
      title: 'Dashboard',
    },
  },
  {
    path: '/dashboard/:dashboardId/device/:deviceId/topicId/:topicId/topic/:topicName/logging',
    name: 'logging',
    component: Logging,
    meta: {
      layout: 'dashboard-layout',
      title: 'Logging',
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  // Set the title if set
  window.document.title =
    to.meta && to.meta.title
      ? 'App - ' + (to.meta.title as string)
      : 'Application';

  //#region authentication

  /**
   * Then next to the process authentication
   */
  // Permission Variable
  const userPermissionAbilities = ref<TPermissionAbilities>([]);

  /**
   * Fetch Permissions abilities from api
   */
  const permissionStore = usePermissionStore();
  await permissionStore.usecase.getAllPermissions();

  /**
   * Get Session Store
   */
  const sessionStore = useSessionStore();

  /**
   * Create authenticated variables
   */
  let authenticated: boolean = false;

  /**
   * Check Status Token
   */
  const statusPing = await sessionStore.usecase.ping();
  authenticated = statusPing.result;

  /**
   * If false check the status token, whether expired
   */
  if (!authenticated) {
    if (statusPing.error?.code === EErrorJwtCode.TOKEN_EXPIRED) {
      const { status } = await sessionStore.usecase.refresh();
      authenticated = status;
    }
  }

  /**
   * If token status ok, but current session is not exists, then get the current session
   */
  if (authenticated && sessionStore.usecase.currentSession === undefined)
    await sessionStore.usecase.mySession();

  /**
   * Move current session into Casl Variable
   */
  if (sessionStore.usecase.currentSession)
    userPermissionAbilities.value = permissionAbility(
      sessionStore.usecase.currentSession,
    );

  /**
   * If roles in current session exist, then intersect with all roles that exist
   */
  if (userPermissionAbilities.value.length > 0) {
    const intersectPermissions =
      permissionStore.usecase.permissionAbilities.filter((ability) =>
        userPermissionAbilities.value.some(
          (p) => p.action === ability.action && p.subject === ability.subject,
        ),
      );

    ability.update(intersectPermissions);
  }

  /**
   * We can enable/disable auth using this constant, (true/false)
   */
  if (to.name !== 'login' && !authenticated && AUTHENTICATION_ENABLED)
    next({ name: 'login' });
  else next();
  //#endregion
});

export default router;
