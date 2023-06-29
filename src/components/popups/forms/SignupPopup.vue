<template>
  <form-popup-container
    :title="$t('landingPage.create_an_account')"
    :description="$t('landingPage.start_your_journey')"
    route-name="signup"
    next-route-name="login"
    :next-route-description="$t('landingPage.already_have_account')"
    :next-route-text="$t('landingPage.login')"
  >
    <Form @submit.prevent class="w-full mt-6" v-slot="{ errors, values }">
      <div class="w-full flex flex-col gap-4">
        <the-input
          :title="$t('inputNames.name')"
          name="name"
          :placeholder="$t('placeholders.min_max', { min: 3, max: 15 })"
          validation-rules="required|min:3|max:15"
          :marked="true"
          :is-valid="checkIsValid(values, errors, 'name')"
        />
        <the-input
          :title="$t('inputNames.email')"
          name="email"
          type="email"
          :placeholder="$t('placeholders.enter_your_email')"
          validation-rules="required|email"
          :marked="true"
          :is-valid="checkIsValid(values, errors, 'email')"
        />
        <the-input
          :title="$t('inputNames.password')"
          name="password"
          :placeholder="$t('placeholders.min_max', { min: 8, max: 15 })"
          type="password"
          validation-rules="required|min:8|max:15"
          :canShow="true"
          :marked="true"
          :is-valid="checkIsValid(values, errors, 'password')"
        />
        <the-input
          :title="$t('inputNames.confirm_password')"
          name="confirm_password"
          :placeholder="$t('inputNames.confirm_password')"
          type="password"
          validation-rules="required|confirmed:@password"
          :canShow="true"
          :marked="true"
          :is-valid="checkIsValid(values, errors, 'confirm_password')"
        />
      </div>

      <red-button @click="sendData(values, errors)" class="mt-5">
        {{ $t('landingPage.get_started') }}
      </red-button>
    </Form>
  </form-popup-container>
  <notification-popup-container
    :title="$t('landingPage.thank_you')"
    :description="$t('landingPage.please_check_your_email')"
    :button-text="$t('landingPage.go_to_my_email')"
    route-name="send-confirmation"
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
import router from '@/router'
import { Form } from 'vee-validate'
import { toRaw } from 'vue'
import axiosInstance from '@/config/axios'
import { checkIsValid } from '@/config/customFunction/index.js'

import TheInput from '@/components/form/TheInput.vue'
import FormPopupContainer from '@/components/popups/containers/FormPopupContainer.vue'
import NotificationPopupContainer from '@/components/popups/containers/NotificationPopupContainer.vue'
import SendIcon from '@/assets/icons/SendIcon.vue'
import RedButton from '@/components/buttons/RedButton.vue'

function sendData(values, errors) {
  if (values && !errors[0]) {
    axiosInstance.post('/signup', toRaw(values)).then((res) => {
      if (res.status === 201) {
        return router.push({ name: 'send-confirmation' })
      }
    })
  }
}
</script>
