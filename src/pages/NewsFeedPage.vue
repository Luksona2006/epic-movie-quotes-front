<template>
  <the-header @show-sign-up="showPopup" @show-login="showPopup" />
  <the-container class="grid sm:grid-cols-4 sm:mt-8 mt-0 pb-32">
    <side-bar-component class="sm:grid hidden" />
    <div class="grid sm:col-span-2">
      <div class="w-full flex items-start gap-2 sm:mb-5">
        <write-new-quote
          class="transition-all duration-500 min-w-[219px]"
          :class="{ 'w-[286px]': searchOpened }"
          @add-new-quote="addNewQuote"
        />
        <search-component @open-search="openSearch" />
      </div>
      <div class="flex flex-col gap-20">
        <post-component
          v-for="quote in quotes"
          :quote="quote"
          :key="quote.id"
          v-if="quotes.length > 0"
        />
      </div>
    </div>
  </the-container>
</template>

<script setup>
import { ref } from 'vue'
import axiosInstance from '@/config/axios'
import { useUserStore } from '@/store/userStore'

import TheHeader from '@/components/TheHeader.vue'
import SideBarComponent from '@/components/SideBarComponent.vue'
import TheContainer from '@/components/TheContainer.vue'
import PostComponent from '@/components/PostComponent.vue'
import SearchComponent from '@/components/SearchComponent.vue'
import WriteNewQuote from '@/components/popups/crud/WriteNewQuote.vue'

const searchOpened = ref(false)

function openSearch() {
  searchOpened.value = true
}

const user = useUserStore()
const quotes = ref([])

axiosInstance.post('/quote/get-all', { token: user.token }).then((res) => {
  if (res.status === 200) {
    quotes.value = res.data.quotes
  }
})

function addNewQuote(quote) {
  quotes.value.unshift(quote)
}
</script>
