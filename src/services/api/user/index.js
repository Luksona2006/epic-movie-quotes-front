import axiosInstance from '@/config/axios'

function updateUser(data) {
  return axiosInstance.put('/user', data).then((res) => res)
}

function getUser(id) {
  return axiosInstance.get(`/user/${id}`).then((res) => res)
}

function getAuthUser() {
  return axiosInstance.get(`/user/auth`).then((res) => res)
}

export { updateUser, getUser, getAuthUser }
