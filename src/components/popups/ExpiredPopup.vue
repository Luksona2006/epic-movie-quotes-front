<template>
  <notification-popup-container
    :title="$t('landingPage.link_expired')"
    :description="$t('landingPage.link_has_expired')"
    :button-text="$t('landingPage.request_another_link')"
    route-name="expired"
    next-route-name="login"
  >
    <template #image><expired-icon /></template>
    <template #additionRoute>
      <router-link :to="{ name: 'home' }" class="text-[#6C757D] text-base">{{
        $t('landingPage.skip_i_will_confirm_later')
      }}</router-link>
    </template>
  </notification-popup-container>
</template>

<script setup>
import NotificationPopupContainer from '@/components/popups/containers/NotificationPopupContainer.vue'
import ExpiredIcon from '@/assets/icons/ExpiredIcon.vue'
</script>
