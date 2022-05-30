import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import '@/utils/rem'
import { getVant } from './plugins'


const app = createApp(App)
getVant(app)
app.use(router)
app.use(store)
app.mount('#app')
