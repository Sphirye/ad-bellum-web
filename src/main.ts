import { registerPlugins } from '@/plugins'
import App from './App.vue'
import { createApp } from 'vue'
import AxiosConfig from './config/AxiosConfig'

const app = createApp(App)
AxiosConfig.init(app)
registerPlugins(app)

app.mount('#app')
