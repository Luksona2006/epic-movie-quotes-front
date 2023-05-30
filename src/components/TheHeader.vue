<template>
  <header
    class="w-full sm:px-[70px] sm:py-8 px-4 py-7 flex justify-between items-center"
    :class="{ 'bg-[rgba(34, 32, 48, 0.2)]': loggedIn }"
  >
    <h1 class="text-[#DDCCAA] text-base">MOVIE QUOTES</h1>
    <div class="flex gap-4 items-center">
      <bell-icon v-if="loggedIn === 'true'" />
      <language-switcher class="sm:flex hidden" />
      <div class="flex gap-4 items-center" v-if="!loggedIn">
        <router-link :to="{ name: 'signup' }">
          <red-button @click="showSignUp">{{ $t('landingPage.signup') }} </red-button>
        </router-link>
        <router-link :to="{ name: 'login' }">
          <transparent-button @click="showLogin">
            {{ $t('landingPage.login') }}
          </transparent-button>
        </router-link>
      </div>
      <transparent-button @click="logout" v-if="loggedIn">
        {{ $t('landingPage.logout') }}
      </transparent-button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/userStore'
import axiosInstance from '@/config/axios'
import router from '@/router'

import languageSwitcher from '@/components/languageSwitcher.vue'
import RedButton from '@/components/buttons/RedButton.vue'
import TransparentButton from '@/components/buttons/TransparentButton.vue'
import BellIcon from '@/assets/icons/BellIcon.vue'

const emits = defineEmits(['showSignUp', 'showLogin'])
const loggedIn = ref(useUserStore().token)

function showLogin() {
  emits('showLogin')
}

function showSignUp() {
  emits('showSignUp')
}

function logout() {
  const userStore = useUserStore()

  axiosInstance.post('/logout', { user_id: userStore.id }).then((res) => {
    if (res.status === 200) {
      userStore.clearUser()
      loggedIn.value = userStore.token
      return router.push({ name: 'home' })
    }
  })
}
</script>
