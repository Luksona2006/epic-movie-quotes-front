import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/pages/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: LandingPage },
    { path: '/login', name: 'login', component: LandingPage },
    { path: '/signup', name: 'signup', component: LandingPage }
  ]
})

export default router
