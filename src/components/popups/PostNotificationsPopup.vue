<template>
  <transition name="popup">
    <div
      class="w-screen max-w-2xl xl:max-w-4xl absolute top-[52px] sm:top-16 sm:-right-60 -right-9 z-20 flex flex-col gap-6 px-8 sm:py-10 py-5 bg-black rounded-xl"
      v-show="show"
    >
      <popup-pointer-icon class="absolute right-[26px] -top-5 sm:right-[230px]" />
      <header class="w-full flex justify-between items-center">
        <p class="sm:text-[32px] text-xl text-white font-medium">Notifications</p>
        <button class="sm:text-xl text-sm text-white underline" @click="clearAllNews">
          Mark as all read
        </button>
      </header>
      <div class="w-full flex flex-col gap-4">
        <div
          class="w-full flex sm:justify-between py-4 px-4 sm:py-5 sm:px-6 sm:items-center border border-[#6C757D80] rounded"
          v-if="updatedNotifications.length > 0"
          v-for="notification in updatedNotifications"
          @click="clearNews(notification.id)"
        >
          <div class="flex gap-6 items-center">
            <div class="flex flex-col gap-2 items-center rounded-full">
              <img
                :src="prefix + notification.user.image"
                alt="profile"
                class="w-20 h-20 sm:w-[60px] sm:h-[60px] rounded-full"
                :class="{ 'border-2 border-[#198754]': !notification.seen }"
              />
              <p class="sm:hidden block text-base text-[#198754]" v-if="!notification.seen">New</p>
            </div>
            <div class="flex flex-col gap-1 items-start">
              <p class="text-xl text-white">{{ notification.user.name }}</p>
              <div class="flex gap-3 items-center">
                <comment-parentheses-icon v-if="notification.type === 'comment'" />
                <heart-fill-icon v-else />
                <p class="sm:text-xl text-base text-[#D9D9D9]">
                  {{
                    notification.type === 'comment'
                      ? 'Commented to your quote'
                      : 'Reacted to your quote'
                  }}
                </p>
              </div>
              <p class="sm:hidden block text-base text-[#D9D9D9]">{{ notification.time }}</p>
            </div>
          </div>
          <div class="sm:flex hidden flex-col items-end gap-1">
            <p class="text-xl text-[#D9D9D9]">{{ notification.time }}</p>
            <p class="text-xl text-[#198754]" v-if="!notification.seen">New</p>
          </div>
        </div>
        <p
          class="sm:text-[32px] text-xl text-white opacity-70 font-medium text-center pt-10 pb-16"
          v-else
        >
          No notifications yet.
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useUserStore } from '@/store/userStore'
import axiosInstance from '@/config/axios'

import PopupPointerIcon from '@/assets/icons/PopupPointerIcon.vue'
import CommentParenthesesIcon from '@/assets/icons/CommentParenthesesIcon.vue'
import HeartFillIcon from '@/assets/icons/HeartFillIcon.vue'
import { ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: false,
    default: false
  },
  notifications: {
    type: Array,
    required: false,
    default: []
  }
})

const prefix = import.meta.env.VITE_BACK_STORAGE_URL
const user = useUserStore()
const updatedNotifications = ref(props.notifications)

watch(
  () => props.notifications,
  (newValue) => {
    updatedNotifications.value = newValue
  }
)

function clearNews(notificationId) {
  axiosInstance
    .post(`/notification/update/${notificationId}`, { user_token: user.token })
    .then((res) => {
      if (res.status === 200) {
        updatedNotifications.value = updatedNotifications.value.map((notific) => {
          if (notific.id === notificationId) notific.seen = true
          return notific
        })
      }
    })
}

function clearAllNews() {
  axiosInstance.post(`/user/${user.token}/notifications/update`).then((res) => {
    if (res.status === 200) {
      updatedNotifications.value = updatedNotifications.value.map((notific) => {
        notific.seen = true
        return notific
      })
    }
  })
}
</script>

<style scoped>
.popup-enter-active,
.popup-leave-active {
  transition: 0.2s all;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateY(-20px) scaleY(0.9);
}

.popup-enter-to,
.popup-leave-from {
  opacity: 1;
  transform: translateY(0) scaleY(1);
}
</style>
