import { defineStore } from 'pinia'
import axiosInstance from '@/config/axios'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    id: null,
    token: null,
    name: null,
    email: null
    // image: null
  }),
  actions: {
    async setUserDetails(res) {
      this.$state.id = res.data.user.id
      this.$state.token = res.data.token
      this.$state.name = res.data.user.name
      this.$state.email = res.data.user.email
      // this.$state.image = res.data.user.image
    },

    fetchUsers() {
      axiosInstance.get('/users/' + this.$state.id).then((res) => {
        this.$state.id = res.data.user.id
        this.$state.token = res.data.token
        this.$state.name = res.data.user.name
        this.$state.email = res.data.user.email

        return res
      })
    },

    clearUser() {
      this.$state.id = null
      this.$state.token = null
      this.$state.name = null
      this.$state.email = null
    }
  },

  persist: true
})
