<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/store/userStore'
import router from '@/router'

if (localStorage.getItem('uploadedImage')) {
  localStorage.removeItem('uploadedImage')
}

onMounted(() => {
  const user = useUserStore()
  if (user.id) {
    window.Echo.private(`change-email.${user.id}`).listen('ChangeUserEmail', () => {
      user.clearUser()
      return router.push({ name: 'home' })
    })
  }
})
</script>
<style>
body {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%);
}

h3,
h4,
h5,
h6,
p,
span {
  word-wrap: anywhere;
}
</style>
