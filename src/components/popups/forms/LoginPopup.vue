<template>
  <form-popup-container
    :title="$t('landingPage.login_to_account')"
    :description="$t('landingPage.welcome_back')"
    route-name="login"
    next-route-name="signup"
    :next-route-description="$t('landingPage.do_not_have_account')"
    :next-route-text="$t('landingPage.signup')"
  >
    <Form @submit.prevent class="w-full mt-6" v-slot="{ errors, values }">
      <div class="w-full flex flex-col gap-4">
        <the-input
          :title="$t('inputNames.email')"
          name="login"
          :placeholder="$t('placeholders.enter_your_email')"
          validation-rules="required"
          :is-valid="checkIsValid(values, errors, 'email')"
        />
        <the-input
          :title="$t('inputNames.password')"
          name="password"
          :placeholder="$t('inputNames.password')"
          type="password"
          :canShow="true"
          validation-rules="required|min:8|max:15"
          :is-valid="checkIsValid(values, errors, 'password')"
        />
        <div class="w-full flex justify-between items-center">
          <div class="flex gap-2 items-center">
            <input type="checkbox" name="remember_me" value="remember_me" class="border" />
            <label for="remember_me" class="text-base text-white">{{
              $t('landingPage.remember_me')
            }}</label>
          </div>
          <router-link to="forgot-password" class="underline text-base text-[#0D6EFD]">{{
            $t('landingPage.forgot_password')
          }}</router-link>
        </div>
      </div>

      <red-button @click="sendData(values, errors)" class="mt-5">
        {{ $t('landingPage.login') }}
      </red-button>
    </Form>
  </form-popup-container>
</template>

<script setup>
import { getCookies, login } from '@/services/api/auth/index.js'
import { toRaw } from 'vue'
import { Form } from 'vee-validate'
import { checkIsValid } from '@/config/customFunction/index.js'

import TheInput from '@/components/form/TheInput.vue'
import FormPopupContainer from '@/components/popups/containers/FormPopupContainer.vue'
import RedButton from '@/components/buttons/RedButton.vue'

function sendData(values, errors) {
  if (values && !errors[0]) {
    getCookies().then(() => {
      login(toRaw(values))
    })
  }
}
</script>
