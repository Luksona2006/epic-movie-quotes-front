<template>
  <teleport to="body">
    <search-popup
      :search-for="searchFor"
      :show="showSearchPopup"
      @close-search="closeSearch"
      @search-data="searchData"
    />
  </teleport>
  <Form
    class="transition-all duration-500 sm:flex hidden"
    :class="searchStyles"
    v-if="!hideOnMobile && !mobile"
  >
    <div class="relative w-full" @click="openSearch">
      <Field
        type="text"
        name="search"
        class="w-full pl-9 pr-4 py-4 bg-transparent text-base text-white placeholder-[#CED4DA] placeholder:text-xl rounded-[10px] outline-none transition-all duration-500"
        :placeholder="searchPlaceholder"
        v-model="searchValue"
      />
      <search-icon
        class="absolute left-0 top-1/2 transform -translate-y-1/2"
        @click="searchData(searchValue, searchFor)"
      />
    </div>
  </Form>
  <search-icon
    class="sm:hidden block transform transition-all duration-700"
    :class="searchIconStyles"
    v-if="(routeName === 'news-feed' || routeName === 'movie-list') && hideOnMobile && mobile"
    @click="openSearchPopup"
  />
</template>
<script setup>
import { Form, Field } from 'vee-validate'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/store/userStore'
import { computed } from '@vue/reactivity'
import { ref } from 'vue'

import SearchIcon from '@/assets/icons/SearchIcon.vue'
import SearchPopup from '@/components/popups/forms/SearchPopup.vue'
import axiosInstance from '@/config/axios'

const props = defineProps({
  hideOnMobile: {
    type: Boolean,
    required: false,
    default: false
  },
  searchFor: {
    type: String,
    required: true
  }
})

const user = useUserStore()

const i18n = useI18n()
const routeName = useRoute().name
const mobile = ref(window.innerWidth < 640)

window.addEventListener('resize', updateWindowWidth)

function updateWindowWidth() {
  window.innerWidth < 640 ? (mobile.value = true) : (mobile.value = false)
}

const searchValue = ref('')
const searchOpened = ref(false)

const searchStyles = computed(() =>
  searchOpened.value === true && routeName === 'news-feed'
    ? 'w-full '
    : routeName === 'news-feed'
    ? 'w-[170px]'
    : 'w-[140px]'
)
const searchPlaceholder = computed(() =>
  searchOpened.value === true && routeName === 'news-feed'
    ? `${i18n.t('basic.enter')} @ ${i18n.t('post.to_search', {
        search: i18n.t('basic.movie')
      })}, ${i18n.t('basic.enter')} # ${i18n.t('post.to_search', {
        search: i18n.t('basic.quote')
      })}`
    : i18n.t('post.search_by')
)

const emits = defineEmits(['openSearch', 'getSearchedQuotes'])

function openSearch() {
  searchOpened.value = true
  emits('openSearch')
}

// Popup version

const showSearchPopup = ref(false)

function openSearchPopup() {
  showSearchPopup.value = true
}

function closeSearch() {
  showSearchPopup.value = false
}

const searchIconStyles = computed(() =>
  showSearchPopup.value === true
    ? 'scale-[2] -translate-x-[40px] opacity-0'
    : 'scale-100 translate-x-0 opacity-100'
)

function searchData(searchBy, dataType) {
  if (routeName === 'news-feed' && searchOpened.value === false) {
    openSearch()
    return true
  }

  if ((searchBy.startsWith('#') || searchBy.startsWith('@')) && dataType === 'quotes') {
    axiosInstance.post('quotes/search', { searchBy, user_token: user.token }).then((res) => {
      emits('getSearchedQuotes', res.data.quotes)
      closeSearch()
    })
  }
  if (dataType === 'movies') {
    axiosInstance.post('movies/search', { searchBy, user_token: user.token }).then((res) => {
      emits('getSearchedMovies', res.data.movies)
      closeSearch()
    })
  }
}
</script>
