import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import VueSplide from '@splidejs/vue-splide'

import './assets/main.css'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(VueSplide)

app.mount('#app')
