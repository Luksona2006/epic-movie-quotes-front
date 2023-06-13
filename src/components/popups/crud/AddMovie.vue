<template>
  <c-r-u-d-popup-container
    :show="showPopup"
    @send-data="createMovie"
    @close-popup="closePopup"
    :title="$t('basic.add_movie')"
    :button-text="$t('basic.add_movie')"
  >
    <template #form>
      <grey-border-input
        name="name_en"
        lang="en"
        placeholder="Movie name"
        validation-rules="required|min:2"
        :value="nameEn"
      />
      <grey-border-input
        name="name_ka"
        lang="ka"
        placeholder="ფილმის სახელი"
        validation-rules="required|min:2"
        :value="nameKa"
      />
      <choose-genres-component
        name="genres"
        placeholder="Enter genres"
        :genres="selectedGenres"
        @update-genres="updateGenres"
      >
      </choose-genres-component>
      <grey-border-input
        name="year"
        :translatable="false"
        placeholder="წელი/Year"
        :validation-rules="'required|numeric|between:1895,' + currentYear"
        :value="year"
      />
      <grey-border-input
        name="director_en"
        lang="en"
        placeholder="Director"
        validation-rules="required|min:2"
        :value="directorEn"
      />
      <grey-border-input
        name="director_ka"
        lang="ka"
        placeholder="რეჟისორი"
        validation-rules="required|min:2"
        :value="directorKa"
      />
      <the-textarea
        name="description_en"
        lang="en"
        langColor="#6C757D"
        placeholder="Movie discription"
        validation-rules="required|min:60"
        :italic-styling="false"
        :value="descriptionEn"
      />
      <the-textarea
        name="description_ka"
        lang="ka"
        langColor="#6C757D"
        placeholder="ფილმის აღწერა"
        validation-rules="required|min:60"
        :italic-styling="false"
        :value="descriptionKa"
      />
      <drag-and-drop-input
        name="choose_image"
        id="choose_image"
        @upload-image="uploadImage"
        :image="uploadedImage"
      />
    </template>
  </c-r-u-d-popup-container>
  <red-button class="max-w-fit flex items-center gap-2" @click="openPopup"
    ><union-icon />{{ $t('basic.add_movie') }}</red-button
  >
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/userStore'
import axiosInstance from '@/config/axios'

import CRUDPopupContainer from '@/components/popups/containers/CRUDPopupContainer.vue'
import TheTextarea from '@/components/form/TheTextarea.vue'
import GreyBorderInput from '@/components/form/GreyBorderInput.vue'
import ChooseGenresComponent from '@/components/form/ChooseGenresComponent.vue'
import DragAndDropInput from '@/components/form/DragAndDropInput.vue'
import RedButton from '@/components/buttons/RedButton.vue'
import UnionIcon from '@/assets/icons/UnionIcon.vue'

const showPopup = ref(false)

function openPopup() {
  showPopup.value = true
}

function closePopup() {
  showPopup.value = false
}

const user = useUserStore()

const nameEn = ref(null)
const nameKa = ref(null)
const year = ref(null)
const currentYear = new Date().getFullYear()
const directorEn = ref(null)
const directorKa = ref(null)
const descriptionEn = ref(null)
const descriptionKa = ref(null)

const selectedGenres = ref([])

function updateGenres(genres) {
  selectedGenres.value = genres
}

const uploadedImage = ref(null)

function uploadImage(image) {
  uploadedImage.value = image
}

const emits = defineEmits(['addNewMovie'])

function createMovie(values, hasErrors) {
  if (!hasErrors & (uploadedImage.value !== null && selectedGenres.value.length > 0)) {
    selectedGenres.value = selectedGenres.value.map((genre) => genre.id)

    axiosInstance
      .post('/movie/create', {
        user_token: user.token,
        name_en: values['name_en'],
        name_ka: values['name_ka'],
        genres_ids: selectedGenres.value,
        year: values['year'],
        director_en: values['director_en'],
        director_ka: values['director_ka'],
        description_en: values['description_en'],
        description_ka: values['description_ka'],
        image: uploadedImage.value
      })
      .then((res) => {
        if (res.status === 200) {
          nameEn.value = ''
          nameKa.value = ''
          selectedGenres.value = []
          year.value = ''
          directorEn.value = ''
          directorKa.value = ''
          descriptionEn.value = ''
          descriptionKa.value = ''
          uploadedImage.value = null
          showPopup.value = false

          emits('addNewMovie', res.data.movie)
        }
      })
  }
}
</script>
