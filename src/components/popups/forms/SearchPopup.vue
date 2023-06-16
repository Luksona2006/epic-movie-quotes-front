<template>
  <transition name="popup">
    <div
      v-show="show"
      class="w-full h-screen absolute left-0 top-0 bg-[#12101A] flex flex-col z-20"
    >
      <Form v-slot="{ values }">
        <div class="flex items-center gap-6 border-b border-b-[#CED4DA80] py-6 px-9">
          <div @click="closeSearch" class="cursor-pointer"><arrow-left-icon /></div>
          <Field
            name="search"
            type="text"
            v-model="searchValue"
            class="w-full text-base text-white placeholder-[#CED4DA] placeholder:text-lg outline-none bg-transparent"
            :placeholder="$t('basic.search')"
          />
          <button @click.prevent="searchData(searchValue)" hidden></button>
        </div>
        <div class="flex flex-col gap-5 pl-[76px] pr-9 py-7">
          <div
            class="flex flex-col gap-5"
            v-show="
              (values['search'] === '' || values['search'] === undefined) &&
              routeName === 'news-feed'
            "
          >
            <p class="text-[#EFEFEF99]">
              {{ $t('basic.enter') }} <span class="text-white">@</span>
              {{ $t('post.to_search', { search: $t('basic.movie') }) }}
            </p>
            <p class="text-[#EFEFEF99]">
              {{ $t('basic.enter') }} <span class="text-white">#</span>
              {{ $t('post.to_search', { search: $t('basic.quote') }) }}
            </p>
          </div>
        </div>
      </Form>
    </div>
  </transition>
</template>

<script setup>
import { Field, Form } from 'vee-validate'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import ArrowLeftIcon from '@/assets/icons/arrows/ArrowLeftIcon.vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: false,
    default: false
  }
})

const routeName = useRoute().name
const searchValue = ref('')

const emits = defineEmits(['closeSearch', 'searchData'])

function closeSearch() {
  emits('closeSearch')
}

function searchData(searchBy) {
  emits('searchData', searchBy)
}
</script>

<style scoped>
.popup-enter-active,
.popup-leave-active {
  transition: 0.4s all;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translate(140px, -340px) scale(0.2);
}

.popup-enter-to,
.popup-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
