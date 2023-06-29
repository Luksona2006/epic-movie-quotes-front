import { defineStore } from 'pinia'
import axiosInstance from '@/config/axios'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    id: null,
    google_id: null,
    name: null,
    email: null,
    image: null
  }),
  actions: {
    async setUserDetails(res) {
      this.$state.id = res.data.user.id
      this.$state.google_id = res.data.user.google_id
      this.$state.name = res.data.user.name
      this.$state.email = res.data.user.email
      this.$state.image = res.data.user.image
    },

    fetchUsers() {
      axiosInstance.get('/user/details').then((res) => {
        this.$state.id = res.data.user.id
        this.$state.google_id = res.data.user.google_id
        this.$state.name = res.data.user.name
        this.$state.email = res.data.user.email

        this.$state.image = res.data.user.image

        return res
      })
    },

    clearUser() {
      this.$state.id = null
      this.$state.google_id = null
      this.$state.name = null
      this.$state.email = null
      this.$state.password = null
      this.$state.image = null
    }
  },

  persist: true
})
