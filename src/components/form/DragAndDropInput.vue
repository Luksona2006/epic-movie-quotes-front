<template>
  <Field type="file" :name="mutatedName" v-slot="{ field }">
    <div
      class="grid grid-cols-2 items-center gap-4 border border-[#6C757D] py-5 pl-4 sm:pr-16 pr-4"
      v-if="replace"
      @dragover.prevent="dragOver"
      @dragleave.prevent="dragLeave"
      @drop.prevent="dropImage"
    >
      <img :src="uploadedImage" alt="movie" class="w-full sm:h-[148px] h-[110px]" />
      <div class="flex flex-col gap-3 sm:items-center items-start sm:my-0 sm:mr-0 my-auto mr-auto">
        <input
          v-bind="field"
          :name="mutatedName"
          type="file"
          :id="id"
          accept="image/*"
          @change="uploadImage"
          hidden
        />
        <p class="text-base font-bold text-[#DDCCAA]">Replace photo</p>
        <p
          class="sm:text-xl text-lg text-white text-center"
          v-show="isDragging && uploadedImageName === null && isCorrectFile"
        >
          {{ $t('basic.drop_your_image') }}
        </p>
        <p
          class="sm:text-xl text-lg text-white text-center"
          v-show="!isDragging && uploadedImageName === null && !isCorrectFile"
        >
          {{ $t('basic.file_should_be_image') }}
        </p>
        <div
          class="flex gap-2 items-center"
          v-show="!isDragging && uploadedImageName === null && isCorrectFile"
        >
          <camera-icon class="sm:block hidden" />
          <p class="sm:block hidden sm:text-xl text-lg text-white text-center">
            {{ $t('basic.drag_and_drop_your_image') }}
          </p>
        </div>
        <div class="flex gap-2 items-center mx-2" v-show="uploadedImageName !== null">
          <p class="sm:text-xl text-lg text-white text-center">{{ uploadedImageName }}</p>
        </div>
        <button
          class="sm:py-[10px] py-[5px] px-[10px] bg-[#9747FF66] sm:text-xl text-sm text-white rounded-sm"
          @click="chooseImage"
        >
          {{ $t('basic.choose_file') }}
        </button>
      </div>
    </div>
    <div
      @dragover.prevent="dragOver"
      @dragleave.prevent="dragLeave"
      @drop.prevent="dropImage"
      class="flex sm:justify-normal justify-between gap-2 items-center px-4 py-7 sm:border border-[#6C757D] border-0 sm:bg-transparent bg-black rounded-[4px] sm:cursor-auto cursor-pointer"
      v-else
    >
      <div class="flex gap-2 items-center">
        <input
          v-bind="field"
          :name="mutatedName"
          type="file"
          :id="id"
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
        @click="chooseImage"
      >
        {{ $t('basic.choose_file') }}
      </button>
    </div>
  </Field>
  <ErrorMessage :name="mutatedName" />
</template>

<script setup>
import { ref, watch } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'

import CameraIcon from '@/assets/icons/CameraIcon.vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false,
    default: null
  },
  id: {
    type: String || Number,
    required: true
  },
  replace: {
    type: Boolean,
    required: false,
    default: false
  }
})

const mutatedName = props.name.replace(' ', '_').toLowerCase()
const mobile = ref(window.innerWidth < 640)

window.addEventListener('resize', updateWindowWidth)

function updateWindowWidth() {
  window.innerWidth < 640 ? (mobile.value = true) : (mobile.value = false)
}

function chooseImage() {
  document.getElementById(props.id).click()
}
const isDragging = ref(false)
const isCorrectFile = ref(true)
const uploadedImage = ref(props.image)
const uploadedImageName = ref(null)

watch(
  () => props.image,
  (newValue) => {
    if (!newValue) {
      uploadedImage.value = null
      uploadedImageName.value = null
    }
  }
)

function dragOver(e) {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'copy'
  isDragging.value = true
}

function dragLeave(e) {
  e.preventDefault()
  isDragging.value = false
}

const emits = defineEmits(['uploadImage'])

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
      emits('uploadImage', uploadedImage.value)
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
      emits('uploadImage', uploadedImage.value)
    }
  } else {
    isCorrectFile.value = false
  }
}
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
