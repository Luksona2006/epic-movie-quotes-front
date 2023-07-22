<template>
  <the-header
    @show-sign-up="showPopup"
    @show-login="showPopup"
    @search-data="changeSearchingValue"
  />
  <the-container class="grid sm:grid-cols-4 sm:mt-8 mt-0 pb-32">
    <side-bar-component class="sm:grid hidden" />
    <div class="grid sm:col-span-2">
      <div class="relative w-full h-64 bg-[#24222F] rounded-md" v-if="quotesFetched">
        <img
          :src="profileImage"
          class="absolute left-5 top-[90%] w-40 h-40 rounded-full"
          alt="profile"
        />
      </div>
      <div class="w-full flex justify-between items-center pl-52 pr-6 py-10" v-if="quotesFetched">
        <div class="flex flex-col gap-2 items-start">
          <p class="text-white text-4xl">{{ relatedUser.name }}</p>
          <p class="text-white opacity-80 text-xl">Friends: {{ relatedUser.friends }}</p>
        </div>
        <white-button
          @mouseover="changeToHoverColor"
          @mouseout="changeToMainColor"
          class="flex items-center gap-1"
          @click="sendRequest"
          v-if="!wantsBeFriend && !isFriend && user.id !== relatedUser.id"
          ><add-friend-icon :color="friendIconColor" v-if="wantsBeFriend === null" />
          <request-sent-icon :color="friendIconColor" v-else />
          <p v-if="wantsBeFriend === null">Add to friends</p>
          <p v-else>Decline request</p></white-button
        >
        <div
          class="h-full flex flex-col items-center gap-2 justify-between"
          v-else-if="wantsBeFriend === true && !isFriend && user.id !== relatedUser.id"
        >
          <p class="text-white opacity-75 text-base font-medium">
            {{ relatedUser.name }} wants be your friend
          </p>
          <div class="w-full flex items-center gap-1.5">
            <green-button @click="acceptFriendRequest">Accept</green-button>
            <red-button class="py-1 px-4" @click="declineFriendRequest">Decline</red-button>
          </div>
        </div>
        <button
          class="flex items-center gap-2 bg-white border border-white px-6 py-2 rounded-md text-[#222030] sm:text-base text-sm font-medium"
          v-else-if="isFriend && user.id !== relatedUser.id"
        >
          <friend-icon />
          Friends
        </button>
        <router-link :to="{ name: 'profile' }" v-else
          ><button
            class="flex items-center gap-2 bg-white border border-white px-6 py-2 rounded-md text-[#222030] sm:text-base text-sm font-medium"
          >
            <go-to-profile-icon />
            Edit profile
          </button></router-link
        >
      </div>

      <div class="w-full h-[1px] bg-white opacity-60 rounded-lg mt-10"></div>
      <div class="w-full mt-20" v-if="quotesFetched">
        <div class="w-full flex flex-col sm:gap-20 gap-8" v-if="quotes.length > 0">
          <post-component v-for="quote in quotes" :quote="quote" :key="quote.id" />
        </div>
        <p class="sm:text-2xl text-xl font-bold text-white opacity-80 text-center mt-10" v-else>
          {{ $t('post.no_quotes') }}
        </p>
      </div>
      <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <loading-icon class="w-10 h-10" :show="showLoading" />
      </div>
    </div>
  </the-container>
</template>

<script setup>
import router from '@/router'
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'
import { useUserStore } from '@/store/userStore'
import { useFetchStore } from '@/store/fetchStore'
import { getUserRelatedQuotes } from '@/services/api/quote/index.js'
import { getUser } from '@/services/api/user/index.js'
import { addToFriends, declineRequest, acceptRequest } from '@/services/api/friend/index.js'

import TheHeader from '@/components/TheHeader.vue'
import SideBarComponent from '@/components/SideBarComponent.vue'
import TheContainer from '@/components/TheContainer.vue'
import PostComponent from '@/components/PostComponent.vue'
import LoadingIcon from '@/assets/icons/LoadingIcon.vue'
import WhiteButton from '@/components/buttons/WhiteButton.vue'
import AddFriendIcon from '@/assets/icons/friend/AddFriendIcon.vue'
import RequestSentIcon from '@/assets/icons/friend/RequestSentIcon.vue'
import FriendIcon from '@/assets/icons/friend/FriendIcon.vue'
import GoToProfileIcon from '@/assets/icons/GoToProfileIcon.vue'
import RedButton from '@/components/buttons/RedButton.vue'
import GreenButton from '@/components/buttons/GreenButton.vue'

const showLoading = ref(true)

const user = useUserStore()
const quotes = ref([])
const fetchStore = useFetchStore()
const quotesFetched = ref(false)

const imagePrefix = import.meta.env.VITE_BACK_STORAGE_URL
const profileImage = ref(null)

const friendIconColor = ref('#222030')
const wantsBeFriend = ref(false)

onMounted(() => {
  fetchStore.clearFetchStore()
  window.addEventListener('scroll', fetchDataOnScroll)
})

onUnmounted(() => {
  fetchStore.clearFetchStore()
  window.removeEventListener('scroll', fetchDataOnScroll)
})

fetchStore.clearFetchStore()

window.scrollTo({
  top: 0,
  left: 0
})

function changeToHoverColor() {
  friendIconColor.value = 'white'
}

function changeToMainColor() {
  friendIconColor.value = '#222030'
}

const userId = useRoute().params.id
const relatedUser = ref(null)
const isFriend = ref(false)

getUser(userId).then((res) => {
  relatedUser.value = res.data.user
  profileImage.value = imagePrefix + relatedUser.value.image
  wantsBeFriend.value = res.data.hasRecievedFriendRequest
  isFriend.value = res.data.isFriend

  getUserRelatedQuotes(userId, fetchStore.page)
    .then((res) => {
      showLoading.value = true
      if (res.status === 200) {
        quotesFetched.value = true
        showLoading.value = false
        res.data.quotes = res.data.quotes.map((quote) => {
          quote['user'] = relatedUser.value
          return quote
        })
        quotes.value.push(...res.data.quotes)

        if (res.data.isLastPage === true) {
          fetchStore.allDataFetched()
          return true
        }

        fetchStore.increasePageNum()
      }
    })
    .catch((err) => {
      console.error(err.message)
      if (err.response.status === 401) {
        user.clearUser()
        return router.push({ name: 'home' })
      }
    })
})

function getData() {
  if (fetchStore.allPagesFetched === false) {
    getUserRelatedQuotes(userId, fetchStore.page).then((res) => {
      if (res.status === 200) {
        showLoading.value = false

        res.data.quotes = res.data.quotes.map((quote) => {
          quote['user'] = relatedUser.value
          return quote
        })
        quotes.value.push(...res.data.quotes)

        fetchStore.finishFetch()
        if (res.data.isLastPage === true) {
          fetchStore.allDataFetched()
          return true
        }

        fetchStore.increasePageNum()
      }
    })
  }
}

function fetchDataOnScroll() {
  const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight
  if (scrolledToBottom && !fetchStore.isFetching && !fetchStore.allPagesFetched) {
    showLoading.value = true
    fetchStore.startFetch()
    const ms = Math.random() * (3500 - 2000) + 2000
    setTimeout(() => {
      getData()
    }, ms)
  }
}

function sendRequest() {
  if (wantsBeFriend.value === null) {
    addToFriends(relatedUser.value.id).then((res) =>
      res.status === 200 ? (wantsBeFriend.value = false) : 0
    )
  }

  if (wantsBeFriend.value === false) {
    declineFriendRequest()
  }
}

function declineFriendRequest() {
  declineRequest(relatedUser.value.id).then((res) =>
    res.status === 200 ? (wantsBeFriend.value = null) : 0
  )
}

function acceptFriendRequest() {
  acceptRequest(relatedUser.value.id).then((res) =>
    res.status === 200 ? (isFriend.value = true) : 0
  )
}
</script>
