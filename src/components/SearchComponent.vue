<template>
  <teleport to="body">
    <search-popup :show="showSearchPopup" @close-search="closeSearch" />
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
        :placeholder="searchPlaceholder"
        class="w-full pl-9 pr-4 py-4 bg-transparent text-base text-white placeholder-[#CED4DA] placeholder:text-xl rounded-[10px] outline-none transition-all duration-500"
      />
      <search-icon class="absolute left-0 top-1/2 transform -translate-y-1/2" />
    </div>
  </Form>
  <search-icon
    class="sm:hidden block transform transition-all duration-700"
    :class="searchIconStyles"
    v-if="routeName === 'news-feed' && hideOnMobile && mobile"
    @click="openSearchPopup"
  />
</template>
<script setup>
import { Form, Field } from 'vee-validate'
import { computed } from '@vue/reactivity'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import SearchIcon from '@/assets/icons/SearchIcon.vue'
import SearchPopup from '@/components/popup/SearchPopup.vue'

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

window.addEventListener('resize', updateWindowWidth)

function updateWindowWidth() {
  window.innerWidth < 640 ? (mobile.value = true) : (mobile.value = false)
}

const searchOpened = ref(false)

const searchStyles = computed(() => (searchOpened.value === true ? 'w-full ' : 'w-[190px] '))
const searchPlaceholder = computed(() =>
  searchOpened.value === true
    ? `${i18n.t('basic.enter')} @ ${i18n.t('post.to_search', {
        search: i18n.t('basic.movie')
      })}, ${i18n.t('basic.enter')} # ${i18n.t('post.to_search', {
        search: i18n.t('basic.quote')
      })}`
    : i18n.t('post.search_by')
)

const emits = defineEmits(['openSearch'])

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
</script>
