<template>
  <transition :name="transitionName">
    <div class="absolute left-0 top-0 w-full z-50" v-show="show">
      <slot></slot>
      <transition name="texts">
        <div
          class="absolute sm:top-1/3 top-10 left-[10%] flex sm:gap-5 gap-2 items-top z-10"
          v-show="show"
        >
          <span class="sm:w-12 w-4 sm:h-1 h-[2px] bg-white sm:mt-5 mt-4"></span>
          <div class="flex flex-col gap-6">
            <h3 class="text-white sm:text-5xl text-xl font-bold sm:max-w-3xl max-w-xs">
              “{{ title }}”
            </h3>
            <span class="text-white sm:text-3xl text-base font-bold">{{ name }}, {{ year }}</span>
          </div>
        </div>
      </transition>
      <div class="w-full h-full absolute left-0 top-0 customGradientDown"></div>
      <div class="w-full h-full absolute left-0 top-0 customGradientRight"></div>
    </div>
  </transition>
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
  },
  show: {
    type: Boolean,
    required: true
  },
  transitionName: {
    type: String,
    required: false,
    default: 'movieUp'
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

.movieUp-enter-active,
.movieUp-leave-active,
.movieDown-enter-active,
.movieDown-leave-active {
  transition: 0.7s all ease-in-out;
}

.texts-enter-active,
.texts-leave-active {
  transition: 1s all ease-in-out;
}
.movieUp-enter-from,
.movieDown-enter-from {
  opacity: 1;
  transform: translateY(100%);
}
.movieUp-leave-to {
  transform: translateY(-320px);
  opacity: 0.4;
}

.movieDown-leave-to {
  transform: translateY(10px);
  opacity: 0.4;
}

.texts-enter-from {
  transform: translateY(60px);
}
.texts-leave-to {
  transform: translateY(-30px);
}

.movieUp-enter-to,
.movieUp-leave-from,
.movieDown-enter-to,
.movieDown-leave-from {
  transform: translateY(0);
}
</style>
