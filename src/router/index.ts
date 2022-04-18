import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DashboardManagement from '@/views/dashboard-managements/DashboardManagement.vue'
import DeviceManagement from '@/views/device-managements/DeviceManagement.vue'
import UserManagement from '@/views/user-managements/UserManagament.vue'
import Home from '@/views/homes/Home.vue'
import About from '@/views/abouts/About.vue'
import Profile from '@/views/profiles/Profile.vue'
import DeviceType from '@/views/device-types/DeviceType.vue'
import RoleManagement from '@/views/roles-managements/RoleManagement.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
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
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
