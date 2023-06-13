<template>
  <c-r-u-d-popup-container
    :show="showPopup"
    @send-data="createQuote"
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
  </c-r-u-d-popup-container>
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
import { useUserStore } from '@/store/userStore'
import axiosInstance from '@/config/axios'

import WriteIcon from '@/assets/icons/WriteIcon.vue'
import SelectMovieComponent from '@/components/form/SelectMovieComponent.vue'
import TheTextarea from '@/components/form/TheTextarea.vue'
import DragAndDropInput from '@/components/form/DragAndDropInput.vue'
import CRUDPopupContainer from '@/components/popups/containers/CRUDPopupContainer.vue'

const showPopup = ref(false)

function openPopup() {
  showPopup.value = true
}

function closePopup() {
  showPopup.value = false
}

const user = useUserStore()

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

function createQuote(values, hasErrors) {
  if (!hasErrors && selectedMovie.value !== null && uploadedImage.value !== null) {
    axiosInstance
      .post('/quote/create', {
        user_token: user.token,
        quote_en: values['quote_en'],
        quote_ka: values['quote_ka'],
        movie_id: selectedMovie.value.id,
        image: uploadedImage.value
      })
      .then((res) => {
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
