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
    {
      path: '/f/grpc-pure',
      name: 'grpc-pure',
      component: MarkdownView,
    },
    {
      path: '/f/grpc-pure-spring-boot-starter',
      name: 'grpc-pure-spring-boot-starter',
      component: MarkdownView,
    },
    {
      path: '/f/infra-config',
      name: 'infra-config',
      component: MarkdownView,
    },
    {
      path: '/f/infra-trace',
      name: 'infra-trace',
      component: MarkdownView,
    },
  ],
})

export default router
