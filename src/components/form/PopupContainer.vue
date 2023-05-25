<template>
  <div
    class="sm:max-w-[600px] sm:h-auto sm:py-12 py-14 h-screen w-full sm:rounded-[10px] sm:from-[#222030] sm:to-[#222030] bg-gradient-to-b from-[#11101A] to-[#0D0B14] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
  >
    <x-mark-icon
      class="absolute sm:left-8 sm:top-8 left-5 top-5 cursor-pointer"
      @click="hidePopup"
    />
    <div class="flex flex-col items-center max-w-[360px] w-full m-auto">
      <div class="flex flex-col gap-3 items-center">
        <h2 class="text-[32px] text-white font-medium text-center">{{ title }}</h2>
        <span class="text-[#6C757D] text-base font-normal">{{ description }}</span>
      </div>
      <slot> </slot>
    </div>
  </div>
</template>

<script setup>
import XMarkIcon from '@/assets/icons/XMarkIcon.vue'
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
