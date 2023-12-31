<template>
  <div class="relative flex flex-col gap-2 items-start">
    <div
      class="relative w-full max-h-[46px] py-2 pl-4 pr-20 border border-[#6C757D] bg-transparent outline-none sm:text-xl text-base text-white rounded-[4px] cursor-pointer"
      :class="inputStyle"
      @click="showList"
    >
      <p
        class="absolute top-1/2 transform -translate-y-1/2 right-8 sm:text-xl text-base"
        :class="langColor"
        v-if="translatable"
      >
        {{ lang === 'ka' ? 'ქარ' : 'Eng' }}
      </p>
      <p :class="styling" v-if="selectedGenres.length === 0">{{ $t('basic.select_genres') }}</p>
      <transition name="list">
        <ul
          class="w-full absolute left-0 top-full z-10 rounded-b-lg bg-[#6C757D] h-24 overflow-y-auto"
          v-show="!listHidden"
        >
          <li
            class="py-2 px-4 border-t border-t-white"
            v-for="genre in genresList"
            :key="genre.id"
            @click="addGenre(genre.id)"
          >
            <p class="sm:text-lg text-base text-white font-medium">{{ genre.name[locale] }}</p>
          </li>
        </ul>
      </transition>
      <ul class="flex flex-wrap gap-2 items-center" v-if="selectedGenres.length > 0">
        <li
          class="flex gap-2 items-center py-1 px-2 bg-[#6C757D] rounded-sm cursor-default"
          v-for="selectedGenre in selectedGenres"
          :key="selectedGenre.id"
        >
          <p class="text-sm text-white">{{ selectedGenre.name[locale] }}</p>
          <div @click="removeGenre(selectedGenre.id)" class="cursor-pointer">
            <x-mark-icon class="w-[6px] h-[6px]" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { ref, watch } from 'vue'
import { useLocaleStore } from '@/store/localeStore'
import { getAllGenres } from '@/services/api/genre/index.js'

import XMarkIcon from '@/assets/icons/marks/XMarkIcon.vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  genres: {
    type: Array,
    required: false,
    default() {
      return []
    }
  },
  italicStyling: {
    type: Boolean,
    required: false,
    default: false
  }
})

const locale = ref(useLocaleStore().locale)

watch(
  () => useLocaleStore().locale,
  (newValue) => {
    locale.value = newValue
  }
)

const selectedGenres = ref(props.genres)

watch(
  () => props.genres,
  (newValue) => (selectedGenres.value = newValue)
)

const genresList = ref([])

getAllGenres().then((res) => {
  if (res.status === 200) {
    const genres = ref([])
    if (selectedGenres.value.length > 0) {
      genres.value = res.data.genres.filter((genreObj) => {
        const isSameGenre = ref(false)
        selectedGenres.value.find((selectedGenre) => {
          if (selectedGenre.id === genreObj.id) {
            isSameGenre.value = true
          }
        })
        if (!isSameGenre.value) {
          return genreObj
        }
      })
    } else {
      genres.value = res.data.genres
    }

    genresList.value = genres.value
  }
})

const styling = computed(() =>
  props.italicStyling === true
    ? 'text-[#6C757D] sm:text-2xl text-lg italic'
    : 'text-white sm:text-xl text-lg'
)

const emits = defineEmits(['updateGenres'])

const listHidden = ref(true)

function showList() {
  listHidden.value = !listHidden.value
}

function addGenre(genreId) {
  selectedGenres.value = selectedGenres.value === null ? [] : selectedGenres.value
  genresList.value.forEach((genreObj) => {
    const isSameGenre = selectedGenres.value.find((genre) => genre.id === genreObj.id) !== undefined
    if (genreObj.id === genreId && !isSameGenre) {
      selectedGenres.value.unshift(genreObj)
      genresList.value = genresList.value.filter((genre) => genre.id !== genreId)
      listHidden.value = false
    }
  })

  emits('updateGenres', selectedGenres.value)
}

function removeGenre(genreId) {
  const removedGenre = selectedGenres.value.filter((genre) => genre.id === genreId)[0]
  genresList.value.unshift(removedGenre)
  selectedGenres.value = selectedGenres.value.filter((genre) => genre.id !== genreId)
  emits('updateGenres', selectedGenres.value)
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: 0.4s all;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-2px);
}

.list-enter-to,
.list-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
