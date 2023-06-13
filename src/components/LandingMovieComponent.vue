<template>
  <div class="relative w-full">
    <div class="absolute left-0 top-0 z-10">
      <img src="@/assets/images/ShadowTopImage.png" alt="shadow-from-top" />
    </div>
    <div class="absolute left-0 top-0 z-10">
      <img src="@/assets/images/ShadowLeftImage.png" alt="shadow-from-left" />
    </div>
    <div class="absolute left-[22%] top-1/3 transform -translate-x-60 z-20 flex gap-5 items-top">
      <span class="w-12 h-1 bg-white mt-5"></span>
      <div class="flex flex-col gap-6">
        <h3 class="text-white text-5xl font-bold max-w-3xl">“{{ title }}”</h3>
        <span class="text-white text-3xl font-bold">{{ movieName }}, {{ movieDate }}</span>
      </div>
    </div>
    <img :src="imageSrc" alt="movie" />
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  movieName: {
    type: String,
    required: true
  },
  movieDate: {
    type: String || Number,
    required: true
  },
  imageSrc: {
    type: String,
    required: true
  }
})
</script>
