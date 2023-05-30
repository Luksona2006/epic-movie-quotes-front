<template>
  <form-component
    :title="$t('landingPage.create_new_password')"
    :description="$t('landingPage.new_password_must_be_different')"
    route-name="reset-password"
    next-route-name="login"
    :button-text="$t('landingPage.reset_password')"
    :next-route-text="$t('landingPage.back_to_log_in')"
    @submit-form="sendData"
  >
    <the-input
      :title="$t('inputNames.password')"
      name="password"
      :placeholder="$t('placeholders.min_max', { min: 8, max: 15 })"
      type="password"
      validation-rules="required|min:8|max:15"
      :marked="true"
    />
    <the-input
      :title="$t('inputNames.confirm_password')"
      name="password_confirmation"
      :placeholder="$t('inputNames.confirm_password')"
      type="password"
      validation-rules="required|confirmed:@password"
      :marked="true"
    />
  </form-component>
  <notification-popup
    :title="$t('landingPage.success')"
    :description="$t('landingPage.your_password_changed_successfully')"
    :button-text="$t('landingPage.login')"
    route-name="password-reseted"
    next-route-name="login"
  >
    <template #image><check-mark-icon /></template>
  </notification-popup>
</template>

<script setup>
import axiosInstance from '@/config/axios'
import router from '@/router'
import { useRoute } from 'vue-router'

import TheInput from '@/components/form/TheInput.vue'
import FormComponent from '@/components/form/FormComponent.vue'
import NotificationPopup from '@/components/popup/NotificationPopup.vue'
import CheckMarkIcon from '@/assets/icons/CheckMarkIcon.vue'

const token = useRoute().params.token

function sendData(data) {
  data['token'] = token
  axiosInstance.post(`/reset-password/${token}`, data).then((res) => {
    if (res.status === 200) {
      return router.push({ name: 'password-reseted' })
    }
  })
}
</script>
