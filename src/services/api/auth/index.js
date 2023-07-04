import axiosInstance from '@/config/axios'
import { useUserStore } from '@/store/userStore'
import router from '@/router'
import axios from 'axios'

function getCookies() {
  return axios
    .get(`${import.meta.env.VITE_BACK_URL}/sanctum/csrf-cookie`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then((res) => res)
}

function login(data) {
  axiosInstance.post('/login', data).then((res) => {
    if (res.status === 200) {
      useUserStore()
        .setUserDetails(res)
        .then(() => {
          document.body.style.overflowY = 'auto'
          return router.push({ name: 'news-feed' })
        })
    }
  })
}

function resetPassword(token, data) {
  axiosInstance.post(`/reset-password/${token}`, data).then((res) => {
    if (res.status === 200) {
      return router.push({ name: 'password-reseted' })
    }
  })
}

function forgotPassword(data) {
  axiosInstance.post('/forgot-password', data).then((res) => {
    if (res.status === 200) {
      return router.push({ name: 'send-password-reset-email' })
    }
  })
}

function signup(data) {
  axiosInstance.post('/signup', data).then((res) => {
    if (res.status === 201) {
      return router.push({ name: 'send-confirmation' })
    }
  })
}

function logout() {
  axiosInstance.post('/logout').then((res) => {
    if (res.status === 200) {
      useUserStore().clearUser()
      return router.push({ name: 'home' })
    }
  })
}

export { getCookies, login, resetPassword, forgotPassword, signup, logout }
