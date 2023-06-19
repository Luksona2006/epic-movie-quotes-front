<template>
  <div
    class="flex flex-col gap-12 items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
  >
    <div class="flex flex-col gap-7 items-center">
      <div class="flex flex-col gap-7 items-center">
        <img src="@/assets/images/SoulImage.png" alt="soul-with-eyes-and-wide-white-mouth" />
        <img src="@/assets/images/WhiteShadowImage.png" alt="white-shadow" />
      </div>
      <div class="flex flex-col gap-4 items-center text-center">
        <p class="text-5xl font-bold text-white">{{ $t('errorPages.whoops') }}</p>
        <p class="text-2xl font-medium text-white">
          {{ $t('errorPages.we_can_not_see_the_page') }}
        </p>
      </div>
    </div>
    <router-link :to="{ name: 'home' }">
      <red-button>{{ $t('errorPages.return_home') }}</red-button></router-link
    >
  </div>
</template>

<script setup>
import RedButton from '@/components/buttons/RedButton.vue'
</script>
