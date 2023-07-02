import axiosInstance from '@/config/axios'

function getNotifications() {
  return axiosInstance.get(`/notifications`).then((res) => res)
}

function updateNotification() {
  return axiosInstance.put(`/notifications`).then((res) => res)
}

function updateAllNotifications(id) {
  return axiosInstance.put(`/notifications/${id}`).then((res) => res)
}

export { updateNotification, updateAllNotifications, getNotifications }
