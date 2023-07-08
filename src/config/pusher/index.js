import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import axios from 'axios'

export default function pusherInstance() {
  window.Pusher = Pusher
  window.Echo = new Echo({
    authEndPoint: `${import.meta.env.VITE_API_URL}/boradcasting/auth`,
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
    authorizer: (channel) => {
      return {
        authorize: (socketId, callback) => {
          axios
            .post(
              import.meta.env.VITE_BACK_URL + '/broadcasting/auth',
              {
                socket_id: socketId,
                channel_name: channel.name
              },
              { withCredentials: true }
            )
            .then((response) => {
              callback(null, response.data)
            })
            .catch((error) => {
              callback(error)
            })
        }
      }
    }
  })
  return true
}
