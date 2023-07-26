<template>
  <background-blur :show="show" @click="closePopup" />
  <transition name="popup">
    <div
      v-show="show"
      class="sm:w-[46.5%] max-h-[90vh] h-full w-full absolute left-1/2 sm:top-[70px] top-0 transform -translate-x-1/2 pt-8 pb-16 bg-[#11101A] rounded-xl z-50"
    >
      <div class="w-full flex justify-between items-center px-8">
        <div class="flex items-center gap-3">
          <img :src="prefix + user.image" class="w-16 h-16 rounded-full" />
          <p class="text-white sm:text-xl text-lg">{{ user.name }}</p>
        </div>
        <x-mark-icon class="cursor-pointer" color="#808080" @click="closePopup" />
      </div>
      <div class="bg-[#FFFFFF60] w-full h-[1px] mt-5"></div>
      <div class="max-h-[65vh] h-full px-8 pt-5 overflow-y-auto">
        <div class="w-full h-full flex flex-col gap-3" v-if="messages.length > 0">
          <div
            class="w-full flex items-start gap-2"
            :class="{
              'justify-start': message.user_id === user.id,
              'justify-end': message.user_id !== user.id
            }"
            v-for="message in messages"
          >
            <img
              class="rounded-full w-9 h-9"
              v-if="message.user_id === user.id"
              :src="prefix + user.image"
              alt="profile"
            />
            <span
              class="max-w-[60%] flex sm:text-base text-sm text-white py-3"
              :class="{
                'rounded-e-2xl rounded-s-md bg-[#22338f] pr-3 pl-2': message.user_id === user.id,
                'rounded-s-2xl rounded-e-md bg-[#2e44be] pr-2 pl-3': message.user_id !== user.id
              }"
              >{{ message.text }}</span
            >
          </div>
        </div>
        <p class="text-[#FFFFFF99] sm:text-3xl text-xl font-medium pt-20 text-center" v-else>
          Write first message
        </p>
      </div>
      <div class="bg-[#FFFFFF60] w-full h-[1px] my-5"></div>
      <Form class="w-full flex gap-6 items-center px-8" v-slot="{ values }">
        <button @click.prevent="send(values)" hidden></button>
        <img
          :src="prefix + authUser.image"
          alt="profile"
          class="sm:w-[52px] sm:h-[52px] w-[40px] h-[40px] rounded-full"
        />
        <textarea
          cols="1"
          rows="1"
          name="message"
          type="text"
          class="w-full resize-none sm:px-7 py-3 px-5 sm:text-base text-sm text-white placeholder-[#CED4DA] placeholder:sm:text-xl placeholder:text-base bg-[#24222F] rounded-[10px] outline-none focus:bg-[#32303f] boxShadow"
          :placeholder="$t('userPage.write_a_message') + '...'"
        ></textarea>
      </Form>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Form } from 'vee-validate'
import { useUserStore } from '@/store/userStore'
import BackgroundBlur from '@/components/popups/BackgroundBlur.vue'
import XMarkIcon from '@/assets/icons/marks/XMarkIcon.vue'
import { getMessages, sendMessage } from '@/services/api/messages/index.js'

const props = defineProps({
  show: {
    type: Boolean,
    required: false,
    default: false
  },
  user: {
    type: Object,
    required: true
  }
})

const prefix = import.meta.env.VITE_BACK_STORAGE_URL
const authUser = useUserStore()
const emits = defineEmits(['closePopup'])
const messages = ref([
  {
    user_id: 1,
    text: 'hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello'
  },
  {
    user_id: 2,
    text: 'hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello'
  },
  {
    user_id: 1,
    text: 'gello'
  },
  {
    user_id: 2,
    text: 'gello'
  }
])

function closePopup() {
  emits('closePopup')
}

watch(
  () => props.show,
  (newValue) => {
    if (newValue === true) {
      window.scrollTo({
        top: 0,
        left: 0
      })
      document.body.style.overflowY = 'hidden'
    }

    if (newValue === false) {
      document.body.style.overflowY = 'auto'
    }
  }
)
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
