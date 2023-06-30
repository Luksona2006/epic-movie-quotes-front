import axiosInstance from '@/config/axios'

function getAllMovies() {
  return axiosInstance.get('/movies/all').then((res) => res)
}

function getMovie(id) {
  return axiosInstance.get(`/movies/${id}`).then((res) => res)
}

function createMovie(data) {
  return axiosInstance.post('/movies', data).then((res) => res)
}

function updateMovie(id, data) {
  return axiosInstance.put(`/movies/${id}`, data).then((res) => res)
}

function removeMovie(id) {
  return axiosInstance.delete(`/movies/${id}`).then((res) => res)
}

function searchMovies(searchBy, page) {
  return axiosInstance.post('/movies/search', { searchBy, pageNum: page }).then((res) => res)
}

function getMovies(page) {
  return axiosInstance.post('/movies/page', { pageNum: page }).then((res) => res)
}

export { getAllMovies, getMovie, updateMovie, createMovie, removeMovie, searchMovies, getMovies }
