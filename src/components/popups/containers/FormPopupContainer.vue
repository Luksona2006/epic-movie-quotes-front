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
    <Form @submit.prevent class="w-full mt-6" v-slot="{ errors, values }">
      <div class="w-full flex flex-col gap-4">
        <slot> </slot>
      </div>

      <red-button @click="sendData(values, errors)" class="mt-5">
        {{ buttonText }}
      </red-button>
    </Form>
    <white-border-button
      @changeToHoverColor="changeColor('#222030')"
      @changeToMainColor="changeColor('white')"
      class="mt-5"
    >
      <div class="flex items-center gap-3 justify-center">
        <google-icon :color="iconColor" />
        {{ `${buttonText + ' ' + $t('landingPage.with_google')}` }}
      </div>
    </white-border-button>

    <!-- <div class="g-signin2" :data-onsuccess="onSignIn"></div> -->

    <p class="text-[#6C757D] text-base mt-8">
      {{ nextRouteDescription }}
      <router-link :to="{ name: nextRouteName }" class="text-[#0D6EFD] underline"
        >{{ nextRouteText }}
      </router-link>
    </p>
  </popup-container>
</template>

<script setup>
import { ref, toRaw, watch } from 'vue'
import { Form } from 'vee-validate'
import { useRoute } from 'vue-router'
import router from '@/router'

import PopupContainer from '@/components/popups/containers/PopupContainer.vue'
import BackgroundBlur from '@/components/popups/BackgroundBlur.vue'
import RedButton from '@/components/buttons/RedButton.vue'
import WhiteBorderButton from '@/components/buttons/WhiteBorderButton.vue'
import GoogleIcon from '@/assets/icons/GoogleIcon.vue'

// function onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile()
//   console.log('ID: ' + profile.getId()) // Do not send to your backend! Use an ID token instead.
//   console.log('Name: ' + profile.getName())
//   console.log('Image URL: ' + profile.getImageUrl())
//   console.log('Email: ' + profile.getEmail()) // This is null if the 'email' scope is not present.
// }

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
  buttonText: {
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

const emits = defineEmits(['submitForm'])
function sendData(data, errors) {
  if (data && !errors[0]) emits('submitForm', toRaw(data))
}

// GOOGLE

const googleSignInParams = ref({
  client_id: '1040099445065-ooc8kqrt46b6q81402uat6nlgc40ue4f.apps.googleusercontent.com'
  // client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID + '.apps.googleusercontent.com'
})

function onSignInSuccess(googleUser) {
  // `googleUser` is the GoogleUser object that represents the just-signed-in user.
  // See https://developers.google.com/identity/sign-in/web/reference#users
  const profile = googleUser.getBasicProfile() // etc etc
}
function onSignInError(error) {
  // `error` contains any error occurred.
  console.log('OH NOES', error)
}
</script>
