<template>
  <div class="relative">
    <slot></slot>
    <div class="absolute sm:top-1/3 top-10 left-[10%] flex sm:gap-5 gap-2 items-top z-10">
      <span class="sm:w-12 w-4 sm:h-1 h-[2px] bg-white sm:mt-5 mt-4"></span>
      <div class="flex flex-col gap-6">
        <h3 class="text-white sm:text-5xl text-xl font-bold sm:max-w-3xl max-w-xs">
          “{{ title }}”
        </h3>
        <span class="text-white sm:text-3xl text-base font-bold">{{ name }}, {{ year }}</span>
      </div>
    </div>
    <div class="w-full h-full absolute left-0 top-0 customGradientDown"></div>
    <div class="w-full h-full absolute left-0 top-0 customGradientRight"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  year: {
    type: String || Number,
    required: true
  }
})
</script>

<style scoped>
.customGradientDown {
  background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 55.21%, rgba(0, 0, 0, 0) 100%);
}

.customGradientRight {
  background: linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 55.21%, rgba(0, 0, 0, 0) 100%);
}
</style>
