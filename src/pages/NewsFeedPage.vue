<template>
  <the-header @show-sign-up="showPopup" @show-login="showPopup" />
  <the-container class="grid sm:grid-cols-4 sm:mt-8 mt-0 pb-32">
    <side-bar-component class="sm:grid hidden" />
    <div class="grid sm:col-span-2">
      <div class="w-full flex items-center gap-2 sm:mb-5">
        <write-new-quote
          class="transition-all duration-500 min-w-[219px]"
          :class="{ 'w-[286px]': searchOpened }"
        />
        <search-component @open-search="openSearch" />
      </div>
      <post-component
        author="Luka Bakuridze"
        quote="Follow your dream"
        movie="Billy Eliot"
        date="2000"
        likes="200"
        :comments="[
          {
            id: 1,
            author: 'nini diasamidze',
            text: 'dzann magari filmia dzmaaa'
          },
          {
            id: 2,
            author: 'bachi baramidze',
            text: 'arvarga, dro ar daxarjot'
          }
        ]"
      />
    </div>
  </the-container>
</template>

<script setup>
import TheHeader from '@/components/TheHeader.vue'
import SideBarComponent from '@/components/SideBarComponent.vue'
import TheContainer from '@/components/TheContainer.vue'
import PostComponent from '@/components/PostComponent.vue'
import SearchComponent from '@/components/SearchComponent.vue'
import WriteNewQuote from '@/components/WriteNewQuote.vue'
import { ref } from 'vue'

const searchOpened = ref(false)

function openSearch() {
  searchOpened.value = true
}
</script>
