import { createApp } from 'vue/dist/vue.esm-bundler.js'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from '@/App.vue'
import router from '@/router'
import '@/config/vee-validate/messages.js'
import i18n from '@/config/i18n'
import pusherInstance from '@/config/pusher'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
pusherInstance()

app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')
