<template>
  <the-header @show-sign-up="showPopup" @show-login="showPopup" @search-data="searchData" />
  <the-container class="grid sm:grid-cols-4 sm:mt-8 mt-0 pb-32">
    <side-bar-component class="sm:grid hidden" />
    <div class="grid sm:col-span-2">
      <div class="w-full flex items-start gap-2 sm:mb-5" v-if="quotesFetched">
        <write-new-quote
          class="transition-all duration-500 min-w-[219px]"
          :class="{ 'w-[286px]': searchOpened }"
          @add-new-quote="addNewQuote"
        />
        <search-component @open-search="openSearch" @search-data="searchData" />
      </div>
      <div class="flex flex-col sm:gap-20 gap-8" v-if="quotesFetched">
        <post-component
          v-for="quote in quotes"
          :quote="quote"
          :key="quote.id"
          v-if="quotes.length > 0"
        />
        <p
          class="text-2xl font-bold text-white opacity-80 text-center mt-10"
          v-else-if="
            (searchingValue.startsWith('#') || searchingValue === '') && !searchingValueChanged
          "
        >
          {{ $t('post.no_quotes') }}
        </p>

        <movie-component
          v-for="movie in movies"
          :movie="movie"
          :redirect="false"
          :key="movie.id"
          v-if="movies.length > 0"
        />
        <p
          class="text-2xl font-bold text-white opacity-80 text-center mt-10"
          v-else-if="searchingValue.startsWith('@') && !searchingValueChanged"
        >
          {{ $t('post.no_movies') }}
        </p>
      </div>
      <loading-icon class="w-10 h-10 mt-10 mx-auto" :show="showLoading" />
    </div>
  </the-container>
</template>

<script setup>
import router from '@/router'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import axiosInstance from '@/config/axios'
import { useUserStore } from '@/store/userStore'
import { useFetchStore } from '@/store/fetchStore'

import TheHeader from '@/components/TheHeader.vue'
import SideBarComponent from '@/components/SideBarComponent.vue'
import TheContainer from '@/components/TheContainer.vue'
import PostComponent from '@/components/PostComponent.vue'
import MovieComponent from '@/components/MovieComponent.vue'
import SearchComponent from '@/components/SearchComponent.vue'
import WriteNewQuote from '@/components/popups/crud/WriteNewQuote.vue'
import LoadingIcon from '@/assets/icons/LoadingIcon.vue'

const searchOpened = ref(false)
const showLoading = ref(true)

function openSearch() {
  searchOpened.value = true
}

const user = useUserStore()
const quotes = ref([])
const movies = ref([])
const fetchStore = useFetchStore()
const quotesFetched = ref(false)

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

axiosInstance
  .post('quotes/page', { pageNum: fetchStore.page })
  .then((res) => {
    showLoading.value = true
    if (res.status === 200) {
      quotesFetched.value = true
      showLoading.value = false
      quotes.value.push(...res.data.quotes)

      if (res.data.isLastPage === true) {
        fetchStore.allDataFetched()
        return true
      }

      fetchStore.increasePageNum()
    }
  })
  .catch((err) => {
    console.error(err.message)
    if (err.response.status === 401) {
      user.clearUser()
      return router.push({ name: 'home' })
    }
  })

const searchingValue = ref('')
const searchingValueChanged = ref(false)

watch(
  () => searchingValue.value,
  () => {
    fetchStore.clearFetchStore()

    searchingValueChanged.value = true
    quotes.value = []
    movies.value = []
  }
)

function searchData(searchBy) {
  searchingValue.value = searchBy
  if (fetchStore.allPagesFetched === false) {
    if (searchBy.startsWith('#')) {
      axiosInstance.post('quotes/search', { searchBy, pageNum: fetchStore.page }).then((res) => {
        if (res.status === 200) {
          searchingValueChanged.value = false
          showLoading.value = false
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

    if (searchBy.startsWith('@')) {
      axiosInstance.post('movies/search', { searchBy, pageNum: fetchStore.page }).then((res) => {
        if (res.status === 200) {
          searchingValueChanged.value = false
          showLoading.value = false
          movies.value.push(...res.data.movies)
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

    if (searchBy === '') {
      axiosInstance.post('/quotes/page', { pageNum: fetchStore.page }).then((res) => {
        if (res.status === 200) {
          searchingValueChanged.value = false
          showLoading.value = false
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
  console.log(scrolledToBottom && !fetchStore.isFetching && !fetchStore.allPagesFetched)
  if (scrolledToBottom && !fetchStore.isFetching && !fetchStore.allPagesFetched) {
    showLoading.value = true
    fetchStore.startFetch()
    const ms = Math.random() * (3500 - 2000) + 2000
    setTimeout(() => {
      searchData(searchingValue.value)
    }, ms)
  }
}

function addNewQuote(quote) {
  quotes.value.unshift(quote)
}
</script>
