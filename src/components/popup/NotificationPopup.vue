<template>
  <teleport to="body">
    <background-blur @click="closePopup" :show="routeValid" />
  </teleport>
  <popup-container v-show="routeValid" class="sm:max-w-lg" @hide-popup="closePopup">
    <div class="flex flex-col items-center gap-5">
      <slot name="image"></slot>
      <h3 class="text-center text-white font-medium text-[32px]">{{ title }}</h3>
      <p class="mt-3 text-center text-white font-normal text-base">
        {{ description }}
      </p>
      <router-link v-if="nextRouteName" :to="{ name: nextRouteName }" class="w-full">
        <red-button> {{ buttonText }} </red-button>
      </router-link>
      <a v-else :href="path" target="_blank" class="w-full">
        <red-button> {{ buttonText }} </red-button>
      </a>
      <slot name="additionRoute"></slot>
    </div>
  </popup-container>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

import PopupContainer from '@/components/popup/PopupContainer.vue'
import RedButton from '@/components/buttons/RedButton.vue'
import BackgroundBlur from '@/components/popup/BackgroundBlur.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    required: true
  },
  routeName: {
    type: String,
    required: true
  },
  nextRouteName: {
    type: String,
    required: false,
    path: ''
  },
  path: {
    type: String,
    required: false,
    default: ''
  }
})

const route = useRoute()

const routeValid = ref(route.name === props.routeName)
document.body.style.overflowY = route.name === 'home' ? 'auto' : 'hidden'
watch(
  () => route.name,
  () => {
    if (route.name !== props.routeName) routeValid.value = false
    else routeValid.value = true

    document.body.style.overflowY = route.name === 'home' ? 'auto' : 'hidden'
  }
)

function closePopup() {
  document.body.style.overflowY = 'auto'
  router.push({ name: 'home' })
}
</script>
