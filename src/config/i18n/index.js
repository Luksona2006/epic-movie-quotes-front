import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ka from './locales/ka.json'

let locale = import.meta.VITE_DEFAULT_LOCALE
if (localStorage.getItem('savedLocale') === undefined) {
  localStorage.setItem('savedLocale', '')
}

if (localStorage.getItem('savedLocale')) {
  locale = localStorage.getItem('savedLocale')
}

export default createI18n({
  locale,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  globalInjection: true,
  messages: { en, ka }
})
