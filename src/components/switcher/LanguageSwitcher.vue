<template>
  <div
    class="relative flex items-center gap-2 py-3 px-5 cursor-pointer rounded-md transition-all duration-500 z-10"
    :class="divClass"
  >
    <p
      class="text-base font-normal transition-all duration-500 z-10"
      :class="textClass"
      @click="showList"
    >
      {{ $t(`language.${selected}`) }}
    </p>
    <arrow-down-icon
      :color="show ? 'black' : 'white'"
      class="transition-all duration-500"
      :class="show ? 'rotate-180' : 'rotate-0'"
      @click="showList"
    />
    <ul
      class="w-full absolute right-0 rounded-b-md rounded-br-md transition-all duration-500 pointer"
      :class="divClass + ' ' + dropDownClass"
    >
      <li class="w-full py-3 px-5 cursor-pointer" @click="changeLanguage('en')">
        <p class="text-base font-normal transition-all duration-500" :class="textClass">
          {{ $t('language.en') }}
        </p>
      </li>
      <li class="w-full py-3 px-5 cursor-pointer" @click="changeLanguage('ka')">
        <p class="text-base font-normal transition-all duration-500" :class="textClass">
          {{ $t('language.ka') }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { setLocale } from '@/services/api/locale/index.js'
import i18n from '@/config/i18n'
import { useLocaleStore } from '@/store/localeStore'

import ArrowDownIcon from '@/assets/icons/arrows/ArrowDownIcon.vue'

const locale = ref(useLocaleStore().locale)

const show = ref(false)
const selected = ref(locale.value)

const textClass = computed(() => (show.value ? 'text-black' : 'text-white'))
const divClass = computed(() => (show.value ? 'bg-white' : 'bg-transparent'))
const dropDownClass = computed(() => (show.value ? 'top-[90%] opacity-100' : 'top-0 opacity-0'))

function showList() {
  show.value = !show.value
}

function changeLanguage(newLocale) {
  if (show.value === true) {
    setLocale(newLocale).then((res) => {
      const recievedLocale = res.data.locale

      locale.value = recievedLocale
      selected.value = recievedLocale

      showList()

      useLocaleStore().changeLocale(recievedLocale)

      i18n.global.locale.value = recievedLocale
    })
  }
}
</script>
