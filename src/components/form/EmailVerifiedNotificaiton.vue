<template>
  <notification-popup
    :title="$t('landingPage.thank_you')"
    :description="$t('landingPage.your_account_has_been_activated')"
    :button-text="$t('landingPage.go_to_my_news_feed')"
    route-name="verified"
    next-route-name="login"
  >
    <template #image><blue-check-mark-icon /></template>
  </notification-popup>
</template>

<script setup>
import NotificationPopup from '@/components/popup/NotificationPopup.vue'
import BlueCheckMarkIcon from '@/assets/icons/marks/BlueCheckMarkIcon.vue'
</script>
