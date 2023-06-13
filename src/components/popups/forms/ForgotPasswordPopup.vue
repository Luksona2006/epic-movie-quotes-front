<template>
  <form-popup-container
    :title="`${$t('landingPage.forgot_password') + '?'}`"
    :description="$t('landingPage.an_email_with_instructions')"
    route-name="forgot-password"
    next-route-name="login"
    :button-text="$t('landingPage.send_instructions')"
    :next-route-text="$t('landingPage.back_to_log_in')"
    @submit-form="sendData"
  >
    <the-input
      :title="$t('inputNames.email')"
      name="email"
      :placeholder="$t('placeholders.enter_your_email')"
      validation-rules="required|email"
    />
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
import axiosInstance from '@/config/axios'
import router from '@/router'

import TheInput from '@/components/form/TheInput.vue'
import FormPopupContainer from '@/components/popups/containers/FormPopupContainer.vue'
import NotificationPopupContainer from '@/components/popups/containers/NotificationPopupContainer.vue'
import SendIcon from '@/assets/icons/SendIcon.vue'

function sendData(data) {
  axiosInstance.post('/forgot-password', data).then((res) => {
    if (res.status === 200) {
      return router.push({ name: 'send-password-reset-email' })
    }
  })
}
</script>
