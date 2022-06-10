import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Vue3Marquee from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import '@/utils/rem'
import "@/assets/css/base.css"
import { getVant } from './plugins'


const app = createApp(App)
getVant(app)
app.use(store)
app.use(router)
app.use(Vue3Marquee)
app.mount('#app')
