<template>
  <the-header
    @show-sign-up="showPopup"
    @show-login="showPopup"
    @get-searched-quotes="getSearchedQuotes"
  />
  <the-container class="grid sm:grid-cols-4 sm:mt-8 mt-0 pb-32">
    <side-bar-component class="sm:grid hidden" />
    <div class="grid sm:col-span-2">
      <div class="w-full flex items-start gap-2 sm:mb-5">
        <write-new-quote
          class="transition-all duration-500 min-w-[219px]"
          :class="{ 'w-[286px]': searchOpened }"
          @add-new-quote="addNewQuote"
        />
        <search-component @open-search="openSearch" @get-searched-quotes="getSearchedQuotes" />
      </div>
      <div class="flex flex-col gap-20">
        <post-component
          v-for="quote in quotes"
          :quote="quote"
          :key="quote.id"
          v-if="quotes.length > 0"
        />
        <p class="text-2xl font-bold text-white opacity-80 text-center mt-10" v-else>
          No quotes found
        </p>
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

axiosInstance.get(`/user/${user.token}/quotes`).then((res) => {
  if (res.status === 200) {
    quotes.value = res.data.quotes
  }
})

function addNewQuote(quote) {
  quotes.value.unshift(quote)
}

function getSearchedQuotes(filteredQuotes) {
  quotes.value = filteredQuotes
  searchOpened.value = false
}
</script>
