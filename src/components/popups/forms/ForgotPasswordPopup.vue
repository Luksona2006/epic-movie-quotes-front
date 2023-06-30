<template>
  <form-popup-container
    :title="`${$t('landingPage.forgot_password') + '?'}`"
    :description="$t('landingPage.an_email_with_instructions')"
    route-name="forgot-password"
    next-route-name="login"
    :next-route-text="$t('landingPage.back_to_log_in')"
  >
    <Form @submit.prevent class="w-full mt-6" v-slot="{ errors, values }">
      <div class="w-full flex flex-col gap-4">
        <the-input
          :title="$t('inputNames.email')"
          name="email"
          :placeholder="$t('placeholders.enter_your_email')"
          validation-rules="required|email"
          :is-valid="checkIsValid(values, errors, 'email')"
        />
      </div>

      <red-button @click="sendData(values, errors)" class="mt-5">
        {{ $t('landingPage.send_instructions') }}
      </red-button>
    </Form>
  </form-popup-container>
  <notification-popup-container
    :title="$t('landingPage.check_your_email')"
    :description="$t('landingPage.password_recover_instructions')"
    :button-text="$t('landingPage.go_to_my_email')"
    route-name="send-password-reset-email"
    path="https://accounts.google.com/InteractiveLogin/signinchooser?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&flowEntry=ServiceLogin&flowName=GlifWebSignIn&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&ifkv=Af_xneH8Ilw5ClXl7hZCT8ohksjtwDt2cLnT1VF_D3gx_Y55hWy1Av2lFzBlPYin0RxwddJ9t3K-&osid=1&passive=1209600&service=mail"
  >
    <template #image><send-icon /></template>
    <template #additionRoute>
      <router-link :to="{ name: 'home' }" class="text-[#6C757D] text-base">{{
        $t('landingPage.skip_i_will_confirm_later')
      }}</router-link>
    </template>
  </notification-popup-container>
</template>

<script setup>
import { resetPassword } from '@/services/api/auth/index.js'
import { Form } from 'vee-validate'
import { toRaw } from 'vue'
import { checkIsValid } from '@/config/customFunction/index.js'

import TheInput from '@/components/form/TheInput.vue'
import FormPopupContainer from '@/components/popups/containers/FormPopupContainer.vue'
import NotificationPopupContainer from '@/components/popups/containers/NotificationPopupContainer.vue'
import SendIcon from '@/assets/icons/SendIcon.vue'
import RedButton from '@/components/buttons/RedButton.vue'

function sendData(values, errors) {
  if (values && !errors[0]) {
    resetPassword(toRaw(data))
  }
}
</script>
