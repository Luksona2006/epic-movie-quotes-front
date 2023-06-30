<template>
  <div
    class="relative flex items-center gap-4 pl-3 pr-4 py-1 cursor-pointer rounded-md transition-all duration-500 z-10 bg-white"
  >
    <arrow-down-icon
      color="black"
      class="transition-all duration-500"
      :class="show ? 'rotate-180' : 'rotate-0'"
      @click="showList"
    />
    <div class="transition-all duration-500 z-10" @click="showList">
      <united-kingdom-icon v-if="selected === 'en'" />
      <georgia-icon v-if="selected === 'ka'" />
    </div>

    <ul
      class="w-full absolute right-0 pl-5 pr-4 rounded-b-md rounded-br-md transition-all duration-500 pointer bg-white"
      :class="divClass + ' ' + dropDownClass"
    >
      <li class="flex justify-end cursor-pointer" @click="changeLanguage('en')">
        <div><united-kingdom-icon /></div>
      </li>
      <li class="flex justify-end cursor-pointer" @click="changeLanguage('ka')">
        <div><georgia-icon /></div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { setLocale } from '@/services/api/locale/index.js'
import i18n from '@/config/i18n'
import { useLocaleStore } from '@/store/localeStore'

import GeorgiaIcon from '@/assets/icons/flags/GeorgiaIcon.vue'
import UnitedKingdomIcon from '@/assets/icons/flags/UnitedKingdomIcon.vue'
import ArrowDownIcon from '@/assets/icons/arrows/ArrowDownIcon.vue'

const localeStore = ref(useLocaleStore())
const locale = ref(localeStore.value.locale)

const show = ref(false)
const selected = ref(locale.value)

const dropDownClass = computed(() => (show.value ? 'top-[90%] opacity-100' : 'top-0 opacity-0'))

function showList() {
  show.value = !show.value
}

function changeLanguage(newLocale) {
  if (show.value === true) {
    setLocale(newLocale).then((res) => {
      const recievedLocale = res.data.locale

      localStorage.setItem('savedLocale', recievedLocale)

      locale.value = recievedLocale
      selected.value = recievedLocale

      showList()

      localeStore.value.changeLocale(recievedLocale)

      i18n.global.locale.value = recievedLocale
    })
  }
}
</script>
