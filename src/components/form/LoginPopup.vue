<template>
  <the-popup-container
    title="Log in to your account"
    description="Welcome back! Please enter your details."
  >
    <div class="w-full flex flex-col gap-4 mt-6">
      <the-input title="Email" placeholder="Enter your email" />
      <the-input title="Password" />
    </div>
    <div class="w-full flex flex-col gap-4 mt-10">
      <the-red-button> Sign in </the-red-button>
      <the-transparent-button
        @changeToHoverColor="changeColor('#222030')"
        @changeToMainColor="changeColor('white')"
      >
        <div class="flex items-center gap-3 justify-center">
          <google-icon :color="iconColor" /> Sign in with Google
        </div>
      </the-transparent-button>
    </div>
  </the-popup-container>
</template>

<script setup>
import { ref } from 'vue'

import ThePopupContainer from './ThePopupContainer.vue'
import TheTransparentButton from '../TheTransparentButton.vue'
import TheRedButton from '../TheRedButton.vue'
import TheInput from './TheInput.vue'
import GoogleIcon from '../../assets/icons/GoogleIcon.vue'

const iconColor = ref('white')

function changeColor(color) {
  iconColor.value = color
}
</script>
