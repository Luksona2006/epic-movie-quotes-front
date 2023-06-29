<template>
  <router-link :to="{ name: 'movie', params: { id: movie.id } }" v-if="redirect">
    <div class="flex flex-col gap-4 items-start">
      <img :src="fullPath" alt="movie-scene" class="rounded-xl w-full sm:h-[370px] h-[302px]" />
      <p class="text-2xl text-white">{{ movie.name[locale] }} ({{ movie.year }})</p>
      <div class="flex items-center gap-3">
        <p class="text-xl text-white">
          {{ movie.quotes }}
        </p>
        <div><comment-parentheses-icon /></div>
      </div>
    </div>
  </router-link>
  <div class="flex flex-col gap-4 items-start" v-else>
    <img :src="fullPath" alt="movie-scene" class="rounded-xl w-full sm:h-[370px] h-[302px]" />
    <p class="text-2xl text-white">{{ movie.name[locale] }} ({{ movie.year }})</p>
    <div class="flex items-center gap-3">
      <p class="text-xl text-white">
        {{ movie.quotesTotal }}
      </p>
      <div><comment-parentheses-icon /></div>
    </div>
  </div>
</template>

<script setup>
import { useLocaleStore } from '@/store/localeStore'
import { ref, watch } from 'vue'

import CommentParenthesesIcon from '@/assets/icons/CommentParenthesesIcon.vue'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  },
  redirect: {
    type: Boolean,
    required: false,
    default: true
  }
})

const fullPath = import.meta.env.VITE_BACK_STORAGE_URL + props.movie.image
const locale = ref(useLocaleStore().locale)

watch(
  () => useLocaleStore().locale,
  (newValue) => {
    locale.value = newValue
  }
)
</script>
