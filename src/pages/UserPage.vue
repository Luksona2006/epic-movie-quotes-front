<template>
  <teleport to="body">
    <message-popup :show="showMessagePopup" @close-popup="closeMessagePopup" :user="relatedUser" />
  </teleport>
  <the-header
    @show-sign-up="showPopup"
    @show-login="showPopup"
    @search-data="changeSearchingValue"
  />
  <the-container class="grid sm:grid-cols-4 sm:mt-8 mt-0 pb-32">
    <side-bar-component class="sm:grid hidden" />
    <div class="grid sm:col-span-2">
      <div
        class="relative w-full h-64 sm:bg-[#24222F] bg-[#22203098] sm:rounded-md rounded-none"
        v-if="quotesFetched"
      >
        <img
          :src="profileImage"
          class="absolute sm:left-5 left-1/2 transform sm:translate-x-0 -translate-x-1/2 sm:top-[90%] top-2/3 w-40 h-40 rounded-full"
          alt="profile"
        />
      </div>
      <div
        class="w-full flex justify-between sm:items-center sm:pl-52 pl-9 sm:pr-6 pr-9 sm:py-10 py-0 pt-24 pb-10"
        :class="{ 'items-start': isFriend && user.id !== relatedUser.id }"
        v-if="quotesFetched"
      >
        <div class="flex flex-col gap-0.5 items-start">
          <p class="text-white sm:text-3xl text-2xl">{{ relatedUser.name }}</p>
          <p class="text-white opacity-80 sm:text-xl text-lg">
            {{ $t('userPage.friends') }}: {{ relatedUser.friends }}
          </p>
        </div>
        <white-with-hover-button
          @mouseover="changeFriendHoverColor"
          @mouseout="changeFriendMainColor"
          class="flex items-center sm:gap-1 gap-0.5"
          @click="sendRequest"
          v-if="!wantsBeFriend && !isFriend && user.id !== relatedUser.id"
          ><add-friend-icon
            class="sm:w-auto w-5"
            :color="friendIconColor"
            v-if="wantsBeFriend === null"
          />
          <request-sent-icon class="sm:w-auto w-5" :color="friendIconColor" v-else />
          <p v-if="wantsBeFriend === null">{{ $t('userPage.add_to_friends') }}</p>
          <p v-else>{{ $t('userPage.decline_request') }}</p></white-with-hover-button
        >
        <div
          class="h-full flex flex-col items-center gap-2 justify-between"
          v-else-if="wantsBeFriend === true && !isFriend && user.id !== relatedUser.id"
        >
          <p class="text-white opacity-75 text-base font-medium">
            {{ relatedUser.name }} {{ $t('userPage.wants_be_your_friend') }}
          </p>
          <div class="w-full flex items-center sm:gap-1.5 gap-1">
            <green-button @click="acceptFriendRequest">Accept</green-button>
            <red-button class="py-1 px-4" @click="declineFriendRequest">Decline</red-button>
          </div>
        </div>
        <div
          class="flex items-center gap-1.5 2xl:flex-row flex-col"
          v-else-if="isFriend && user.id !== relatedUser.id"
        >
          <white-button class="flex items-center sm:gap-2 gap-1">
            <friend-icon class="sm:w-auto w-5" />
            {{ $t('userPage.friends') }}
          </white-button>
          <white-border-button
            class="w-fit sm:py-2.5 py-1.5 sm:px-[22px] px-3.5 flex items-center sm:gap-2 gap-1 font-medium"
            @click="openMessagePopup"
            @mouseover="changeMessageMainColor"
            @mouseout="changeMessageHoverColor"
            ><message-icon class="sm:w-auto w-4" :color="messageIconColor" />
            {{ $t('userPage.message') }}</white-border-button
          >
        </div>

        <router-link :to="{ name: 'profile' }" v-else
          ><white-button class="flex items-center sm:gap-2 gap-1">
            <go-to-profile-icon class="sm:w-auto w-5" />
            {{ $t('userPage.edit_profile') }}
          </white-button></router-link
        >
      </div>

      <div class="w-full h-[1px] bg-[#FFFFFF80] rounded-lg mt-10"></div>
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
import MessagePopup from '@/components/popups/MessagePopup.vue'
import PostComponent from '@/components/PostComponent.vue'
import LoadingIcon from '@/assets/icons/LoadingIcon.vue'
import WhiteButton from '@/components/buttons/WhiteButton.vue'
import WhiteBorderButton from '@/components/buttons/WhiteBorderButton.vue'
import WhiteWithHoverButton from '@/components/buttons/WhiteWithHoverButton.vue'
import MessageIcon from '@/assets/icons/friend/MessageIcon.vue'
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
const messageIconColor = ref('white')
const wantsBeFriend = ref(false)
const showMessagePopup = ref(false)

function openMessagePopup() {
  showMessagePopup.value = true
}

function closeMessagePopup() {
  showMessagePopup.value = false
}

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

function changeFriendHoverColor() {
  friendIconColor.value = 'white'
}

function changeFriendMainColor() {
  friendIconColor.value = '#222030'
}

function changeMessageHoverColor() {
  messageIconColor.value = 'white'
}

function changeMessageMainColor() {
  messageIconColor.value = '#222030'
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
