import axiosInstance from '@/config/axios'

function getQuotes(page) {
  return axiosInstance.post('/quotes/all', { pageNum: page }).then((res) => res)
}

function getQuote(id) {
  return axiosInstance.get(`/quotes/${id}`).then((res) => res)
}

function getUserRelatedQuotes(id, page) {
  return axiosInstance.post(`users/${id}/quotes`, { pageNum: page }).then((res) => res)
}

function createQuote(data) {
  return axiosInstance.post('/quotes', data).then((res) => res)
}

function updateQuote(id, data) {
  return axiosInstance.put(`/quotes/${id}`, data).then((res) => res)
}

function removeQuote(id) {
  return axiosInstance.delete(`/quotes/${id}`).then((res) => res)
}

function likeQuote(id, data) {
  return axiosInstance.post(`/quotes/${id}/like`, data).then((res) => res)
}

function commentQuote(id, data) {
  return axiosInstance.post(`/quotes/${id}/comment`, data).then((res) => res)
}

function searchQuotesOrMovies(searchBy, page) {
  return axiosInstance.post('/quotes/search', { searchBy, pageNum: page }).then((res) => res)
}

export {
  getQuotes,
  getQuote,
  createQuote,
  updateQuote,
  removeQuote,
  likeQuote,
  commentQuote,
  searchQuotesOrMovies,
  getUserRelatedQuotes
}
