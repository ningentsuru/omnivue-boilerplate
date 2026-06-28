import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { ROUTES } from '@/constants'
import LandingView from '@/views/LandingView'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    layout?: 'DefaultLayout' | 'AuthLayout' | 'ErrorLayout'
  }
}

const routes: Array<RouteRecordRaw> = [
  // ... existing routes
  // plop:insert-route
  {
    path: ROUTES.NOT_FOUND_VIEW.path,
    name: ROUTES.NOT_FOUND_VIEW.name,
    component: () => import('@/views/NotFound'),
    meta: {
      layout: 'ErrorLayout',
    },
  },
  {
    path: ROUTES.LANDING_VIEW.path,
    name: ROUTES.LANDING_VIEW.name,
    component: LandingView,
    meta: {
      layout: 'DefaultLayout',
    },
  },
  {
    path: ROUTES.LOGIN_VIEW.path,
    name: ROUTES.LOGIN_VIEW.name,
    component: () => import('@/views/LoginView'),
    meta: {
      layout: 'AuthLayout',
    },
  },
  {
    path: ROUTES.SIGNUP_VIEW.path,
    name: ROUTES.SIGNUP_VIEW.name,
    component: () => import('@/views/SignupView'),
    meta: {
      layout: 'AuthLayout',
    },
  },
  {
    path: ROUTES.ABOUT_VIEW.path,
    name: ROUTES.ABOUT_VIEW.name,
    component: () => import('@/views/AboutView'),
    meta: {
      layout: 'DefaultLayout',
    },
  },
  {
    path: ROUTES.DASHBOARD_VIEW.path,
    name: ROUTES.DASHBOARD_VIEW.name,
    component: () => import('@/views/DashboardView'),
    meta: {
      layout: 'DefaultLayout',
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const isAuthenticated = () => {
  return !!localStorage.getItem('mock_auth_token')
}

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if ((to.name === 'login' || to.name === 'signup') && isAuthenticated()) {
    return { name: 'dashboard' }
  }

  return true
})

export default router
