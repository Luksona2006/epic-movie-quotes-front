import axiosInstance from '@/config/axios'

function getMessages(id) {
  return axiosInstance.get(`messages/users/${id}`).then((res) => res)
}

function sendMessage(data) {
  return axiosInstance.post('messages', data).then((res) => res)
}

export { getMessages, sendMessage }
