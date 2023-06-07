<template>
  <the-header @show-sign-up="showPopup" @show-login="showPopup" />
  <the-container class="grid sm:grid-cols-4 mt-8 pb-32">
    <side-bar-component class="sm:grid hidden" />
    <div class="grid sm:col-span-2"></div>
  </the-container>
</template>

<script setup>
import TheHeader from '@/components/TheHeader.vue'
import SideBarComponent from '@/components/SideBarComponent.vue'
import TheContainer from '@/components/TheContainer.vue'
</script>
