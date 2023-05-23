import { createRouter, createWebHashHistory } from 'vue-router'
import TheLandingPage from '@/pages/TheLandingPage.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: TheLandingPage },
    { path: '/login', name: 'login', component: TheLandingPage },
    { path: '/signup', name: 'signup', component: TheLandingPage }
  ]
})

export default router
