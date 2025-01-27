import { createRouter, createWebHistory } from 'vue-router'
import UrlCreateView from '../views/UrlCreateView.vue'
import MarkdownView from '../components/MarkdownView.vue'

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
      component: MarkdownView,
    },
    {
      path: '/f/deploy',
      name: 'deploy',
      component: MarkdownView,
    },
  ],
})

export default router
