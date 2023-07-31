<template>
  <transition name="popup">
    <div
      class="w-screen max-w-2xl xl:max-w-4xl absolute top-[52px] sm:top-16 sm:-right-60 -right-9 z-20"
      v-show="show"
    >
      <popup-pointer-icon class="absolute right-[26px] -top-5 sm:right-[230px]" />
      <div class="w-full flex flex-col gap-6 px-8 sm:py-10 py-5 bg-black rounded-xl">
        <header class="w-full flex justify-between items-center">
          <p class="sm:text-[32px] text-xl text-white font-medium">
            {{ $t('messages.messages') }}
          </p>
        </header>
        <div
          class="w-full max-h-[840px] overflow-y-scroll flex flex-col gap-4"
          v-if="updatedMessages.length > 0"
        >
          <router-link
            :to="{
              name: 'user-messages',
              params: {
                id: message.user.id
              }
            }"
            class="w-full flex sm:justify-between py-4 px-4 sm:py-5 sm:px-6 sm:items-center border border-[#6C757D80] rounded"
            v-for="message in updatedMessages"
            :key="message.id"
            @click="clearNews(message.id)"
          >
            <div class="flex gap-6 items-center">
              <div class="flex flex-col gap-2 items-center rounded-full">
                <img
                  :src="prefix + message.user.image"
                  alt="profile"
                  class="w-20 h-20 sm:w-[60px] sm:h-[60px] rounded-full"
                />
              </div>
              <div class="flex flex-col gap-1 items-start">
                <p
                  class="text-xl text-white font-medium"
                  :class="{ 'font-normal': message.seen || message.from_user === user.id }"
                >
                  {{ message.user.name }}
                </p>
                <div class="flex gap-3 items-center">
                  <p
                    class="sm:text-xl text-base text-white font-medium"
                    :class="{
                      'text-[#c2c2c2] font-normal': message.seen || message.from_user === user.id
                    }"
                  >
                    {{ message.from_user === user.id ? 'You:' : '' }}
                    {{ message.text }}{{ message.text.length === 20 ? '...' : '' }}
                  </p>
                </div>
                <p
                  class="sm:hidden block text-base text-white font-medium"
                  :class="{
                    'text-[#c2c2c2] font-normal': message.seen || message.from_user === user.id
                  }"
                >
                  {{ message.time }}
                </p>
              </div>
            </div>
            <div class="sm:flex hidden flex-col items-end gap-1">
              <p
                class="text-xl text-white font-medium"
                :class="{
                  'text-[#D9D9D9] font-normal': message.seen || message.from_user === user.id
                }"
              >
                {{ message.time }}
              </p>
            </div>
          </router-link>
        </div>
        <p
          class="sm:text-[32px] text-xl text-white opacity-70 font-medium text-center pt-10 pb-16"
          v-else
        >
          {{ $t('messages.no_messages') }}
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/store/userStore'
import { updateNotification } from '@/services/api/notification/index.js'

import PopupPointerIcon from '@/assets/icons/PopupPointerIcon.vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: false,
    default: false
  },
  messages: {
    type: Array,
    required: false,
    default() {
      return []
    }
  }
})

const prefix = import.meta.env.VITE_BACK_STORAGE_URL
const user = useUserStore()
const updatedMessages = ref(props.messages)

watch(
  () => props.messages,
  (newValue) => {
    updatedMessages.value = newValue
  }
)

const emits = defineEmits(['updateMessagesSum'])
const route = useRoute()

function clearNews(messageId) {
  updateNotification(messageId).then((res) => {
    if (res.status === 200) {
      updatedMessages.value = updatedMessages.value.map((message) => {
        if (message.id === messageId) message.seen = true
        return message
      })

      emits('updateMessagesSum', updatedMessages.value.length - 1)
    }
  })
}

onMounted(() => {
  if (user.id) {
    window.Echo.private(`notifications.${user.id}`).listen('RecieveNotification', (data) => {
      if (data.notification.type === 'message') {
        updatedMessages.value = updatedMessages.value.filter((message) => {
          if (message.id !== data.notification.id) {
            return message
          }
        })
        updatedMessages.value.unshift(data.notification)
        if (
          (route.name === 'user-messages' &&
            route.params.id != data.notification.from_user &&
            route.params.id != data.notification.to_user) ||
          route.name !== 'user-messages'
        ) {
          emits('updateMessagesSum', updatedMessages.value.length)
        } else {
          clearNews(data.notification.id)
        }
      }
    })
  }
})
</script>

<style scoped>
.popup-enter-active,
.popup-leave-active {
  transition: 0.2s all;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.popup-enter-to,
.popup-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
