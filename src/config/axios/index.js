import axios from 'axios'

const user = JSON.parse(window.localStorage.getItem('user'))

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

if (user) {
  axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + user.token
}

export default axiosInstance
