<template>
  <div class="relative w-full">
    <img class="w-full h-[513px] rounded-[10px]" :src="uploadedImage" alt="movie scene" />
    <div
      class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[10px] items-center rounded-[10px] px-4 pt-5 pb-3 bg-[#191725] bg-opacity-80 cursor-pointer"
      @click="chooseImage"
    >
      <Field type="file" :name="mutatedName" v-slot="{ field }">
        <input
          v-bind="field"
          :name="mutatedName"
          type="file"
          :id="id"
          accept="image/*"
          @change="uploadImage"
          hidden
        />
      </Field>
      <camera-icon />
      <p class="text-base text-white">Change photo</p>
    </div>
  </div>
</template>

<script setup>
import CameraIcon from '@/assets/icons/CameraIcon.vue'
import { Field } from 'vee-validate'
import { ref } from 'vue'

const props = defineProps({
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  id: {
    type: String || Number,
    required: true
  }
})

const prefix = import.meta.env.VITE_BACK_STORAGE_URL
const uploadedImage = ref(prefix + props.image)

const mutatedName = props.name.replace(' ', '_').toLowerCase()

function chooseImage() {
  document.getElementById(props.id).click()
}

const isCorrectFile = ref(true)

const emits = defineEmits(['uploadImage'])

function uploadImage(e) {
  const file = e.target.files[0]
  if (file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg')) {
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
