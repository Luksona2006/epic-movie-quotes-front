import axiosInstance from '@/config/axios'

function updateUser(data) {
  return axiosInstance.put('/user', data).then((res) => res)
}

export { updateUser }
