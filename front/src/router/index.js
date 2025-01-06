import { createRouter, createWebHistory } from 'vue-router'
import UrlCreateView from '../views/UrlCreateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'url-create',
      component: UrlCreateView,
    },
  ],
})

export default router
