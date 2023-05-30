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
    <arrow-down
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
import { useI18n } from 'vue-i18n'
import axiosInstance from '@/config/axios'
import { setLocale } from '@vee-validate/i18n'

import ArrowDown from '@/assets/icons/ArrowDown.vue'

let { locale } = useI18n()

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
    axiosInstance
      .post('/locale', {
        locale: newLocale
      })
      .then((res) => {
        const recievedLocale = res.data.locale

        localStorage.setItem('savedLocale', recievedLocale)

        locale.value = recievedLocale
        selected.value = recievedLocale
        setLocale(recievedLocale)
        showList()
      })
  }
}
</script>
