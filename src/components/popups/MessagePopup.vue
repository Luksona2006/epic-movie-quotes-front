<template>
  <background-blur :show="show" @click="closePopup" />
  <transition name="popup">
    <div
      v-show="show"
      class="sm:w-[46.5%] sm:max-h-[90vh] max-h-none h-full w-full absolute left-1/2 sm:top-[70px] top-0 transform -translate-x-1/2 sm:pt-8 pt-5 sm:pb-8 pb-0 bg-[#11101A] rounded-xl z-50"
    >
      <div class="w-full flex justify-between items-center px-8">
        <div class="flex items-center gap-3">
          <img :src="prefix + user.image" class="sm:w-16 sm:h-16 w-12 h-12 rounded-full" />
          <p class="text-white sm:text-xl text-base">{{ user.name }}</p>
        </div>
        <x-mark-icon class="cursor-pointer" color="#808080" @click="closePopup" />
      </div>
      <div class="bg-[#FFFFFF60] w-full h-[1px] mt-5"></div>
      <div class="max-h-[78%] h-full pt-5">
        <div
          class="w-full h-full flex flex-col gap-3 px-8 overflow-y-auto"
          v-if="messages.length > 0"
        >
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
          {{ $t('userPage.write_first_message') }}
        </p>
      </div>
      <div class="bg-[#FFFFFF60] w-full h-[1px] my-5"></div>
      <Form class="min-h-max w-full flex gap-6 items-center px-8">
        <img
          :src="prefix + authUser.image"
          alt="profile"
          class="sm:w-[52px] sm:h-[52px] w-[40px] h-[40px] rounded-full"
        />
        <div class="w-full flex items-center gap-3">
          <textarea
            cols="1"
            rows="1"
            name="message"
            type="text"
            class="w-full resize-none sm:px-7 py-3 px-5 sm:text-base text-sm text-white placeholder-[#CED4DA] placeholder:sm:text-xl placeholder:text-base bg-[#24222F] rounded-[10px] outline-none focus:bg-[#32303f] boxShadow"
            :placeholder="$t('userPage.write_a_message') + '...'"
            v-model="textareaValue"
          ></textarea>
          <send-message-icon class="cursor-pointer" @click="send" />
        </div>
      </Form>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { Form } from 'vee-validate'
import { useUserStore } from '@/store/userStore'
import BackgroundBlur from '@/components/popups/BackgroundBlur.vue'
import XMarkIcon from '@/assets/icons/marks/XMarkIcon.vue'
import SendMessageIcon from '@/assets/icons/SendMessageIcon.vue'
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
const textareaValue = ref('')
const messages = ref([])

onMounted(() => {
  window.Echo.private(`messages.${authUser.id}`).listen('SendMessage', (data) => {
    if (data.recieverId === authUser.id) {
      messages.value.push({
        user_id: data.senderId,
        text: data.message
      })
    }
  })
})

getMessages(props.user.id).then((res) => {
  messages.value = res.data.messages
})

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

function send() {
  const data = {
    text: textareaValue.value,
    friend_id: props.user.id
  }

  sendMessage(data).then((res) => {
    messages.value.push({
      user_id: res.data.message.user_id,
      text: res.data.message.text
    })

    textareaValue.value = ''
  })
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
