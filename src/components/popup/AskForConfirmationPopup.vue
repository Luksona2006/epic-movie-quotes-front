<template>
  <background-blur :show="show" @click="hidePopup" />
  <transition name="popup">
    <div v-show="show" class="w-full absolute top-36 z-50 px-7">
      <div class="w-full rounded-lg gradientBackground">
        <div class="w-full pt-16 pb-11">
          <p class="text-center text-white">{{ description }}</p>
        </div>
        <div class="w-full border-t border-t-[#CED4DA33]">
          <div class="flex justify-between items-center px-7 py-5">
            <div>
              <transparent-button
                class="bg-transparent text-base text-[#CED4DA]"
                @click="hidePopup"
              >
                {{ $t('basic.cancel') }}
              </transparent-button>
            </div>
            <div>
              <red-button @click="confirm"> {{ $t('basic.confirm') }} </red-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import RedButton from '@/components/buttons/RedButton.vue'
import TransparentButton from '@/components/buttons/TransparentButton.vue'
import BackgroundBlur from '@/components/popup/BackgroundBlur.vue'

const props = defineProps({
  description: {
    type: String,
    required: false,
    default: ''
  },
  show: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emits = defineEmits(['hidePopup', 'confirm'])
function hidePopup() {
  emits('hidePopup')
}

function confirm() {
  emits('confirm')
}
</script>

<style scoped>
.gradientBackground {
  background: linear-gradient(135deg, #11101a 0%, #24222f 100%);
}

.popup-enter-active,
.popup-leave-active {
  transition: 0.4s all;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateY(-200%);
}

.popup-enter-to,
.popup-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
