import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/userStore'
import LandingPage from '@/pages/LandingPage.vue'
import NewsFeedPage from '@/pages/NewsFeedPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import MovieListPage from '@/pages/MovieListPage.vue'
import MoviePage from '@/pages/MoviePage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import NotAccesablePage from '@/pages/NotAccesablePage.vue'
import ViewQuotePage from '@/pages/quotes/ViewQuotePage.vue'
import EditQuotePage from '@/pages/quotes/EditQuotePage.vue'
import AddQuotePage from '@/pages/quotes/AddQuotePage.vue'

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
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/movie-list',
      name: 'movie-list',
      component: MovieListPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: MoviePage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/quote/:id/view',
      name: 'view-quote',
      component: ViewQuotePage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/quote/:id/edit',
      name: 'edit-quote',
      component: EditQuotePage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/movie/:id/add-quote',
      name: 'add-quote',
      component: AddQuotePage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user/:id',
      name: 'user',
      component: LandingPage,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: NotFoundPage,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/401',
      name: '401',
      component: NotAccesablePage,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/expired',
      name: 'expired',
      component: LandingPage
    }
  ]
})

router.beforeEach((to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (useUserStore().id) {
      next()
      return
    }
    next('/401')
    return
  }

  if (to.matched.some((record) => record.meta.guest)) {
    if (useUserStore().id) {
      next('/news-feed')
      return
    }
    next()
    return
  }

  next()
})

export default router
