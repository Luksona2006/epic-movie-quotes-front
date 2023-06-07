<template>
  <teleport to="body">
    <background-blur :show="showPopup" />
    <transition name="popup">
      <Form
        @submit.prevent
        class="sm:w-[46.5%] w-full absolute left-1/2 sm:top-28 top-0 transform -translate-x-1/2 py-10 bg-[#11101A] rounded-xl z-50"
        v-show="showPopup"
      >
        <div class="border-b border-b-[#EFEFEF33] pb-6 relative">
          <p class="sm:text-2xl text-xl text-white text-center font-medium">
            {{ $t('post.write_new_quote') }}
          </p>
          <x-mark-icon class="absolute right-8 top-2 cursor-pointer" @click="closePopup" />
        </div>

        <div class="flex flex-col gap-10 px-8 pt-7">
          <div class="flex items-center gap-4">
            <img
              :src="imageFullPath"
              alt="profile"
              class="sm:w-[60px] sm:h-[60px] w-10 h-10 rounded-full"
            />
            <p class="sm:text-2xl text-xl text-white">{{ name }}</p>
          </div>
          <div class="flex flex-col gap-6">
            <div class="relative">
              <textarea
                name="quote_en"
                id="quote_en"
                rows="3"
                class="w-full py-2 pl-4 pr-20 border border-[#6C757D] bg-transparent outline-none boxShadow sm:text-xl text-base text-white placeholder:text-[#6C757D] sm:placeholder:text-2xl placeholder:text-lg placeholder:italic rounded-[4px]"
                placeholder="New quote"
                v-model="quoteEn"
              ></textarea>
              <p class="absolute top-3 transform right-8 sm:text-xl text-base text-white">Eng</p>
            </div>
            <div class="relative">
              <textarea
                name="quote_ka"
                id="quote_ka"
                rows="3"
                class="w-full py-2 pl-4 pr-20 border border-[#6C757D] bg-transparent outline-none boxShadow sm:text-xl text-base text-white placeholder:text-[#6C757D] sm:placeholder:text-2xl placeholder:text-lg placeholder:italic rounded-[4px]"
                placeholder="ახალი ციტატა"
                v-model="quoteKa"
              ></textarea>
              <p class="absolute top-3 transform right-8 sm:text-xl text-base text-white">ქარ</p>
            </div>
            <div
              @dragover.prevent="dragOver"
              @dragleave.prevent="dragLeave"
              @drop.prevent="dropImage"
              @click="chooseImage(true)"
              class="flex sm:justify-normal justify-between gap-2 items-center px-4 py-7 sm:border border-[#6C757D] border-0 sm:bg-transparent bg-black rounded-[4px] sm:cursor-auto cursor-pointer"
            >
              <div class="flex gap-2 items-center">
                <input
                  name="image"
                  type="file"
                  id="choose_image"
                  accept="image/*"
                  @change="uploadImage"
                  hidden
                />
                <camera-icon />
                <p
                  class="sm:text-xl text-lg text-white"
                  v-show="isDragging && uploadedImage === null && isCorrectFile"
                >
                  {{ $t('basic.drop_your_image') }}
                </p>
                <p
                  class="sm:text-xl text-lg text-white"
                  v-show="!isDragging && uploadedImage === null && !isCorrectFile"
                >
                  {{ $t('basic.file_should_be_image') }}
                </p>
                <p
                  class="sm:block hidden sm:text-xl text-lg text-white"
                  v-show="!isDragging && uploadedImage === null && isCorrectFile"
                >
                  {{ $t('basic.drag_and_drop_your_image') }}
                </p>
                <p
                  class="sm:hidden block sm:text-xl text-lg text-white"
                  v-show="!isDragging && uploadedImage === null && isCorrectFile"
                >
                  {{ $t('basic.upload_image') }}
                </p>
                <div class="flex gap-2 items-center mx-2" v-show="uploadedImage !== null">
                  <img :src="uploadedImage" alt="movie" class="w-10 h-10" />
                  <p class="sm:text-xl text-lg text-white">{{ uploadedImageName }}</p>
                </div>
              </div>
              <button
                class="p-[10px] bg-[#9747FF66] sm:text-xl text-lg text-white rounded-sm"
                v-if="!mobile"
                @click="chooseImage"
              >
                {{ $t('basic.choose_file') }}
              </button>
            </div>
            <select-movie-component @select-movie="selectMovie" :movies="allMovies" />
          </div>
          <red-button @click="createQuote">{{ $t('basic.post') }}</red-button>
        </div>
      </Form>
    </transition>
  </teleport>
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
import { Form } from 'vee-validate'
import { useUserStore } from '@/store/userStore'
import axiosInstance from '@/config/axios'

import WriteIcon from '@/assets/icons/WriteIcon.vue'
import BackgroundBlur from '@/components/popup/BackgroundBlur.vue'
import RedButton from '@/components/buttons/RedButton.vue'
import CameraIcon from '@/assets/icons/CameraIcon.vue'
import SelectMovieComponent from '@/components/form/SelectMovieComponent.vue'
import XMarkIcon from '@/assets/icons/marks/XMarkIcon.vue'

const showPopup = ref(false)

function openPopup() {
  showPopup.value = true
  window.scrollTo({
    top: 0,
    left: 0
  })
  document.body.style.overflowY = 'hidden'
}

function closePopup() {
  showPopup.value = false
  document.body.style.overflowY = 'auto'
}

const user = useUserStore()

const name = ref(user.name)
const image = ref(user.image)

const imageFullPath = ref(import.meta.env.VITE_BACK_STORAGE_URL + '' + image.value)

const mobile = ref(window.innerWidth < 640)

window.addEventListener('resize', updateWindowWidth)

function updateWindowWidth() {
  window.innerWidth < 640 ? (mobile.value = true) : (mobile.value = false)
}

function chooseImage(clickableOnMobile = false) {
  if ((clickableOnMobile && mobile.value) || (!clickableOnMobile && !mobile.value)) {
    document.getElementById('choose_image').click()
  }
}

const isDragging = ref(false)
const isCorrectFile = ref(true)
const uploadedImage = ref(null)
const uploadedImageName = ref(null)

function dragOver(e) {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'copy'
  isDragging.value = true
}

function dragLeave(e) {
  e.preventDefault()
  isDragging.value = false
}

function dropImage(e) {
  e.preventDefault()
  isDragging.value = false
  const file = e.dataTransfer.files[0]
  if (file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg')) {
    isCorrectFile.value = true
    uploadedImageName.value = file.name

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (event) {
      uploadedImage.value = event.target.result
    }
  } else {
    isCorrectFile.value = false
    setTimeout(() => {
      isCorrectFile.value = true
    }, 1000)
  }
}

function uploadImage(e) {
  const file = e.target.files[0]
  if (file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg')) {
    uploadedImageName.value = file.name

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (event) {
      uploadedImage.value = event.target.result
    }
  } else {
    isCorrectFile.value = false
  }
}

const selectedMovie = ref(null)

function selectMovie(movie) {
  selectedMovie.value = movie
}

const quoteEn = ref(null)
const quoteKa = ref(null)

function createQuote() {
  if (
    quoteEn.value !== null &&
    quoteKa.value !== null &&
    selectedMovie.value !== null &&
    uploadedImage.value !== null
  ) {
    axiosInstance
      .post('/quote/create', {
        quote_en: quoteEn.value,
        quote_ka: quoteKa.value,
        movie_id: selectedMovie.value.id,
        image: uploadedImage.value
      })
      .then((res) => {
        if (res.status === 200) {
          ;(quoteEn.value = null),
            (quoteKa.value = null),
            (selectedMovie.value = null),
            (uploadedImage.value = null)
        }
      })
  }
}

const allMovies = ref([
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
])

axiosInstance.post('/movies/get-all', { token: user.token }).then((res) => {
  allMovies.value = res.data
})
</script>

<style scoped>
.boxShadow {
  transition: all 0.4s;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
}
.boxShadow:focus {
  box-shadow: 0px 0px 0px 4px rgba(13, 110, 253, 0.25);
}

.popup-enter-active,
.popup-leave-active {
  transition: 0.4s all;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}

.popup-enter-to,
.popup-leave-from {
  opacity: 1;
  transform: translate(-50%, 0);
}
</style>
