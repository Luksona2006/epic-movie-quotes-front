<template>
  <teleport to="body">
    <side-bar-component
      class="sm:hidden flex"
      :show="sideBarShow && loggedIn"
      @hide-sidebar="hideSidebar"
    />
  </teleport>
  <header :class="{ 'sm:bg-[#22203033] bg-[#24222F]': loggedIn }">
    <div
      class="max-w-[1920px] m-auto w-full sm:px-[70px] sm:py-5 px-9 py-7 flex justify-between items-center"
    >
      <h1 class="text-[#DDCCAA] text-base" v-if="!loggedIn">MOVIE QUOTES</h1>
      <h1 class="text-[#DDCCAA] text-base sm:block hidden" v-if="loggedIn">MOVIE QUOTES</h1>
      <burger-menu-icon v-if="loggedIn" @click="triggerSidebar" class="sm:hidden block" />
      <div class="flex gap-5 items-center">
        <div v-if="loggedIn" class="relative sm:mr-10 mr-4">
          <message-icon
            @click="triggerMessagesListPopup"
            class="cursor-pointer sm:w-auto sm:h-auto w-5 h-5"
          />
          <div
            class="absolute sm:-right-8 -right-4 -top-2 sm:text-base text-sm sm:pb-0 pb-0.5 px-2 text-white font-medium rounded-full bg-[#E33812] cursor-pointer"
            @click="triggerMessagesListPopup"
            v-if="messagesSum !== 0"
          >
            {{ messagesSum }}
          </div>
          <messages-list-popup
            :show="showMessagesListPopup"
            :messages="messages"
            @update-messages-sum="updateMessagesSum"
          />
        </div>
        <search-component v-show="loggedIn" :hide-on-mobile="true" @search-data="searchData" />
        <div class="relative" v-if="loggedIn">
          <bell-icon @click="triggerNotificationsPopup" />
          <div
            class="absolute -right-4 -top-2 sm:text-base text-sm sm:pb-0 pb-0.5 px-2 text-white font-medium rounded-full bg-[#E33812] cursor-pointer"
            @click="triggerNotificationsPopup"
            v-if="newsSum !== 0"
          >
            {{ newsSum }}
          </div>
          <post-notifications-popup
            :show="showNotificationsPopup"
            :notifications="notifications"
            @update-notifications-sum="updateNotificationsSum"
          />
        </div>
        <language-switcher class="sm:flex hidden" />
        <div class="flex sm:gap-4 gap-1 items-center" v-if="!loggedIn">
          <router-link :to="{ name: 'signup' }">
            <red-button @click="showSignUp">{{ $t('landingPage.signup') }} </red-button>
          </router-link>
          <router-link :to="{ name: 'login' }">
            <white-border-button @click="showLogin">
              {{ $t('landingPage.login') }}
            </white-border-button>
          </router-link>
        </div>
        <white-border-button @click="logout" class="sm:block hidden" v-if="loggedIn">
          {{ $t('landingPage.logout') }}
        </white-border-button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { useUserStore } from '@/store/userStore'
import { logout } from '@/services/api/auth/index.js'
import { getNotifications } from '@/services/api/notification/index.js'

import SideBarComponent from '@/components/SideBarComponent.vue'
import LanguageSwitcher from '@/components/switcher/LanguageSwitcher.vue'
import RedButton from '@/components/buttons/RedButton.vue'
import WhiteBorderButton from '@/components/buttons/WhiteBorderButton.vue'
import BellIcon from '@/assets/icons/BellIcon.vue'
import BurgerMenuIcon from '@/assets/icons/BurgerMenuIcon.vue'
import MessageIcon from '@/assets/icons/friend/MessageIcon.vue'
import SearchComponent from '@/components/SearchComponent.vue'
import PostNotificationsPopup from '@/components/popups/PostNotificationsPopup.vue'
import MessagesListPopup from '@/components/popups/MessagesListPopup.vue'

const emits = defineEmits(['showSignUp', 'showLogin', 'searchData'])

function showLogin() {
  emits('showLogin')
}

function showSignUp() {
  emits('showSignUp')
}

const loggedIn = ref(useUserStore().id)

const sideBarShow = ref(false)

function triggerSidebar() {
  sideBarShow.value = !sideBarShow.value
}

function hideSidebar() {
  sideBarShow.value = false
}

const showNotificationsPopup = ref(false)

function triggerNotificationsPopup() {
  showNotificationsPopup.value = !showNotificationsPopup.value
  showMessagesListPopup.value = false
}

const showMessagesListPopup = ref(false)

function triggerMessagesListPopup() {
  showMessagesListPopup.value = !showMessagesListPopup.value
  showNotificationsPopup.value = false
}

const notifications = ref([])
const messages = ref([])
const newsSum = ref(0)
const messagesSum = ref(0)

const user = useUserStore()
if (user.id !== null) {
  getNotifications().then((res) => {
    res.data.notifications.forEach((notific) => {
      if (notific.type === 'message') {
        messages.value.unshift(notific)
      } else {
        notifications.value.unshift(notific)
      }
    })

    newsSum.value = res.data.newsSum
    messagesSum.value = res.data.messagesNewsSum
  })
}

function searchData(searchValue) {
  emits('searchData', searchValue)
}

function updateNotificationsSum(sum) {
  newsSum.value = sum
}

function updateMessagesSum(sum) {
  messagesSum.value = sum
}

const route = useRoute()

watch(
  () => route.name,
  () => {
    showNotificationsPopup.value = false
    showMessagesListPopup.value = false
  }
)
</script>
