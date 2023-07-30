import axiosInstance from '@/config/axios'

function getMessages(id) {
  return axiosInstance.get(`users/${id}/messages`).then((res) => res)
}

function sendMessage(data) {
  return axiosInstance.post('users/auth/messages', data).then((res) => res)
}

export { getMessages, sendMessage }
