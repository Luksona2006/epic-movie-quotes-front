<template>
  <router-view />
</template>

<script setup>
if (localStorage.getItem('uploadedImage')) {
  localStorage.removeItem('uploadedImage')
}
</script>
<style>
body {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%);
}
</style>
