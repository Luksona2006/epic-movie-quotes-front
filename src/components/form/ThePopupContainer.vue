<template>
  <div
    class="sm:max-w-[600px] sm:h-auto h-screen w-full sm:rounded-[10px] py-12 bg-[#222030] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
  >
    <x-mark-icon class="absolute left-10 top-10 cursor-pointer" @click="hidePopup" />
    <div class="flex flex-col items-center max-w-[360px] w-full m-auto">
      <div class="flex flex-col gap-3 items-center">
        <h2 class="text-[32px] text-white font-medium">{{ title }}</h2>
        <span class="text-[#6C757D] text-base font-normal">{{ description }}</span>
      </div>
      <slot> </slot>
    </div>
  </div>
</template>

<script setup>
import XMarkIcon from '../../assets/icons/XMarkIcon.vue'
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: ''
  }
})

const emits = defineEmits(['hidePopup'])
function hidePopup() {
  emits('hidePopup')
}
</script>
