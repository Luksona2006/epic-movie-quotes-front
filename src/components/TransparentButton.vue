<template>
  <button
    class="w-full bg-transparent border border-white px-6 py-2 rounded-md text-white sm:text-base text-sm hover:text-[#222030] hover:border-white hover:bg-white transition-all duration-300"
    @mouseenter="changeToHoverColor"
    @mouseleave="changeToMainColor"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const emit = defineEmits(['changeToHoverColor', 'changeToMainColor'])
function changeToHoverColor() {
  emit('changeToHoverColor')
}
function changeToMainColor() {
  emit('changeToMainColor')
}
</script>
