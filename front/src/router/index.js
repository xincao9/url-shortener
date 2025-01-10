import { createRouter, createWebHistory } from 'vue-router'
import UrlCreateView from '../views/UrlCreateView.vue'
import ApiDocView from '../views/ApiDocView.vue'
import DeployView from '../views/DeployView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'url-create',
      component: UrlCreateView,
    },
    {
      path: '/f/api-doc',
      name: 'api-doc',
      component: ApiDocView,
    },
    {
      path: '/f/deploy',
      name: 'deploy',
      component: DeployView,
    },
  ],
})

export default router
