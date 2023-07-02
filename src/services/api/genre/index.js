import axiosInstance from '@/config/axios'

function getAllGenres() {
  return axiosInstance.get('/genres').then((res) => res)
}

export { getAllGenres }
