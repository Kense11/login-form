import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const { isLoggedIn } = useUser()

router.beforeEach(({ meta: { requiresAuth }, name }) => {
  if (name === 'login' && isLoggedIn.value)
    return { name: 'welcome', replace: true }

  if (requiresAuth && !isLoggedIn.value)
    return { name: 'login' }
})

createApp(App)
  .use(VueQueryPlugin)
  .use(router)
  .mount('#app')
