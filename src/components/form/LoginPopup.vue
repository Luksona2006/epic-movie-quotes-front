<template>
  <popup-container
    title="Log in to your account"
    description="Welcome back! Please enter your details."
  >
    <Form class="w-full mt-6" v-slot="{ values, errors }">
      <div class="w-full flex flex-col gap-4">
        <the-input
          :title="$t('inputNames.email')"
          name="email"
          :is-valid="checkIsValid(values, errors, 'email')"
          :placeholder="$t('placeholders.enter_your_email')"
          :validation-rules="`required:${$t('inputNames.email')}|email`"
        />
        <the-input
          :title="$t('inputNames.password')"
          name="password"
          :is-valid="checkIsValid(values, errors, 'password')"
          :placeholder="$t('inputNames.password')"
          type="password"
          :validation-rules="`required:${$t('inputNames.password')}`"
        />
      </div>
      <div class="w-full flex flex-col gap-4 mt-10">
        <red-button @click="sendData(values, errors)"> {{ $t('landingPage.login') }} </red-button>
        <transparent-button
          @changeToHoverColor="changeColor('#222030')"
          @changeToMainColor="changeColor('white')"
        >
          <div class="flex items-center gap-3 justify-center">
            <google-icon :color="iconColor" />
            {{ `${$t('landingPage.login') + ' ' + $t('landingPage.with_google')}` }}
          </div>
        </transparent-button>
      </div>
    </Form>
  </popup-container>
</template>

<script setup>
import { ref } from 'vue'
import { Form } from 'vee-validate'
import axios from 'axios'

import { checkIsValid } from '@/config/customFunction'
import PopupContainer from '@/components/form/PopupContainer.vue'
import TransparentButton from '@/components/TransparentButton.vue'
import RedButton from '@/components/RedButton.vue'
import TheInput from '@/components/form/TheInput.vue'
import GoogleIcon from '@/assets/icons/GoogleIcon.vue'

const iconColor = ref('white')

function changeColor(color) {
  iconColor.value = color
}

function sendData(data, errors) {
  if (errors && !errors[0]) {
    axios.post(
      import.meta.env.VITE_API_URL + '/login',
      {
        ...toRaw(data)
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    )
  }
}
</script>
