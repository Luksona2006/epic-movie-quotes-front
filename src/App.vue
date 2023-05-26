<template>
  <router-view />
</template>

<script setup>
import { setLocale } from '@vee-validate/i18n'
if (localStorage.getItem('savedLocale') === undefined) {
  localStorage.setItem('savedLocale', '')
}

const locale =
  localStorage.getItem('savedLocale') !== ''
    ? localStorage.getItem('savedLocale')
    : import.meta.env.VITE_DEFAULT_LOCALE

setLocale(locale)
</script>
<style>
body {
  width: 100%;
  min-height: 100vh;
}
</style>
