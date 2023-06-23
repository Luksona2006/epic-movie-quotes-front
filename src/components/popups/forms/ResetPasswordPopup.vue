<template>
  <form-popup-container
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
      :is-valid="checkIsValid(values, errors, 'password')"
    />
    <the-input
      :title="$t('inputNames.confirm_password')"
      name="password_confirmation"
      :placeholder="$t('inputNames.confirm_password')"
      type="password"
      validation-rules="required|confirmed:@password"
      :marked="true"
      :is-valid="checkIsValid(values, errors, 'password_confirmation')"
    />
  </form-popup-container>
  <notification-popup-container
    :title="$t('landingPage.success')"
    :description="$t('landingPage.your_password_changed_successfully')"
    :button-text="$t('landingPage.login')"
    route-name="password-reseted"
    next-route-name="login"
  >
    <template #image><blue-check-mark-icon /></template>
  </notification-popup-container>
</template>

<script setup>
import axiosInstance from '@/config/axios'
import router from '@/router'
import { useRoute } from 'vue-router'
import { toRaw } from 'vue'
import { checkIsValid } from '@/config/customFunction/index.js'

import TheInput from '@/components/form/TheInput.vue'
import FormPopupContainer from '@/components/popups/containers/FormPopupContainer.vue'
import NotificationPopupContainer from '@/components/popups/containers/NotificationPopupContainer.vue'
import BlueCheckMarkIcon from '@/assets/icons/marks/BlueCheckMarkIcon.vue'

const token = useRoute().params.token

function sendData(values, errors) {
  if (values && !errors[0]) {
    const data = toRaw(values)
    data['token'] = token
    axiosInstance.post(`/reset-password/${token}`, data).then((res) => {
      if (res.status === 200) {
        return router.push({ name: 'password-reseted' })
      }
    })
  }
}
</script>
