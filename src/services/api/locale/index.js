import axiosInstance from '@/config/axios'

function setLocale(locale) {
  return axiosInstance.post('/locale', { locale }).then((res) => res)
}

export { setLocale }
