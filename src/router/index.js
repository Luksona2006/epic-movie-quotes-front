import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/pages/LandingPage.vue'
import NewsFeedPage from '@/pages/NewsFeedPage.vue'
import { useUserStore } from '../store/userStore'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage,
      meta: {
        guest: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LandingPage,
      meta: {
        guest: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: LandingPage,
      meta: {
        guest: true
      }
    },
    {
      path: '/send-confirmation',
      name: 'send-confirmation',
      component: LandingPage,
      meta: {
        guest: true
      }
    },
    {
      path: '/verified/:token',
      name: 'verified',
      component: LandingPage,
      meta: {
        guest: true
      }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: LandingPage,
      meta: {
        guest: true
      }
    },
    {
      path: '/send-password-reset-email',
      name: 'send-password-reset-email',
      component: LandingPage,
      meta: {
        guest: true
      }
    },
    {
      path: '/reset-password/:token',
      name: 'reset-password',
      component: LandingPage,
      meta: {
        guest: true
      }
    },
    {
      path: '/password-reseted',
      name: 'password-reseted',
      component: LandingPage,
      meta: {
        guest: true
      }
    },
    {
      path: '/news-feed',
      name: 'news-feed',
      component: NewsFeedPage,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (useUserStore().token) {
      next()
      return
    }
    next('/login')
  }

  if (to.matched.some((record) => record.meta.guest)) {
    if (useUserStore().token) {
      next('/news-feed')
      return
    }
    next()
  }

  next()
})

export default router
