<template>
  <c-r-u-d-popup-container
    :show="showPopup"
    @send-data="editMovie"
    @close-popup="closePopup"
    :title="$t('basic.edit_movie')"
    :button-text="$t('basic.save_changes')"
  >
    <template #form>
      <grey-border-input
        label="Movie name"
        name="name_en"
        lang="en"
        placeholder="Movie name"
        validation-rules="required|min:2"
        :value="nameEn"
      />
      <grey-border-input
        label="ფილმის სახელი"
        name="name_ka"
        lang="ka"
        placeholder="ფილმის სახელი"
        validation-rules="required|min:2"
        :value="nameKa"
      />
      <choose-genres-component
        name="genres"
        placeholder="Enter genres"
        :genres="genres"
        @update-genres="updateGenres"
      >
      </choose-genres-component>
      <grey-border-input
        label="წელი/Year"
        name="year"
        :translatable="false"
        placeholder="წელი/Year"
        :validation-rules="'required|numeric|between:1895,' + currentYear"
        :value="year"
      />
      <grey-border-input
        label="Director"
        name="director_en"
        lang="en"
        placeholder="Director"
        validation-rules="required|min:2"
        :value="directorEn"
      />
      <grey-border-input
        label="რეჟისორი"
        name="director_ka"
        lang="ka"
        placeholder="რეჟისორი"
        validation-rules="required|min:2"
        :value="directorKa"
      />
      <the-textarea
        label="Movie description"
        name="description_en"
        lang="en"
        langColor="#6C757D"
        placeholder="Movie description"
        validation-rules="required|min:60"
        :italic-styling="false"
        :value="descriptionEn"
      />
      <the-textarea
        label="ფილმის აღწერა"
        name="description_ka"
        lang="ka"
        langColor="#6C757D"
        placeholder="ფილმის აღწერა"
        validation-rules="required|min:60"
        :italic-styling="false"
        :value="descriptionKa"
      />
      <drag-and-drop-input
        label="Movie name"
        name="choose_image"
        id="choose_image"
        :replace="true"
        @upload-image="uploadImage"
        :image="fullPath"
      />
    </template>
  </c-r-u-d-popup-container>
  <pencil-icon @click="openPopup" />
</template>

<script setup>
import { ref } from 'vue'
import axiosInstance from '@/config/axios'

import CRUDPopupContainer from '@/components/popups/containers/CRUDPopupContainer.vue'
import TheTextarea from '@/components/form/TheTextarea.vue'
import GreyBorderInput from '@/components/form/GreyBorderInput.vue'
import ChooseGenresComponent from '@/components/form/ChooseGenresComponent.vue'
import DragAndDropInput from '@/components/form/DragAndDropInput.vue'
import PencilIcon from '@/assets/icons/PencilIcon.vue'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const showPopup = ref(false)

function openPopup() {
  showPopup.value = true
}

function closePopup() {
  showPopup.value = false
}

const nameEn = ref(props.movie.name.en)
const nameKa = ref(props.movie.name.ka)
const year = ref(props.movie.year)
const currentYear = new Date().getFullYear()
const directorEn = ref(props.movie.director.en)
const directorKa = ref(props.movie.director.ka)
const descriptionEn = ref(props.movie.description.en)
const descriptionKa = ref(props.movie.description.ka)
const genres = ref(props.movie.genres)

const selectedGenres = ref(null)

function updateGenres(genres) {
  selectedGenres.value = genres
}

const prefix = import.meta.env.VITE_BACK_STORAGE_URL
const fullPath = ref(prefix + props.movie.image)
const uploadedImage = ref(null)

function uploadImage(image) {
  fullPath.value = image
  uploadedImage.value = image
}

const emits = defineEmits(['editMovie'])

function editMovie(values, hasErrors) {
  if (!hasErrors) {
    if (selectedGenres.value) selectedGenres.value = selectedGenres.value.map((genre) => genre.id)

    axiosInstance
      .put(`/movies/${props.movie.id}`, {
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
          const newMovie = res.data.movie
          nameEn.value = newMovie.name.en
          nameKa.value = newMovie.name.ka
          genres.value = newMovie.genres
          year.value = newMovie.year
          directorEn.value = newMovie.director.en
          directorKa.value = newMovie.director.ka
          descriptionEn.value = newMovie.description.en
          descriptionKa.value = newMovie.description.ka
          uploadedImage.value = newMovie.image
          showPopup.value = false

          emits('editMovie', newMovie)
        }
      })
  }
}
</script>
