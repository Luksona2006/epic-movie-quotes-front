<template>
  <crud-popup-container
    :show="showPopup"
    @send-data="quoteCreate"
    @close-popup="closePopup"
    :title="$t('post.write_new_quote')"
    :button-text="$t('basic.post')"
  >
    <template #form>
      <the-textarea
        name="quote_en"
        lang="en"
        placeholder="New quote"
        validation-rules="required|min:8"
        :value="quoteEn"
      />
      <the-textarea
        name="quote_ka"
        lang="ka"
        placeholder="ახალი ციტატა"
        validation-rules="required|min:8"
        :value="quoteKa"
      />
      <drag-and-drop-input
        name="choose_image"
        id="choose_image"
        @upload-image="uploadImage"
        :image="uploadedImage"
      />
      <select-movie-component @select-movie="selectMovie" :selected-movie="selectedMovie" />
    </template>
  </crud-popup-container>
  <div
    class="w-full flex items-center gap-3 py-8 px-9 sm:px-4 sm:py-[15px] sm:bg-[#24222F] bg-transparent rounded-[10px] cursor-pointer"
    @click="openPopup"
  >
    <div><write-icon /></div>
    <p class="text-white text-xl">{{ $t('post.write_new_quote') }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createQuote } from '@/services/api/quote/index.js'

import CrudPopupContainer from '@/components/popups/containers/CrudPopupContainer.vue'
import WriteIcon from '@/assets/icons/WriteIcon.vue'
import SelectMovieComponent from '@/components/form/SelectMovieComponent.vue'
import TheTextarea from '@/components/form/TheTextarea.vue'
import DragAndDropInput from '@/components/form/DragAndDropInput.vue'

const showPopup = ref(false)

function openPopup() {
  showPopup.value = true
}

function closePopup() {
  showPopup.value = false
}

const uploadedImage = ref(null)

function uploadImage(image) {
  uploadedImage.value = image
}

const selectedMovie = ref(null)

function selectMovie(movie) {
  selectedMovie.value = movie
}

const quoteEn = ref(null)
const quoteKa = ref(null)

const emits = defineEmits(['addNewQuote'])

function quoteCreate(values, hasErrors) {
  if (!hasErrors && selectedMovie.value !== null && uploadedImage.value !== null) {
    const data = {
      quote_en: values['quote_en'],
      quote_ka: values['quote_ka'],
      movie_id: selectedMovie.value.id,
      image: uploadedImage.value
    }

    createQuote(data).then((res) => {
      if (res.status === 200) {
        quoteEn.value = ''
        quoteKa.value = ''
        selectedMovie.value = null
        uploadedImage.value = null
        showPopup.value = false

        emits('addNewQuote', res.data.quote)
      }
    })
  }
}
</script>
