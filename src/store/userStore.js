import { defineStore } from 'pinia'
import axiosInstance from '@/config/axios'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    id: null,
    name: null,
    email: null,
    password: null,
    image: null
  }),
  actions: {
    async setUserDetails(res) {
      this.$state.id = res.data.user.id
      this.$state.name = res.data.user.name
      this.$state.email = res.data.user.email
      this.$state.password = res.data.user.password
      this.$state.image = res.data.user.image
    },

    fetchUsers() {
      axiosInstance.get('/users/' + this.$state.token).then((res) => {
        this.$state.id = res.data.user.id
        this.$state.name = res.data.user.name
        this.$state.email = res.data.user.email
        this.$state.password = res.data.user.password
        this.$state.image = res.data.user.image

        return res
      })
    },

    clearUser() {
      this.$state.id = null
      this.$state.name = null
      this.$state.email = null
      this.$state.password = null
    }
  },

  persist: true
})
