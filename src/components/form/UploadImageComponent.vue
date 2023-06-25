<template>
  <div class="sm:flex hidden" :class="styles" v-if="!mobile">
    <img class="w-44 h-44 rounded-full" :src="imagePath" alt="profile" />

    <Field name="image" type="file" id="select_file" accept="image/*" @change="uploadFile" hidden />
    <p class="text-xl text-white cursor-pointer" @click="selectFile">
      {{ $t('editUserDetails.upload_new_photo') }}
    </p>
  </div>
  <Form @submit.prevent class="sm:hidden flex" :class="styles" v-else>
    <img class="w-44 h-44 rounded-full" :src="imagePath" alt="profile" />
    <div class="flex flex-col gap-4">
      <Field
        name="image"
        type="file"
        id="select_file"
        accept="image/*"
        @change="uploadFile"
        hidden
      />
      <p class="text-xl text-white cursor-pointer" @click="selectFile">
        {{ $t('editUserDetails.upload_new_photo') }}
      </p>
      <div>
        <red-button @click="saveImage">
          {{ $t('basic.save_photo') }}
        </red-button>
      </div>
    </div>
  </Form>
</template>

<script setup>
import { Field, Form } from 'vee-validate'
import { ref } from 'vue'
import axiosInstance from '@/config/axios'
import { computed } from '@vue/reactivity'
import { useUserStore } from '@/store/userStore'

import RedButton from '@/components/buttons/RedButton.vue'

const mobile = ref(window.innerWidth < 640)

window.addEventListener('resize', updateWindowWidth)

function updateWindowWidth() {
  window.innerWidth < 640 ? (mobile.value = true) : (mobile.value = false)
}

const user = useUserStore()

const styles = computed(() =>
  !mobile
    ? 'absolute left-1/2 -top-20 transform -translate-x-1/2 translate-y-4  flex-col gap-2 items-center'
    : 'w-full  flex-col gap-2 items-center mb-10'
)

function selectFile() {
  document.getElementById('select_file').click()
}

const image = ref(user.image)
const imagePath = ref(import.meta.env.VITE_BACK_STORAGE_URL + '' + image.value)
const file = ref(null)
const emits = defineEmits(['uploadFile'])

function uploadFile(e) {
  file.value = e.target.files[0]

  const reader = new FileReader()
  reader.readAsDataURL(file.value)
  reader.onload = function (event) {
    image.value = event.target.result
    imagePath.value = event.target.result
    localStorage.setItem('uploadedImage', event.target.result)
    emits('uploadFile')
  }
}

function saveImage() {
  if (localStorage.getItem('uploadedImage').startsWith('data:image/')) {
    axiosInstance.put(`/user`, { image: localStorage.getItem('uploadedImage') }).then((res) => {
      user.setUserDetails(res)
      localStorage.removeItem('uploadedImage')
    })
  }
}
</script>
