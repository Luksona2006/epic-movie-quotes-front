<template>
  <notification-popup-container
    :title="$t('landingPage.thank_you')"
    :description="$t('landingPage.your_account_has_been_activated')"
    :button-text="$t('landingPage.go_to_my_news_feed')"
    route-name="verified"
    next-route-name="login"
  >
    <template #image><blue-check-mark-icon /></template>
  </notification-popup-container>
</template>

<script setup>
import NotificationPopupContainer from '@/components/popups/containers/NotificationPopupContainer.vue'
import BlueCheckMarkIcon from '@/assets/icons/marks/BlueCheckMarkIcon.vue'
</script>
