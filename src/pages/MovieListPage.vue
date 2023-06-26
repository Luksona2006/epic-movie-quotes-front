<template>
  <the-header @show-sign-up="showPopup" @show-login="showPopup" @search-data="searchData" />
  <the-container class="grid sm:grid-cols-5 sm:mt-8 mt-4 pb-32 sm:px-[70px] px-9 items-start">
    <side-bar-component class="sm:grid hidden" />
    <div class="grid sm:col-span-4">
      <div class="w-full flex justify-between items-start" v-if="totalMovies !== null">
        <p class="sm:block hidden text-2xl font-medium text-white">
          {{ $t('basic.my_list_of_movies') }} ({{ $t('basic.total') }} {{ totalMovies }})
        </p>
        <div class="sm:hidden flex flex-col gap-2 items-start">
          <p class="text-2xl font-medium text-white">{{ $t('basic.my_list_of_movies') }}</p>
          <p class="text-base font-medium text-white">
            ({{ $t('basic.total') }} {{ movies.length }})
          </p>
        </div>
        <div class="flex items-center">
          <search-component @search-data="searchData" />
          <add-movie @add-new-movie="addNewMovie" />
        </div>
      </div>
      <div class="grid sm:grid-cols-3 grid-cols-1 gap-12 mt-12" v-if="totalMovies !== null">
        <movie-component
          v-for="movie in movies"
          :movie="movie"
          :key="movie.id"
          v-if="movies.length > 0"
        />
        <p
          class="grid col-span-3 text-center text-3xl text-white font-bold py-16"
          v-else-if="searchingValue === ''"
        >
          {{ $t('post.no_movies_yet') }}
        </p>
        <p class="grid col-span-3 text-center text-3xl text-white font-bold py-16" v-else>
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
import MovieComponent from '@/components/MovieComponent.vue'
import SearchComponent from '@/components/SearchComponent.vue'
import AddMovie from '@/components/popups/crud/AddMovie.vue'
import LoadingIcon from '@/assets/icons/LoadingIcon.vue'

const user = useUserStore()
const movies = ref([])
const totalMovies = ref(null)
const showLoading = ref(true)

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

axiosInstance
  .post('/movies/page', { pageNum: fetchStore.page })
  .then((res) => {
    if (res.status === 200) {
      showLoading.value = false

      totalMovies.value = res.data.total
      movies.value.push(...res.data.movies)

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
    movies.value = []
  }
)

function searchData(searchBy) {
  searchingValue.value = searchBy
  if (fetchStore.allPagesFetched === false) {
    if (searchBy !== '') {
      fetchStore.startFetch()
      axiosInstance.post('movies/search', { searchBy, pageNum: fetchStore.page }).then((res) => {
        searchingValueChanged.value = false
        showLoading.value = false
        totalMovies.value = res.data.total
        movies.value.push(...res.data.movies)

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
      axiosInstance.post('/movies/page', { pageNum: fetchStore.page }).then((res) => {
        if (res.status === 200) {
          searchingValueChanged.value = false
          showLoading.value = false
          movies.value.push(...res.data.movies)

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

  if (scrolledToBottom && !fetchStore.isFetching && !fetchStore.allPagesFetched) {
    showLoading.value = true
    fetchStore.startFetch()
    const ms = Math.random() * (3500 - 2000) + 2000
    setTimeout(() => {
      searchData(searchingValue.value)
    }, ms)
  }
}

function addNewMovie(movie) {
  movies.value.unshift(movie)
}
</script>
