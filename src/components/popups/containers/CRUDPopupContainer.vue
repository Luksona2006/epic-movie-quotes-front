<template>
  <teleport to="body">
    <background-blur :show="show" @click="closePopup" />
    <transition name="popup">
      <div
        @submit.prevent
        class="sm:w-[46.5%] w-full absolute left-1/2 sm:top-28 top-0 transform -translate-x-1/2 pt-8 pb-16 bg-[#11101A] rounded-xl z-50"
        v-show="show"
      >
        <header class="w-full border-b border-b-[#EFEFEF33] pb-6 px-8">
          <div :class="headerContentStyle">
            <div class="flex items-center gap-6" v-if="editable || deletable">
              <router-link :to="{ name: 'edit-quote', params: { id: paramId } }" v-if="editable"
                ><pencil-icon
              /></router-link>
              <div class="h-4 w-[1px] bg-[#6C757D] rounded-full" v-if="editable && deletable"></div>
              <trash-icon class="cursor-pointer" @click="removeQuote" v-if="deletable" />
            </div>
            <p class="sm:text-2xl text-xl text-white text-center font-medium" :class="titleStyle">
              {{ title }}
            </p>

            <x-mark-icon :class="xMarkStyle" @click="closePopup" v-if="!redirectBack" />
            <x-mark-icon :class="xMarkStyle" @click="redirect" v-else />
          </div>
        </header>

        <div class="flex flex-col gap-10 px-8 pt-7">
          <div class="flex items-center gap-4">
            <img
              :src="imageFullPath"
              alt="profile"
              class="sm:w-[60px] sm:h-[60px] w-10 h-10 rounded-full"
            />
            <p class="sm:text-2xl text-xl text-white">{{ name }}</p>
          </div>
          <Form @submit.prevent class="flex flex-col gap-6" v-slot="{ values, errors }">
            <slot name="form"></slot>
            <red-button @click="sendData(values, errors)" v-if="isForm">{{
              buttonText
            }}</red-button>
          </Form>
          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import router from '@/router'
import { ref, watch } from 'vue'
import { computed } from '@vue/reactivity'
import { Form } from 'vee-validate'
import { useUserStore } from '@/store/userStore'
import axiosInstance from '@/config/axios'

import BackgroundBlur from '@/components/popups/BackgroundBlur.vue'
import RedButton from '@/components/buttons/RedButton.vue'
import XMarkIcon from '@/assets/icons/marks/XMarkIcon.vue'
import PencilIcon from '@/assets/icons/PencilIcon.vue'
import TrashIcon from '@/assets/icons/TrashIcon.vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: false,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    required: true
  },
  isForm: {
    type: Boolean,
    required: false,
    default: true
  },
  editable: {
    type: Boolean,
    required: false,
    default: false
  },
  deletable: {
    type: Boolean,
    required: false,
    default: false
  },
  paramId: {
    type: String || Number,
    required: false,
    default: ''
  },
  redirectBack: {
    type: Boolean,
    required: false,
    default: false
  }
})

watch(
  () => props.show,
  (newValue) => {
    if (newValue === true) {
      window.scrollTo({
        top: 0,
        left: 0
      })
      // document.body.style.overflowY = 'hidden'
    }

    if (newValue === false) {
      document.body.style.overflowY = 'auto'
    }
  }
)

function closePopup() {
  emits('closePopup')

  document.body.style.overflowY = 'auto'
}

function redirect() {
  router.back()
}

const headerContentStyle = computed(() =>
  props.editable || props.deletable ? 'w-full flex items-center justify-between' : 'relative'
)

const xMarkStyle = computed(() =>
  !props.editable && !props.deletable ? 'absolute right-0 top-2 cursor-pointer' : 'block'
)

const titleStyle = computed(() => (props.editable && props.deletable ? 'sm:block hidden' : ''))

const user = useUserStore()

const name = ref(user.name)
const image = ref(user.image)

const imageFullPath = ref(import.meta.env.VITE_BACK_STORAGE_URL + '' + image.value)

const emits = defineEmits(['sendData'])

function sendData(values, errors) {
  emits('sendData', values, Object.keys(errors).length > 0)
}

function removeQuote() {
  axiosInstance.post(`/quote/remove/${props.paramId}`).then((res) => {
    if (res.status === 200) {
      return router.push({ name: 'movie-list' })
    }
  })
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
