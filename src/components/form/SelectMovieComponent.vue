<template>
  <div
    class="relative flex items-center gap-2 px-4 py-6 bg-black text-white cursor-pointer rounded-[4px] transition-all duration-500 z-10"
    @click="showList"
  >
    <div class="w-full">
      <div class="flex sm:gap-8 gap-3 items-center" v-if="selected.name.en !== null">
        <img
          class="sm:w-36 sm:h-24 w-[102px] h-[75px] rounded-[10px]"
          :src="fullPath"
          alt="movie-scene"
        />
        <div class="flex flex-col gap-[10px] items-start">
          <div class="flex items-center gap-3">
            <movie-camera-icon class="sm:block hidden" />
            <p class="sm:text-lg text-base font-normal transition-all duration-500 z-10">
              {{ selected.name[locale] }} ({{ selected.year }})
            </p>
          </div>
          <p class="sm:text-lg text-base font-bold transition-all duration-500 z-10">
            {{ $t('basic.director') }}: <span>{{ selected.director[locale] }}</span>
          </p>
        </div>
      </div>
      <div class="flex sm:gap-8 gap-3 items-center" v-else>
        <movie-camera-icon />
        <p class="sm:text-lg text-base font-normal transition-all duration-500 z-10">
          {{ $t('post.choose_movie') }}
        </p>
      </div>
      <arrow-down-icon
        class="absolute top-1/2 right-8 transform -translate-y-1/2 transition-all duration-500"
        :class="show ? 'rotate-180' : 'rotate-0'"
      />
    </div>
    <ul
      class="w-full absolute right-0 rounded-b-[4px] rounded-br-[4px] bg-black transition-all duration-500 cursor-pointer overflow-y-scroll max-h-28"
      :class="dropDownClass"
    >
      <li
        class="w-full flex items-center sm:gap-8 gap-3 py-3 px-5 cursor-pointer border-t border-t-[#EFEFEF33]"
        v-for="movie in movies"
        :key="movie.id"
        @click="selectMovie(movie)"
      >
        <img
          class="sm:w-36 sm:h-24 w-[102px] h-[75px] rounded-[10px]"
          :src="prefix + movie.image"
          alt="movie-scene"
        />
        <div class="flex flex-col gap-[10px] items-start">
          <div class="flex items-center gap-3">
            <movie-camera-icon class="sm:block hidden" />
            <p class="sm:text-lg text-base font-normal transition-all duration-500 z-10">
              {{ movie.name[locale] }} ({{ movie.year }})
            </p>
          </div>
          <p class="sm:text-lg text-base font-bold transition-all duration-500 z-10">
            {{ $t('basic.director') }}: <span>{{ movie.director[locale] }}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import ArrowDownIcon from '@/assets/icons/arrows/ArrowDownIcon.vue'
import MovieCameraIcon from '@/assets/icons/MovieCameraIcon.vue'

const props = defineProps({
  movies: {
    type: Array,
    required: true,
    default: [
      {
        name: {
          en: null,
          ka: null
        },
        year: null,
        director: {
          en: null,
          ka: null
        },
        image: null
      }
    ]
  }
})

const locale = ref(localStorage.getItem('savedLocale'))

const show = ref(false)
const selected = ref({
  name: {
    en: null,
    ka: null
  },
  year: null,
  director: {
    en: null,
    ka: null
  },
  image: null
})

const prefix = ref(import.meta.env.VITE_BACK_STORAGE_URL)
const fullPath = ref(prefix.value + '' + selected.value.image)

const dropDownClass = computed(() => (show.value ? 'top-[100%] opacity-100' : 'top-0 opacity-0'))

function showList() {
  show.value = !show.value
}

const emits = defineEmits(['selectMovie'])

function selectMovie(movie) {
  selected.value = movie
  emits('selectMovie', movie)
}
</script>
