import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'authorization',
    component: () => import('../views/Authorization.vue')
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: () => import('../views/Analytics.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
