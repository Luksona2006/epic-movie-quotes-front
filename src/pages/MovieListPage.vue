<template>
  <the-header @show-sign-up="showPopup" @show-login="showPopup" @search-data="searchData" />
  <the-container class="grid sm:grid-cols-5 sm:mt-8 mt-4 pb-32 items-start">
    <side-bar-component class="sm:grid hidden" />
    <div class="grid sm:col-span-4">
      <div class="w-full flex justify-between items-start">
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
      <div class="grid sm:grid-cols-3 grid-cols-1 gap-12 mt-12">
        <movie-component
          v-for="movie in movies"
          :movie="movie"
          :key="movie.id"
          v-if="movies.length > 0"
        />
        <p class="grid col-span-3 text-center text-3xl text-white font-bold py-16" v-else>
          No movies yet
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
import MovieComponent from '@/components/MovieComponent.vue'
import SearchComponent from '@/components/SearchComponent.vue'
import AddMovie from '@/components/popups/crud/AddMovie.vue'

const user = useUserStore()
const movies = ref([])
const totalMovies = ref(0)

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

axiosInstance.get(`/user/${user.token}/movies/page/${fetchStore.page}`).then((res) => {
  if (res.status === 200) {
    totalMovies.value = res.data.total
    movies.value.push(...res.data.movies)

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
    movies.value = []
  }
)

function searchData(searchBy) {
  searchingValue.value = searchBy
  if (fetchStore.allPagesFetched === false) {
    if (searchBy !== '') {
      fetchStore.startFetch()
      axiosInstance
        .post('movies/search', { searchBy, user_token: user.token, pageNum: fetchStore.page })
        .then((res) => {
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
      axiosInstance.get(`/user/${user.token}/movies/page/${fetchStore.page}`).then((res) => {
        if (res.status === 200) {
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

  if (scrolledToBottom && !fetchStore.isFetching) {
    searchData(searchingValue.value)
  }
}

function addNewMovie(movie) {
  movies.value.unshift(movie)
}
</script>
