import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/itemMusic',
      name: 'itemMusic',
      component: () => import('@/views/ItemMusic.vue')
    }
  ]
})

export default router