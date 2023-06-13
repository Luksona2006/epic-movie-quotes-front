import { setLocale } from '@vee-validate/i18n'
import { defineStore } from 'pinia'

export const useLocaleStore = defineStore({
  id: 'locale',
  state: () => ({
    locale: localStorage.getItem('locale')
      ? JSON.parse(localStorage.getItem('locale'))['locale']
      : import.meta.env.VITE_DEFAULT_LOCALE
  }),

  actions: {
    changeLocale(locale) {
      setLocale(locale)
      this.$state.locale = locale
    }
  },

  persist: true
})
