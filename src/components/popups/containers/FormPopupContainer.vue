<template>
  <popup-container
    :title="title"
    :description="description"
    v-show="routeValid"
    @hide-popup="closePopup"
  >
    <teleport to="body">
      <background-blur @click="closePopup" :show="routeValid" />
    </teleport>
    <slot> </slot>
    <a
      :href="prefix + '/auth/google/redirect'"
      class="w-full"
      v-if="routeName === 'login' || routeName === 'signup'"
    >
      <white-border-button
        @changeToHoverColor="changeColor('#222030')"
        @changeToMainColor="changeColor('white')"
        class="mt-5"
      >
        <div class="flex items-center gap-3 justify-center">
          <google-icon :color="iconColor" />
          {{
            `${
              (routeName === 'login' ? $t('landingPage.login') : $t('landingPage.signup')) +
              ' ' +
              $t('landingPage.with_google')
            }`
          }}
        </div>
      </white-border-button>
    </a>

    <p class="text-[#6C757D] text-base mt-8">
      {{ nextRouteDescription }}
      <router-link :to="{ name: nextRouteName }" class="text-[#0D6EFD] underline"
        >{{ nextRouteText }}
      </router-link>
    </p>
  </popup-container>
</template>

<script setup>
import { useLocaleStore } from '@/store/localeStore'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

import PopupContainer from '@/components/popups/containers/PopupContainer.vue'
import BackgroundBlur from '@/components/popups/BackgroundBlur.vue'
import WhiteBorderButton from '@/components/buttons/WhiteBorderButton.vue'
import GoogleIcon from '@/assets/icons/GoogleIcon.vue'

const iconColor = ref('white')

const props = defineProps({
  routeName: {
    type: String,
    required: true
  },
  nextRouteName: {
    type: String,
    required: true
  },
  nextRouteDescription: {
    type: String,
    required: false,
    default: ''
  },
  nextRouteText: {
    type: String,
    required: true
  }
})

function changeColor(color) {
  iconColor.value = color
}

const route = useRoute()
const locale = ref(useLocaleStore().locale)
const prefix = import.meta.env.VITE_API_URL

watch(
  () => useLocaleStore().locale,
  (newValue) => {
    locale.value = newValue
  }
)

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
