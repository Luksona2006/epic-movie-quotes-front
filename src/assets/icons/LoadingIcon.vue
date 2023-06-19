<template>
  <transition name="loading">
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      v-show="show"
    >
      <path
        d="M10 1C14.9706 1 19 5.02944 19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1Z"
        stroke="white"
        stroke-opacity="0.3"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M10 1C14.9706 1 19 5.02944 19 10"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
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
svg {
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-name: loading;
}

@keyframes loading {
  0% {
    rotate: 0deg;
  }

  100% {
    rotate: 360deg;
  }
}

.loading-enter-active,
.loading-leave-active {
  transition: 0.5s all;
}

.loading-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.loading-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.loading-leave-from {
  opacity: 1;
}

.loading-leave-to {
  opacity: 0;
}
</style>
