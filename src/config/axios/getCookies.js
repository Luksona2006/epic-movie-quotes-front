import axios from 'axios'

function getCookies() {
  axios
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

  axios.defaults.withCredentials = true
}

export { getCookies }
