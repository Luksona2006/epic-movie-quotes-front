<template>
  <the-popup-container title="Create an account" description="Start your journey!">
    <form @submit.prevent class="w-full mt-6">
      <div class="w-full flex flex-col gap-4">
        <the-input
          title="Name"
          placeholder="At least 3 & max.15 lower case characters"
          :marked="true"
        />
        <the-input title="Email" placeholder="Enter your email" :marked="true" />
        <the-input
          title="Password"
          placeholder="At least 8 & max.15 lower case characters"
          :marked="true"
        />
        <the-input title="Confirm password" :marked="true" />
      </div>
      <div class="w-full flex flex-col gap-4 mt-10">
        <the-red-button> Get Started </the-red-button>
        <the-transparent-button
          @changeToHoverColor="changeColor('#222030')"
          @changeToMainColor="changeColor('white')"
        >
          <div class="flex items-center gap-3 justify-center">
            <google-icon :color="iconColor" /> Sign Up with Google
          </div>
        </the-transparent-button>
      </div>
    </form>
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
