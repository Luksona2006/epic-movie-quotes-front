<template>
  <teleport to="body">
    <side-bar-component
      class="sm:hidden flex"
      :show="sideBarShow && loggedIn"
      @hide-sidebar="hideSidebar"
    />
  </teleport>
  <header
    class="w-full sm:px-[70px] sm:py-5 px-9 py-7 flex justify-between items-center"
    :class="{ 'sm:bg-[#22203033] bg-[#24222F]': loggedIn }"
  >
    <h1 class="text-[#DDCCAA] text-base" v-if="!loggedIn">MOVIE QUOTES</h1>
    <h1 class="text-[#DDCCAA] text-base sm:block hidden" v-if="loggedIn">MOVIE QUOTES</h1>
    <burger-menu-icon v-if="loggedIn" @click="triggerSidebar" class="sm:hidden block" />
    <div class="flex gap-5 items-center">
      <search-component v-show="loggedIn" :hide-on-mobile="true" @search-data="searchData" />
      <div class="relative">
        <bell-icon v-if="loggedIn" @click="triggerPopup" />
        <div
          class="absolute -right-4 -top-2 text-base text-white font-medium px-2 rounded-full bg-[#E33812] cursor-pointer"
          @click="triggerPopup"
          v-if="loggedIn && newsSum !== 0"
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
      <div class="flex gap-4 items-center" v-if="!loggedIn">
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
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/userStore'
import { logout } from '@/services/api/auth/index.js'
import { getNotifications } from '@/services/api/notification/index.js'

import SideBarComponent from '@/components/SideBarComponent.vue'
import LanguageSwitcher from '@/components/switcher/LanguageSwitcher.vue'
import RedButton from '@/components/buttons/RedButton.vue'
import WhiteBorderButton from '@/components/buttons/WhiteBorderButton.vue'
import BellIcon from '@/assets/icons/BellIcon.vue'
import BurgerMenuIcon from '@/assets/icons/BurgerMenuIcon.vue'
import SearchComponent from '@/components/SearchComponent.vue'
import PostNotificationsPopup from '@/components/popups/PostNotificationsPopup.vue'

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

function triggerPopup() {
  showNotificationsPopup.value = !showNotificationsPopup.value
}

const notifications = ref([])
const newsSum = ref(0)

const user = useUserStore()
if (user.id !== null) {
  getNotifications().then((res) => {
    notifications.value = res.data.notifications
    newsSum.value = res.data.newsSum
  })
}

function searchData(searchValue) {
  emits('searchData', searchValue)
}

function updateNotificationsSum(sum) {
  newsSum.value = sum
}
</script>
