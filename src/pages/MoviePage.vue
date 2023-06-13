<template>
  <the-header @show-sign-up="showPopup" @show-login="showPopup" />
  <the-container class="grid sm:grid-cols-5 mt-8 pb-32 items-start px-0">
    <side-bar-component class="sm:grid hidden" />
    <div
      class="sm:grid sm:col-span-4 sm:grid-cols-7 grid-cols-1 gap-5 items-start sm:px-0 px-8"
      v-if="movie !== null"
    >
      <p class="sm:block hidden text-2xl font-medium text-white mb-8 col-span-7">
        {{ $t('basic.movie_description') }}
      </p>
      <div class="grid sm:col-span-7">
        <div class="grid sm:grid-cols-7 grid-cols-1 gap-5">
          <div class="grid sm:col-span-4">
            <img
              class="w-full sm:h-[440px] h-[302px] rounded-xl"
              :src="prefix + movie.image"
              alt="movie"
            />
          </div>
          <div class="grid sm:col-span-3">
            <div class="w-80 flex flex-col gap-5 items-start">
              <div class="w-full flex justify-between items-center">
                <p class="text-2xl font-medium text-[#DDCCAA]">
                  {{ movie.name[locale] }} ({{ movie.year }})
                </p>
                <div class="flex items-center gap-6 px-7 py-[10px] bg-[#24222F] rounded-[10px]">
                  <button class="cursor-pointer">
                    <edit-movie :movie="movie" @edit-movie="updateMovie" v-if="movie !== null" />
                  </button>
                  <div class="h-4 border border-[#6C757D] rounded-full"></div>
                  <trash-icon class="cursor-pointer" @click="removeMovie" />
                </div>
              </div>
              <ul class="flex gap-2 items-center flex-wrap">
                <li
                  class="flex gap-2 py-[2px] px-3 items-center bg-[#6C757D] rounded-[4px] cursor-default"
                  v-for="genre in movie.genres"
                >
                  <p class="text-lg font-bold text-white">{{ genre.name[locale] }}</p>
                </li>
              </ul>
              <div class="flex items-center gap-[10px]">
                <p class="text-lg font-bold text-white">{{ $t('basic.director') }}:</p>
                <p class="text-lg font-medium text-white">{{ movie.director[locale] }}</p>
              </div>
              <p class="text-lg text-white font-normal">{{ movie.description[locale] }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="grid sm:col-span-4">
        <div class="w-full flex gap-4 items-center mt-11 mb-16">
          <p class="text-white text-2xl">
            {{ $t('basic.quotes') }} ({{ $t('basic.total') }} {{ movie.quotes.length }})
          </p>
          <div class="h-6 border border-[#6C757D] rounded-full"></div>
          <router-link :to="{ name: 'add-quote', params: { id: movie.id } }">
            <red-button class="max-w-fit flex items-center gap-2">
              <union-icon />{{ $t('basic.add_quote') }}
            </red-button>
          </router-link>
        </div>
        <ul class="w-full flex flex-col gap-10" v-if="movie !== null">
          <quote-component
            v-for="quote in movie.quotes"
            :key="quote.id"
            :quote="quote"
            @remove-quote="removeQuote"
          />
        </ul>
        <p class="text-2xl font-medium text-white text-center mt-10" v-else>No quotes yet</p>
      </div>
    </div>
  </the-container>
</template>

<script setup>
import router from '@/router'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import axiosInstance from '@/config/axios'
import { useUserStore } from '@/store/userStore'
import { useLocaleStore } from '@/store/localeStore'

import TheHeader from '@/components/TheHeader.vue'
import SideBarComponent from '@/components/SideBarComponent.vue'
import TheContainer from '@/components/TheContainer.vue'
import QuoteComponent from '@/components/QuoteComponent.vue'
import EditMovie from '@/components/popups/crud/EditMovie.vue'
import RedButton from '@/components/buttons/RedButton.vue'
import UnionIcon from '@/assets/icons/UnionIcon.vue'
import TrashIcon from '@/assets/icons/TrashIcon.vue'

const route = useRoute()

const locale = ref(useLocaleStore().locale)

watch(
  () => useLocaleStore().locale,
  (newValue) => {
    locale.value = newValue
  }
)

const prefix = import.meta.env.VITE_BACK_STORAGE_URL
const movieId = route.params.id
const user = useUserStore()
const movie = ref(null)

axiosInstance.get(`/user/${user.token}/movies/${movieId}`).then((res) => {
  if (res.status === 200) {
    movie.value = res.data.movie
  }
})

function updateMovie(newMovie) {
  movie.value = newMovie
}

function removeQuote(quoteId) {
  axiosInstance.post(`/quote/remove/${quoteId}`, { user_token: user.token }).then((res) => {
    if (res.status === 200) {
      console.log(res.status, movie.value)
      movie.value['quotes'] = movie.value.quotes.filter((quote) => quote.id !== quoteId)
      console.log(movie.value)
    }
  })
}

function removeMovie() {
  axiosInstance.post(`/movie/remove/${movieId}`, { user_token: user.token }).then((res) => {
    return router.push({ name: 'movie-list' })
  })
}
</script>