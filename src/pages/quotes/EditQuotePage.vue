<template>
  <the-container class="grid sm:grid-cols-4 sm:mt-[120px] mt-4 pb-32 items-start">
    <side-bar-component class="sm:grid hidden" />
    <crud-popup-container
      v-if="quote"
      :show="true"
      :title="$t('basic.edit_quote')"
      :button-text="$t('basic.save_changes')"
      :deletable="true"
      :param-id="quote.id"
      :redirectBack="true"
      @send-data="updateQuote"
    >
      <template #form>
        <the-textarea
          name="quote_en"
          lang="en"
          :placeholder="quote.text.en"
          :italic-styling="true"
          :parentheses="true"
          :value="quoteEn"
          placeholderColor="#CED4DA"
        />
        <the-textarea
          name="quote_ka"
          lang="ka"
          :placeholder="quote.text.ka"
          :italic-styling="true"
          :parentheses="true"
          :value="quoteKa"
          placeholderColor="#CED4DA"
        />
        <change-photo-component
          :image="quote.image"
          name="image"
          id="replace_image"
          @upload-image="uploadImage"
        />
      </template>
    </crud-popup-container>
  </the-container>
</template>

<script setup>
import router from '@/router'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import axiosInstance from '@/config/axios'
import { useUserStore } from '@/store/userStore'
import { useLocaleStore } from '@/store/localeStore'

import CrudPopupContainer from '@/components/popups/containers/CrudPopupContainer.vue'
import SideBarComponent from '@/components/SideBarComponent.vue'
import TheContainer from '@/components/TheContainer.vue'
import ChangePhotoComponent from '@/components/form/ChangePhotoComponent.vue'
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

const quoteEn = ref(null)
const quoteKa = ref(null)
const uploadedImage = ref(null)

function uploadImage(image) {
  uploadedImage.value = image
}

function updateQuote(values, hasErrors) {
  if (!hasErrors) {
    axiosInstance
      .put(`/quotes/${quote.value.id}`, {
        quote_en: values['quote_en'],
        quote_ka: values['quote_ka'],
        image: uploadedImage.value
      })
      .then((res) => {
        if (res.status === 200) {
          quoteEn.value = ''
          quoteKa.value = ''
          uploadedImage.value = null
          return router.push({ name: 'movie', params: { id: res.data.quote.movie_id } })
        }
      })
  }
}
</script>
