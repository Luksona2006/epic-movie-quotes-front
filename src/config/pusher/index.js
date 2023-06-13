import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export default function pusherInstance() {
  window.Pusher = Pusher
  window.Echo = new Echo({
    authEndPoint: `${import.meta.env.VITE_API_URL}/boradcasting/auth`,
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true
  })
  return true
}
