import axiosInstance from '@/config/axios'

function getCookies() {
  return axiosInstance
    .get(`${import.meta.env.VITE_BACK_URL}/sanctum/csrf-cookie`)
    .then((res) => res)
}

export { getCookies }
