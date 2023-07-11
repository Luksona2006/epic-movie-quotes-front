<template>
  <li class="w-full flex flex-col gap-6 px-8 py-6 rounded-[10px] bg-[#11101A]">
    <div class="w-full relative flex sm:flex-row sm:items-center flex-col items-start gap-9">
      <img
        class="sm:w-[226px] h-[140px] w-full rounded-md"
        :src="prefix + quoteUpdated.image"
        alt="movie scene"
      />
      <p class="text-2xl text-white italic">"{{ quoteUpdated.text[locale] }}"</p>
      <div class="absolute right-0 top-0 cursor-pointer sm:block hidden">
        <three-dots-icon @click="openNavigation" />
        <transition name="navigation">
          <div
            class="w-60 absolute top-full left-0 flex flex-col gap-8 items-start p-10 bg-[#24222F] rounded-[10px]"
            v-show="navigate"
          >
            <router-link
              :to="{ name: 'view-quote', params: { id: quoteUpdated.id } }"
              class="flex gap-4 items-center"
            >
              <eye-icon color="white" :crosser="false" />
              <p class="text-base text-white">{{ $t('basic.view_quote') }}</p>
            </router-link>
            <router-link
              :to="{ name: 'edit-quote', params: { id: quoteUpdated.id } }"
              class="flex gap-4 items-center"
            >
              <pencil-icon />
              <p class="text-base text-white">{{ $t('basic.edit') }}</p>
            </router-link>
            <button class="flex gap-4 items-center" @click="removeQuote(quoteUpdated.id)">
              <trash-icon />
              <p class="text-base text-white">{{ $t('basic.delete') }}</p>
            </button>
          </div>
        </transition>
      </div>
    </div>
    <div class="w-full h-[1px] bg-[#EFEFEF33]"></div>
    <div class="w-full flex items-center justify-between">
      <div class="flex gap-6 items-center">
        <div class="flex gap-3 items-center">
          <p class="text-xl text-white">{{ quoteUpdated.commentsTotal }}</p>
          <comment-icon />
        </div>
        <div class="flex gap-3 items-center">
          <p class="text-xl text-white">{{ quoteUpdated.likes }}</p>
          <heart-icon :color="heartIconColor" />
        </div>
      </div>
      <div class="cursor-pointer relative sm:hidden block">
        <three-dots-icon @click="openNavigation" />
        <transition name="navigation">
          <div
            class="w-60 absolute -top-56 right-0 flex flex-col gap-8 items-start p-10 bg-[#24222F] rounded-[10px]"
            v-show="navigate"
          >
            <router-link
              :to="{ name: 'view-quote', params: { id: quoteUpdated.id } }"
              class="flex gap-4 items-center"
            >
              <eye-icon color="white" :crosser="false" />
              <p class="text-base text-white">{{ $t('basic.view_quote') }}</p>
            </router-link>
            <router-link
              :to="{ name: 'edit-quote', params: { id: quoteUpdated.id } }"
              class="flex gap-4 items-center"
            >
              <pencil-icon />
              <p class="text-base text-white">{{ $t('basic.edit') }}</p>
            </router-link>
            <button class="flex gap-4 items-center" @click="removeQuote(quoteUpdated.id)">
              <trash-icon />
              <p class="text-base text-white">{{ $t('basic.delete') }}</p>
            </button>
          </div>
        </transition>
      </div>
    </div>
  </li>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useLocaleStore } from '@/store/localeStore'
import { computed } from '@vue/reactivity'

import ThreeDotsIcon from '@/assets/icons/ThreeDotsIcon.vue'
import HeartIcon from '@/assets/icons/HeartIcon.vue'
import CommentIcon from '@/assets/icons/CommentIcon.vue'
import PencilIcon from '@/assets/icons/PencilIcon.vue'
import TrashIcon from '@/assets/icons/TrashIcon.vue'
import EyeIcon from '@/assets/icons/EyeIcon.vue'

const props = defineProps({
  quote: {
    type: Object,
    required: true
  }
})

const quoteUpdated = ref(props.quote)

const locale = ref(useLocaleStore().locale)

watch(
  () => useLocaleStore().locale,
  (newValue) => {
    locale.value = newValue
  }
)
const heartIconColor = computed(() => (props.quote.liked === true ? '#F3426C' : 'white'))
const prefix = import.meta.env.VITE_BACK_STORAGE_URL

const navigate = ref(false)

function openNavigation() {
  navigate.value = !navigate.value
}

const emits = defineEmits(['removeQuote'])

function removeQuote(quoteId) {
  emits('removeQuote', quoteId)
}
</script>

<style scoped>
.navigation-enter-active,
.navigation-leave-active {
  transition: 0.4s all;
}
.navigation-enter-from,
.navigation-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}

.navigation-enter-to,
.navigation-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
