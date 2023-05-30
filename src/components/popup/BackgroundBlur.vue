<template>
  <transition name="blur">
    <div
      v-show="show"
      class="w-full h-screen backdrop-blur-[3px] bg-[#0000008A] absolute left-0 top-0 z-40"
    ></div>
  </transition>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

<style scoped>
.blur-enter-active,
.blur-leave-active {
  transition: 0.4s all;
}

.blur-enter-from,
.blur-leave-to {
  opacity: 0;
}

.blur-enter-to,
.blur-leave-from {
  opacity: 1;
}
</style>
