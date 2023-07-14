<template>
  <ul class="w-full flex justify-between bg-white p-1 rounded-md border border-white">
    <li
      class="w-1/2 flex justify-center cursor-pointer rounded-s-md transition-all duration-300 border"
      :class="selectedEnStyle"
      @click="changeLanguage('en')"
    >
      <united-kingdom-icon class="h-8" />
    </li>
    <li
      class="w-1/2 flex justify-center cursor-pointer rounded-e-md transition-all duration-300"
      :class="selectedKaStyle"
      @click="changeLanguage('ka')"
    >
      <georgia-icon class="h-8" />
    </li>
  </ul>
</template>

<script setup>
import { computed, ref } from 'vue'
import { setLocale } from '@/services/api/locale/index.js'
import i18n from '@/config/i18n'
import { useLocaleStore } from '@/store/localeStore'

import GeorgiaIcon from '@/assets/icons/flags/GeorgiaIcon.vue'
import UnitedKingdomIcon from '@/assets/icons/flags/UnitedKingdomIcon.vue'

const localeStore = ref(useLocaleStore())
const locale = ref(localeStore.value.locale)

const selected = ref(locale.value)

const selectedEnStyle = computed(() =>
  selected.value === 'en' ? ' bg-[#68686859] b-[#68686859]' : 'bg-white b-white'
)
const selectedKaStyle = computed(() =>
  selected.value === 'ka' ? 'bg-[#68686859] b-[#68686859]' : 'bg-white b-white'
)

function changeLanguage(newLocale) {
  setLocale(newLocale).then((res) => {
    const recievedLocale = res.data.locale

    localStorage.setItem('savedLocale', recievedLocale)

    locale.value = recievedLocale
    selected.value = recievedLocale

    localeStore.value.changeLocale(recievedLocale)

    i18n.global.locale.value = recievedLocale
  })
}
</script>

<style scoped>
.selected-en {
  background-color: rgb(240, 240, 240);
  transition: all 0.4s;
}

.selected-ka {
  background-color: rgb(240, 240, 240);
  transition: all 0.4s;
}

.default {
  background-color: rgba(104, 104, 104, 0.452);
  transition: all 0.4s;
}
</style>
