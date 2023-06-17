<template>
  <div
    class="flex flex-col gap-12 items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
  >
    <div class="flex flex-col gap-7 items-center">
      <div class="w-fit relative flex flex-col gap-7 items-center">
        <img
          class="relative z-10"
          src="@/assets/images/GandolfImage.png"
          alt="soul-with-eyes-and-wide-white-mouth"
        />
        <img
          class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
          src="@/assets/images/GandolfBackgroundImage.png"
          alt="white-background"
        />
      </div>
      <div class="flex flex-col gap-4 items-center text-center">
        <p class="text-5xl font-bold text-white">{{ $t('errorPages.you_shall_not_pass') }}</p>
        <p class="text-2xl font-medium text-white">
          {{ $t('errorPages.you_do_not_have_permission') }}
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
