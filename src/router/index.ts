import { createRouter, createWebHistory } from "vue-router"
import pinia from "@/store/index"
import { mainStore } from "@/store/mian"
import { storeToRefs } from "pinia"
const store = mainStore(pinia)
const { isLogin, isFooterShow }  = storeToRefs(store)

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
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/Search.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      //进入InfoUser组件前先判断有没有登录
      beforeEnter:(to,from,next) => {
        if(isLogin.value) {
          next()
        }else {
          next('/login')
        }
      },
      component: () => import('@/views/UserInfo.vue')
    }
  ]
})

//全局路由守卫，实现跳转到login页面底部组件不显示，跳转其他页面底部组件显示
router.beforeEach((to, from) => {
  if(to.path === '/login') {
    isFooterShow.value = false
  }else {
    isFooterShow.value = true
  }
})

export default router