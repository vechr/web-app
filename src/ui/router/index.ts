import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DashboardManagement from '@/ui/views/dashboard-managements/DashboardManagement.vue'
import DeviceManagement from '@/ui/views/device-managements/DeviceManagement.vue'
import UserManagement from '@/ui/views/user-managements/UserManagament.vue'
import Home from '@/ui/views/homes/Home.vue'
import About from '@/ui/views/abouts/About.vue'
import Profile from '@/ui/views/profiles/Profile.vue'
import DeviceType from '@/ui/views/device-types/DeviceType.vue'
import RoleManagement from '@/ui/views/roles-managements/RoleManagement.vue'
import TopicManagement from '@/ui/views/topic-managements/TopicManagement.vue'
import TopicEvent from '@/ui/views/topic-events/TopicEvents.vue'
import Logging from '@/ui/views/homes/Logging.vue'
import Dashboard from '@/ui/views/homes/Dashboard.vue'
import NotificationEmail from '@/ui/views/notification-emails/NotificationEmail.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/dashboard/:dashboardId',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/dashboard/:dashboardId/device/:deviceId/topicId/:topicId/topic/:topicName/logging',
    name: 'logging',
    component: Logging
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/dashboard',
    name: 'dashboard-managements',
    component: DashboardManagement
  },
  {
    path: '/device',
    name: 'device-managements',
    component: DeviceManagement
  },
  {
    path: '/email',
    name: 'notification-email-managements',
    component: NotificationEmail
  },
  {
    path: '/device/:deviceId/topic',
    name: 'topic-managements',
    component: TopicManagement
  },
  {
    path: '/device/:deviceId/topic/:topicId/topic-event',
    name: 'topic-event',
    component: TopicEvent
  },
  {
    path: '/device-type',
    name: 'device-types',
    component: DeviceType
  },
  {
    path: '/user',
    name: 'user-managements',
    component: UserManagement
  },
  {
    path: '/role',
    name: 'role-managements',
    component: RoleManagement
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
