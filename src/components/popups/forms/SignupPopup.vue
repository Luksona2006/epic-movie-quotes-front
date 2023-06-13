<template>
  <form-popup-container
    :title="$t('landingPage.create_an_account')"
    :description="$t('landingPage.start_your_journey')"
    route-name="signup"
    next-route-name="login"
    :button-text="$t('landingPage.get_started')"
    :next-route-description="$t('landingPage.already_have_account')"
    :next-route-text="$t('landingPage.login')"
    @submit-form="sendData"
  >
    <the-input
      :title="$t('inputNames.name')"
      name="name"
      :placeholder="$t('placeholders.min_max', { min: 3, max: 15 })"
      validation-rules="required|min:3|max:15"
      :marked="true"
    />
    <the-input
      :title="$t('inputNames.email')"
      name="email"
      type="email"
      :placeholder="$t('placeholders.enter_your_email')"
      validation-rules="required|email"
      :marked="true"
    />
    <the-input
      :title="$t('inputNames.password')"
      name="password"
      :placeholder="$t('placeholders.min_max', { min: 8, max: 15 })"
      type="password"
      validation-rules="required|min:8|max:15"
      :canShow="true"
      :marked="true"
    />
    <the-input
      :title="$t('inputNames.confirm_password')"
      name="confirm_password"
      :placeholder="$t('inputNames.confirm_password')"
      type="password"
      validation-rules="required|confirmed:@password"
      :canShow="true"
      :marked="true"
    />
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
import axiosInstance from '@/config/axios'
import TheInput from '@/components/form/TheInput.vue'
import FormPopupContainer from '@/components/popups/containers/FormPopupContainer.vue'
import NotificationPopupContainer from '@/components/popups/containers/NotificationPopupContainer.vue'
import SendIcon from '@/assets/icons/SendIcon.vue'
import router from '@/router'

function sendData(data) {
  axiosInstance.post('/signup', data).then((res) => {
    if (res.status === 200) return router.push({ name: 'send-confirmation' })
  })
}
</script>
