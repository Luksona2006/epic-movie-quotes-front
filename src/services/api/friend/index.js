import axiosInstance from '@/config/axios'

function addToFriends(toUser) {
  return axiosInstance.post('friends/request', { to_user: toUser }).then((res) => res)
}

function declineRequest(fromUser) {
  return axiosInstance.delete(`friends/request/${fromUser}`).then((res) => res)
}

function acceptRequest(fromUser) {
  return axiosInstance.post('friends', { from_user: fromUser }).then((res) => res)
}

function getFriends(user) {
  return axiosInstance.get(`users/${user}/friends`).then((res) => res)
}

export { addToFriends, declineRequest, acceptRequest, getFriends }
