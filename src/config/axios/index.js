import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

axiosInstance.defaults.withCredentials = true

export default axiosInstance
