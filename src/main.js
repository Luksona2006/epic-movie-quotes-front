import { createApp } from 'vue/dist/vue.esm-bundler.js'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/router'
import '@/config/validationRules/index.js'
import i18n from './config/i18n'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
