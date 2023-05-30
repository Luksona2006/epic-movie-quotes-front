<template>
  <form-component
    :title="$t('landingPage.login_to_account')"
    :description="$t('landingPage.welcome_back')"
    route-name="login"
    next-route-name="signup"
    :button-text="$t('landingPage.login')"
    :next-route-description="$t('landingPage.do_not_have_account')"
    :next-route-text="$t('landingPage.signup')"
    @submit-form="sendData"
  >
    <the-input
      :title="$t('inputNames.email')"
      name="email"
      :placeholder="$t('placeholders.enter_your_email')"
      validation-rules="required|email"
    />
    <the-input
      :title="$t('inputNames.password')"
      name="password"
      :placeholder="$t('inputNames.password')"
      type="password"
      validation-rules="required"
    />
    <div class="w-full flex justify-between items-center">
      <div class="flex gap-2 items-center">
        <input type="checkbox" name="remember" value="rememeber" class="border" />
        <label for="remember" class="text-base text-white">Remember me</label>
      </div>
      <router-link to="forgot-password" class="underline text-base text-[#0D6EFD]"
        >Forgot Password</router-link
      >
    </div>
  </form-component>
</template>

<script setup>
import axiosInstance from '@/config/axios'
import router from '@/router'
import { useUserStore } from '@/store/userStore'

import TheInput from '@/components/form/TheInput.vue'
import FormComponent from '@/components/form/FormComponent.vue'

function sendData(data) {
  axiosInstance.post('/login', data).then((res) => {
    if (res.status === 200) {
      useUserStore()
        .setUserDetails(res)
        .then(() => router.push({ name: 'news-feed' }))
    }
  })
}
</script>
