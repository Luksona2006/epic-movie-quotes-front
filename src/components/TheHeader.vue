<template>
  <teleport to="body">
    <side-bar-component class="sm:hidden flex" v-show="sideBarShow && loggedIn" />
  </teleport>
  <header
    class="w-full sm:px-[70px] sm:py-5 px-9 py-7 flex justify-between items-center"
    :class="{ 'sm:bg-[#22203033] bg-[#24222F]': loggedIn }"
  >
    <h1 class="text-[#DDCCAA] text-base" v-if="!loggedIn">MOVIE QUOTES</h1>
    <h1 class="text-[#DDCCAA] text-base sm:block hidden" v-if="loggedIn">MOVIE QUOTES</h1>
    <burger-menu-icon v-if="loggedIn" @click="showSideBar" class="sm:hidden block" />
    <div class="flex gap-5 items-center">
      <search-component v-show="loggedIn" :hide-on-mobile="true" />
      <div>
        <bell-icon v-if="loggedIn" />
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
import axiosInstance from '@/config/axios'
import router from '@/router'

import SideBarComponent from '@/components/SideBarComponent.vue'
import LanguageSwitcher from '@/components/switcher/LanguageSwitcher.vue'
import RedButton from '@/components/buttons/RedButton.vue'
import WhiteBorderButton from '@/components/buttons/WhiteBorderButton.vue'
import BellIcon from '@/assets/icons/BellIcon.vue'
import BurgerMenuIcon from '@/assets/icons/BurgerMenuIcon.vue'
import SearchComponent from '@/components/SearchComponent.vue'

const emits = defineEmits(['showSignUp', 'showLogin'])

function showLogin() {
  emits('showLogin')
}

function showSignUp() {
  emits('showSignUp')
}

const loggedIn = ref(useUserStore().token)

function logout() {
  const user = useUserStore()

  axiosInstance.post('/logout', { user_id: user.id }).then((res) => {
    if (res.status === 200) {
      user.clearUser()
      loggedIn.value = user.token
      return router.push({ name: 'home' })
    }
  })
}

const sideBarShow = ref(false)

function showSideBar() {
  sideBarShow.value = !sideBarShow.value
}
</script>
