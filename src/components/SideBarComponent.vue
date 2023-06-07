<template>
  <transition name="sidebar">
    <div
      class="w-full min-h-full grid col-span-1 absolute left-0 top-0 bg-[#11101A] sm:static sm:w-auto sm:bg-transparent"
    >
      <ul class="min-h-full flex flex-col gap-10 items-start sm:p-0 p-11">
        <div class="w-full flex justify-between items-center">
          <router-link :to="{ name: 'profile' }" class="flex gap-6 items-center cursor-pointer">
            <div>
              <img
                class="rounded-full sm:w-[60px] sm:h-[60px] w-10 h-10"
                :class="{ 'border border-[#E31221]': routerName === 'profile' }"
                :src="imageFullPath"
                alt="profile"
              />
            </div>
            <div class="flex flex-col">
              <p class="text-2xl text-white">{{ name }}</p>
              <span class="text-base text-[#CED4DA]">{{ $t('basic.edit_your_profile') }}</span>
            </div>
          </router-link>
          <language-switcher-flags class="sm:hidden flex" />
        </div>
        <router-link :to="{ name: 'news-feed' }" class="flex gap-6 items-center cursor-pointer">
          <div class="w-[60px]">
            <house-icon :color="routerName === 'news-feed' ? '#E31221' : 'white'" />
          </div>
          <div class="flex flex-col">
            <p class="text-2xl text-white">{{ $t('basic.news_feed') }}</p>
          </div>
        </router-link>
        <router-link :to="{ name: 'movie-list' }" class="flex gap-6 items-center cursor-pointer">
          <div class="w-[60px]">
            <movie-camera-icon :color="routerName === 'movie-list' ? '#E31221' : 'white'" />
          </div>
          <div class="flex flex-col">
            <p class="text-2xl text-white">{{ $t('basic.list_of_movies') }}</p>
          </div>
        </router-link>
        <white-border-button @click="logout" class="mt-10 sm:hidden block">
          {{ $t('landingPage.logout') }}
        </white-border-button>
      </ul>
    </div>
  </transition>
</template>

<script setup>
import { useUserStore } from '@/store/userStore'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import LanguageSwitcherFlags from '@/components/switcher/LanguageSwitcherFlags.vue'
import WhiteBorderButton from '@/components/buttons/WhiteBorderButton.vue'
import MovieCameraIcon from '@/assets/icons/MovieCameraIcon.vue'
import HouseIcon from '@/assets/icons/HouseIcon.vue'

const user = useUserStore()

const name = ref(user.name)
const image = ref(user.image)
const routerName = useRoute().name

const imageFullPath = ref(import.meta.env.VITE_BACK_STORAGE_URL + '' + image.value)

function logout() {
  axiosInstance.post('/logout', { user_id: user.id }).then((res) => {
    if (res.status === 200) {
      user.clearUser()
      loggedIn.value = user.token
      return router.push({ name: 'home' })
    }
  })
}
</script>

<style scoped>
.sidebar-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.sidebar-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.sidebar-enter-active,
.sidebar-leave-active {
  transition: 0.5s all;
}

.sidebar-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.sidebar-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
