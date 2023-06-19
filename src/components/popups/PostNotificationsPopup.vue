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
            {{ $t('notifications.notifications') }}
          </p>
          <button class="sm:text-xl text-sm text-white underline" @click="clearAllNews">
            {{ $t('notifications.mark_all') }}
          </button>
        </header>
        <div class="w-full max-h-[840px] overflow-y-scroll flex flex-col gap-4">
          <router-link
            :to="{ name: 'view-quote', params: { id: notification.quote_id } }"
            class="w-full flex sm:justify-between py-4 px-4 sm:py-5 sm:px-6 sm:items-center border border-[#6C757D80] rounded"
            v-if="updatedNotifications.length > 0"
            v-for="notification in updatedNotifications"
            :key="notification.id"
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
                <p class="sm:hidden block text-base text-[#198754]" v-if="!notification.seen">
                  {{ $t('notifications.new') }}
                </p>
              </div>
              <div class="flex flex-col gap-1 items-start">
                <p class="text-xl text-white">{{ notification.user.name }}</p>
                <div class="flex gap-3 items-center">
                  <comment-parentheses-icon v-if="notification.type === 'comment'" />
                  <heart-fill-icon v-else />
                  <p class="sm:text-xl text-base text-[#D9D9D9]">
                    {{
                      notification.type === 'comment'
                        ? $t('notifications.commented')
                        : $t('notifications.reacted')
                    }}
                  </p>
                </div>
                <p class="sm:hidden block text-base text-[#D9D9D9]">{{ notification.time }}</p>
              </div>
            </div>
            <div class="sm:flex hidden flex-col items-end gap-1">
              <p class="text-xl text-[#D9D9D9]">{{ notification.time }}</p>
              <p class="text-xl text-[#198754]" v-if="!notification.seen">
                {{ $t('notifications.new') }}
              </p>
            </div>
          </router-link>
          <p
            class="sm:text-[32px] text-xl text-white opacity-70 font-medium text-center pt-10 pb-16"
            v-else
          >
            {{ $t('notifications.no_notifications') }}
          </p>
        </div>
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
import { onMounted, ref, watch } from 'vue'

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
  },
  newSum: {
    type: Number,
    required: false,
    default: 0
  }
})

const prefix = import.meta.env.VITE_BACK_STORAGE_URL
const user = useUserStore()
const updatedNotifications = ref(props.notifications)
const updatedNewsSum = ref(props.newSum)

watch(
  () => props.notifications,
  (newValue) => {
    updatedNotifications.value = newValue
  }
)

const emits = defineEmits(['updateNotificationsSum'])

onMounted(() => {
  if (user.id) {
    window.Echo.private(`notifications.${user.id}`).listen('RecieveNotification', (data) => {
      updatedNotifications.value.unshift(data.notification)
      const sumOfNewNotifcations = updatedNewsSum.value + 1
      emits('updateNotificationsSum', sumOfNewNotifcations)
    })
  }
})

function clearNews(notificationId) {
  axiosInstance.post(`/notification/update/${notificationId}`).then((res) => {
    if (res.status === 200) {
      updatedNotifications.value = updatedNotifications.value.map((notific) => {
        if (notific.id === notificationId) {
          notific.seen = true
          updatedNewsSum.value = updatedNewsSum - 1
        }
        return notific
      })
    }
  })
}

function clearAllNews() {
  axiosInstance.post(`/notifications/update`).then((res) => {
    if (res.status === 200) {
      updatedNotifications.value = updatedNotifications.value.map((notific) => {
        notific.seen = true
        updatedNewsSum.value = 0
        emits('updateNotificationsSum', updatedNewsSum.value)
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
  transform: translateY(-20px);
}

.popup-enter-to,
.popup-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
