<template>
  <popup-container
    :title="$t('landingPage.create_an_account')"
    :description="`${$t('landingPage.start_your_journey') + '!'}`"
  >
    <Form class="w-full mt-6" v-slot="{ errors, values }">
      <div class="w-full flex flex-col gap-4">
        <the-input
          :title="$t('inputNames.name')"
          name="name"
          :placeholder="$t('placeholders.at_least_8')"
          :validation-rules="`required:${$t('inputNames.name')}|minMax:3,15,${$t(
            'inputNames.name'
          )}|lowercase:${$t('inputNames.name')}`"
          :is-valid="checkIsValid(values, errors, 'name')"
          :marked="true"
        />
        <the-input
          :title="$t('inputNames.email')"
          name="email"
          :placeholder="$t('placeholders.enter_your_email')"
          :validation-rules="`required:${$t('inputNames.email')}|email`"
          :is-valid="checkIsValid(values, errors, 'email')"
          :marked="true"
        />
        <the-input
          :title="$t('inputNames.password')"
          name="password"
          :placeholder="$t('placeholders.at_least_8')"
          type="password"
          :validation-rules="`required:${$t('inputNames.password')}|minMax:8,15,${$t(
            'inputNames.password'
          )}|lowercase:${$t('inputNames.password')}`"
          :is-valid="checkIsValid(values, errors, 'password')"
          :marked="true"
        />
        <the-input
          :title="$t('inputNames.confirm_password')"
          name="confirm_password"
          :placeholder="$t('inputNames.confirm_password')"
          type="password"
          :validation-rules="`required:${$t('inputNames.this_field')}|confirmed:password`"
          :is-valid="checkIsValid(values, errors, 'confirm_password')"
          :marked="true"
        />
      </div>
      <div class="w-full flex flex-col gap-4 mt-10">
        <red-button @click="sendData(values, errors)">
          {{ $t('landingPage.get_started') }}
        </red-button>
        <transparent-button
          @changeToHoverColor="changeColor('#222030')"
          @changeToMainColor="changeColor('white')"
        >
          <div class="flex items-center gap-3 justify-center">
            <google-icon :color="iconColor" />
            {{ `${$t('landingPage.signup') + ' ' + $t('landingPage.with_google')}` }}
          </div>
        </transparent-button>
      </div>
    </Form>
  </popup-container>
</template>

<script setup>
import { ref, toRaw } from 'vue'
import { Form } from 'vee-validate'

import { checkIsValid } from '@/config/customFunction'
import PopupContainer from '@/components/form/PopupContainer.vue'
import TransparentButton from '@/components/TransparentButton.vue'
import RedButton from '@/components/RedButton.vue'
import TheInput from '@/components/form/TheInput.vue'
import GoogleIcon from '@/assets/icons/GoogleIcon.vue'
import axios from 'axios'

const iconColor = ref('white')

function changeColor(color) {
  iconColor.value = color
}

function sendData(data, errors) {
  if (errors && !errors[0]) {
    axios.post(
      import.meta.env.VITE_API_URL + '/signup',
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
