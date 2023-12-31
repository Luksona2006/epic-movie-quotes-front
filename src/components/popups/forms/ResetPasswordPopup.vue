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
    <Form @submit.prevent class="w-full mt-6" v-slot="{ errors, values }">
      <div class="w-full flex flex-col gap-4">
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
      </div>
      <red-button @click="sendData(values, errors)" class="mt-5">
        {{ $t('landingPage.send_instructions') }}
      </red-button>
    </Form>
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
import { Form } from 'vee-validate'
import { resetPassword } from '@/services/api/auth/index.js'
import { useRoute } from 'vue-router'
import { toRaw } from 'vue'
import { checkIsValid } from '@/config/customFunction/index.js'

import TheInput from '@/components/form/TheInput.vue'
import RedButton from '@/components/buttons/RedButton.vue'
import FormPopupContainer from '@/components/popups/containers/FormPopupContainer.vue'
import NotificationPopupContainer from '@/components/popups/containers/NotificationPopupContainer.vue'
import BlueCheckMarkIcon from '@/assets/icons/marks/BlueCheckMarkIcon.vue'

const token = useRoute().params.token

function sendData(values, errors) {
  if (values && !errors[0]) {
    const data = toRaw(values)
    data['token'] = token
    resetPassword(token, data)
  }
}
</script>
