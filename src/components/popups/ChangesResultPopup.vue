<template>
  <background-blur :show="show" @click="hidePopup" />
  <transition name="popup">
    <div
      v-show="show"
      class="w-full max-w-md absolute top-32 left-1/2 transform -translate-x-1/2 z-50 px-6"
    >
      <div
        class="w-full flex justify-between items-center rounded-lg bg-[#fbc6c0] p-4"
        :class="{ 'bg-[#BADBCC]': success }"
      >
        <div class="flex items-center gap-2">
          <circle-check-mark-icon v-if="success" />
          <triangle-exclamation-mark-icon v-else />
          <p class="text-[#DC3545]" :class="{ 'text-[#0F5132]': success }">{{ message }}</p>
        </div>
        <x-mark-icon class="cursor-pointer" color="#808080" @click="hidePopup" />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { useI18n } from 'vue-i18n'

import BackgroundBlur from '@/components/popups/BackgroundBlur.vue'
import XMarkIcon from '@/assets/icons/marks/XMarkIcon.vue'
import TriangleExclamationMarkIcon from '@/assets/icons/marks/TriangleExclamationMarkIcon.vue'
import CircleCheckMarkIcon from '@/assets/icons/marks/CircleCheckMarkIcon.vue'

const props = defineProps({
  success: {
    type: Boolean,
    required: false,
    default: false
  },
  show: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emits = defineEmits(['hidePopup'])

const i18n = useI18n()

const message = computed(() =>
  props.success === false
    ? i18n.t('editUserDetails.invalid_changes_please_try_again')
    : i18n.t('editUserDetails.changes_updated_succsessfully')
)

function hidePopup() {
  emits('hidePopup')
}
</script>

<style scoped>
.popup-enter-active,
.popup-leave-active {
  transition: 0.4s all;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translate(-50%, -200%);
}

.popup-enter-to,
.popup-leave-from {
  opacity: 1;
  transform: translate(-50%, 0);
}
</style>
