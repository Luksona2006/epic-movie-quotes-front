<template>
  <the-header @show-sign-up="showPopup" @show-login="showPopup" @search-data="searchData" />
  <the-container class="grid sm:grid-cols-4 sm:mt-8 mt-0 pb-32">
    <side-bar-component class="sm:grid hidden" />
    <div class="grid sm:col-span-2">
      <div class="w-full flex items-start gap-2 sm:mb-5">
        <write-new-quote
          class="transition-all duration-500 min-w-[219px]"
          :class="{ 'w-[286px]': searchOpened }"
          @add-new-quote="addNewQuote"
        />
        <search-component @open-search="openSearch" @search-data="searchData" />
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
import { onMounted, onUnmounted, ref, watch } from 'vue'
import axiosInstance from '@/config/axios'
import { useUserStore } from '@/store/userStore'
import { useFetchStore } from '@/store/fetchStore'

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
const fetchStore = useFetchStore()

onMounted(() => {
  fetchStore.clearFetchStore()
  window.addEventListener('scroll', fetchDataOnScroll)
})

onUnmounted(() => {
  fetchStore.clearFetchStore()
  window.removeEventListener('scroll', fetchDataOnScroll)
})

fetchStore.clearFetchStore()

window.scrollTo({
  top: 0,
  left: 0
})

axiosInstance.get(`/user/${user.token}/quotes/page/${fetchStore.page}`).then((res) => {
  if (res.status === 200) {
    quotes.value.push(...res.data.quotes)

    if (res.data.isLastPage === true) {
      fetchStore.allDataFetched()
      return true
    }

    fetchStore.increasePageNum()
  }
})

const searchingValue = ref('')

watch(
  () => searchingValue.value,
  () => {
    fetchStore.clearFetchStore()
    quotes.value = []
  }
)

function searchData(searchBy) {
  searchingValue.value = searchBy
  if (fetchStore.allPagesFetched === false) {
    if (searchBy.startsWith('#') || searchBy.startsWith('@')) {
      fetchStore.startFetch()
      axiosInstance
        .post('quotes/search', { searchBy, user_token: user.token, pageNum: fetchStore.page })
        .then((res) => {
          quotes.value.push(...res.data.quotes)
          searchOpened.value = false

          fetchStore.finishFetch()
          if (res.data.isLastPage === true) {
            fetchStore.allDataFetched()
            return true
          }

          fetchStore.increasePageNum()
        })
    }

    if (searchBy === '') {
      fetchStore.startFetch()
      axiosInstance.get(`/user/${user.token}/quotes/page/${fetchStore.page}`).then((res) => {
        if (res.status === 200) {
          quotes.value.push(...res.data.quotes)
          searchOpened.value = false

          fetchStore.finishFetch()
          if (res.data.isLastPage === true) {
            fetchStore.allDataFetched()
            return true
          }

          fetchStore.increasePageNum()
        }
      })
    }
  }
}

function fetchDataOnScroll() {
  const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight

  if (scrolledToBottom && !fetchStore.isFetching) {
    searchData(searchingValue.value)
  }
}

function addNewQuote(quote) {
  quotes.value.unshift(quote)
}
</script>
