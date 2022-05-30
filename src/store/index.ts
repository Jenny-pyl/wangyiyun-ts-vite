import { createPinia } from "pinia"
import piniaPluginPeresist from 'pinia-plugin-persist'

const store = createPinia()
store.use(piniaPluginPeresist)
export default store
