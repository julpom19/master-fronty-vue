import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'

import 'normalize.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v6/index'
import 'quasar/src/css/index.sass'


import App from './App.vue'
import router from './router/router'
import { configTheme } from './utils/theme.helper'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {})

configTheme();

app.mount('#app')
