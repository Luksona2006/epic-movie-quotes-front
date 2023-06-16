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
    @submit.prevent
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
        @click="searchData(searchValue)"
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
import { computed } from '@vue/reactivity'
import { onMounted, onUnmounted, ref } from 'vue'

import SearchIcon from '@/assets/icons/SearchIcon.vue'
import SearchPopup from '@/components/popups/forms/SearchPopup.vue'

const props = defineProps({
  hideOnMobile: {
    type: Boolean,
    required: false,
    default: false
  }
})

const i18n = useI18n()
const routeName = useRoute().name
const mobile = ref(window.innerWidth < 640)

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth)
})

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

const emits = defineEmits(['openSearch', 'searchData'])

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

function searchData(searchBy) {
  if (routeName === 'news-feed' && searchOpened.value === false) {
    searchOpened.value = true
    return true
  }

  emits('searchData', searchBy)
  searchValue.value = ''
  closeSearch()
  searchOpened.value = false
}
</script>
