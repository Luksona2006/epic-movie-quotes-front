<template>
  <the-container class="grid sm:grid-cols-4 sm:mt-[120px] mt-4 pb-32 items-start">
    <side-bar-component class="sm:grid hidden" />
    <c-r-u-d-popup-container
      v-if="quote"
      :show="true"
      :title="$t('basic.view_quote')"
      :button-text="$t('basic.save_changes')"
      :is-form="false"
      :editable="true"
      :deletable="true"
      :redirectBack="true"
      :param-id="quote.id"
    >
      <template #form>
        <the-textarea
          name="quote_en"
          lang="en"
          :placeholder="quote.text.en"
          :disabled="true"
          :italic-styling="true"
          :parentheses="true"
          placeholderColor="#CED4DA"
        />
        <the-textarea
          name="quote_ka"
          lang="ka"
          :placeholder="quote.text.ka"
          :disabled="true"
          :italic-styling="true"
          :parentheses="true"
          placeholderColor="#CED4DA"
        />
      </template>
      <post-component class="col-span-2" :quote="quote" :as-post="false" v-if="quote" />
    </c-r-u-d-popup-container>
  </the-container>
</template>

<script setup>
import router from '@/router'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import axiosInstance from '@/config/axios'
import { useUserStore } from '@/store/userStore'
import { useLocaleStore } from '@/store/localeStore'

import CRUDPopupContainer from '@/components/popups/containers/CRUDPopupContainer.vue'
import SideBarComponent from '@/components/SideBarComponent.vue'
import TheContainer from '@/components/TheContainer.vue'
import PostComponent from '@/components/PostComponent.vue'
import TheTextarea from '@/components/form/TheTextarea.vue'

const route = useRoute()

const locale = ref(useLocaleStore().locale)

watch(
  () => useLocaleStore().locale,
  (newValue) => {
    locale.value = newValue
  }
)

const quoteId = route.params.id
const user = useUserStore()
const quote = ref(null)

axiosInstance
  .get(`/quotes/${quoteId}`)
  .then((res) => {
    if (res.status === 200) {
      quote.value = res.data.quote
    }
  })
  .catch((err) => {
    console.error(err.message)
    if (err.response.status === 401) {
      user.clearUser()
      return router.push({ name: 'home' })
    }
  })
</script>
