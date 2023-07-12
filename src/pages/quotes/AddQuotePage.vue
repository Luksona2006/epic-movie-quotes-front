<template>
  <the-container class="grid sm:grid-cols-4 sm:mt-[120px] mt-4 pb-32 items-start">
    <side-bar-component class="sm:grid hidden" />
    <crud-popup-container
      :show="true"
      :title="$t('basic.add_quote')"
      :button-text="$t('basic.add_quote')"
      :redirectBack="true"
      @send-data="quoteCreate"
      v-if="movie"
    >
      <template #form>
        <div class="w-full flex gap-7 sm:flex-row sm:items-center flex-col items-start">
          <img
            class="sm:w-[290px] sm:h-[158px] w-full rounded-xl"
            :src="prefix + movie.image"
            alt="movie scene"
          />
          <div class="flex flex-col gap-5 items-start">
            <p class="text-2xl font-medium text-[#DDCCAA]">
              {{ movie.name[locale] }} ({{ movie.year }})
            </p>
            <ul class="flex gap-2 items-center flex-wrap">
              <li
                class="flex gap-2 py-[2px] px-3 items-center bg-[#6C757D] rounded-[4px] cursor-default"
                v-for="genre in movie.genres"
                :key="genre.id"
              >
                <p class="text-lg font-bold text-white">{{ genre.name[locale] }}</p>
              </li>
            </ul>
            <p class="text-lg font-bold text-[#CED4DA]">
              {{ $t('basic.director') }}:
              <span class="font-medium text-white">{{ movie.director[locale] }}</span>
            </p>
          </div>
        </div>
        <the-textarea
          name="quote_en"
          lang="en"
          placeholder="Quote in english"
          placeholderColor="#CED4DA"
          validation-rules="required|min:8"
          :italic-styling="true"
          :parentheses="true"
          :value="quoteEn"
        />
        <the-textarea
          name="quote_ka"
          lang="ka"
          placeholder="ციტატა ქართულ ენაზე"
          placeholderColor="#CED4DA"
          validation-rules="required|min:8"
          :italic-styling="true"
          :parentheses="true"
          :value="quoteKa"
        />
        <drag-and-drop-input name="image" id="image" @upload-image="uploadImage" />
      </template>
    </crud-popup-container>
  </the-container>
</template>

<script setup>
import router from '@/router'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/userStore'
import { useLocaleStore } from '@/store/localeStore'
import { createQuote } from '@/services/api/quote/index.js'
import { getMovie } from '@/services/api/movie/index.js'

import CrudPopupContainer from '@/components/popups/containers/CrudPopupContainer.vue'
import SideBarComponent from '@/components/SideBarComponent.vue'
import TheContainer from '@/components/TheContainer.vue'
import DragAndDropInput from '@/components/form/DragAndDropInput.vue'
import TheTextarea from '@/components/form/TheTextarea.vue'

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
const movie = ref(null)
const user = useUserStore()

const quoteEn = ref(null)
const quoteKa = ref(null)
const uploadedImage = ref(null)

function uploadImage(image) {
  uploadedImage.value = image
}

getMovie(movieId)
  .then((res) => {
    if (res.status === 200) {
      movie.value = res.data.movie
    }
  })
  .catch((err) => {
    console.error(err.message)
    if (err.response.status === 401) {
      user.clearUser()
      return router.push({ name: 'home' })
    }
  })

function quoteCreate(values, hasErrors) {
  if (!hasErrors && uploadedImage.value !== null) {
    const data = {
      quote_en: values['quote_en'],
      quote_ka: values['quote_ka'],
      movie_id: movieId,
      image: uploadedImage.value
    }

    createQuote(data).then((res) => {
      if (res.status === 200) {
        quoteEn.value = ''
        quoteKa.value = ''
        uploadedImage.value = null

        return router.push({ name: 'movie', params: { id: movieId } })
      }
    })
  }
}
</script>
