<template>
  <transition name="sidebar">
    <div
      class="w-full min-h-full grid col-span-1 absolute left-0 top-0 bg-[#11101A] sm:static sm:w-auto sm:bg-transparent"
      v-show="show"
    >
      <ul class="min-h-full flex flex-col gap-10 items-start sm:p-0 p-11">
        <div class="w-full flex justify-between items-center">
          <router-link
            :to="{ name: 'profile' }"
            class="flex gap-6 items-center cursor-pointer"
            @click="hideSidebar('profile')"
          >
            <div>
              <img
                class="rounded-full sm:w-[60px] sm:h-[60px] w-10 h-10"
                :class="{ 'border border-[#E31221]': routeName === 'profile' }"
                :src="imageFullPath"
                alt="profile"
              />
            </div>
            <div class="flex flex-col">
              <p class="text-2xl text-white">{{ name }}</p>
              <span class="text-base text-[#CED4DA]">{{ $t('basic.edit_your_profile') }}</span>
            </div>
          </router-link>
          <language-switcher-flags class="sm:hidden min-[460px]:flex hidden" />
        </div>
        <router-link
          :to="{ name: 'news-feed' }"
          class="flex gap-6 items-center cursor-pointer"
          @click="hideSidebar('news-feed')"
        >
          <div class="w-[60px]">
            <house-icon :color="routeName === 'news-feed' ? '#E31221' : 'white'" />
          </div>
          <div class="flex flex-col">
            <p class="text-2xl text-white">{{ $t('basic.news_feed') }}</p>
          </div>
        </router-link>
        <router-link
          :to="{ name: 'movie-list' }"
          class="flex gap-6 items-center cursor-pointer"
          @click="hideSidebar('movie-list')"
        >
          <div class="w-[60px]">
            <movie-camera-icon
              :color="
                routeName === 'movie-list' ||
                routeName === 'movie' ||
                routeName === 'view-quote' ||
                routeName === 'edit-quote' ||
                routeName === 'add-quote'
                  ? '#E31221'
                  : 'white'
              "
            />
          </div>
          <div class="flex flex-col">
            <p class="text-2xl text-white">{{ $t('basic.list_of_movies') }}</p>
          </div>
        </router-link>
        <language-switcher-flags class="max-[460px]:flex hidden mb-3" />
        <white-border-button @click="logout" class="mt-10 sm:hidden block">
          {{ $t('landingPage.logout') }}
        </white-border-button>
      </ul>
    </div>
  </transition>
</template>

<script setup>
import { useUserStore } from '@/store/userStore'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { logout } from '@/services/api/auth/index.js'

import LanguageSwitcherFlags from '@/components/switcher/LanguageSwitcherFlags.vue'
import WhiteBorderButton from '@/components/buttons/WhiteBorderButton.vue'
import MovieCameraIcon from '@/assets/icons/MovieCameraIcon.vue'
import HouseIcon from '@/assets/icons/HouseIcon.vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: false,
    default: true
  }
})

const user = useUserStore()

const name = ref(user.name)
const image = ref(user.image)
const routeName = useRoute().name

const imageFullPath = ref(import.meta.env.VITE_BACK_STORAGE_URL + '' + image.value)

watch(
  () => useUserStore().image,
  (newValue) => {
    image.value = newValue
    imageFullPath.value = import.meta.env.VITE_BACK_STORAGE_URL + '' + image.value
  }
)

watch(
  () => useUserStore().name,
  (newValue) => {
    name.value = newValue
  }
)

watch(
  () => props.show,
  (newValue) => {
    if (newValue !== false) {
      window.scrollTo({
        top: 0,
        left: 0
      })

      document.body.style.overflowY = 'hidden'
    }

    if (newValue === false) {
      document.body.style.overflowY = 'auto'
    }
  }
)

const emits = defineEmits(['hideSidebar'])

function hideSidebar(route) {
  if (routeName === route) {
    emits('hideSidebar')
  }
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
  transform: translateX(-100%);
}
</style>
