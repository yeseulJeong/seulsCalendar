import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Import VCalendar and its styles
import VCalendar from 'v-calendar'
import 'v-calendar/style.css';

const app = createApp(App)
const pinia = createPinia();

app.use(pinia)
app.use(router)
app.use(VCalendar)

app.mount('#app')
