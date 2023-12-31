<template>
  <div class="w-full flex flex-col items-start rounded-xl bg-[#11101A]" :class="padding">
    <div class="w-full flex gap-4 items-center mb-4" v-if="asPost && routeName !== 'news-feed'">
      <img
        :src="imagePrefix + updatedQuote.user.image"
        alt="profile"
        class="sm:w-[52px] sm:h-[52px] w-[40px] h-[40px] rounded-full"
      />
      <p class="sm:text-xl text-base text-white">{{ updatedQuote.user.name }}</p>
    </div>
    <router-link
      :to="{ name: 'user', params: { id: updatedQuote.user.id } }"
      class="w-full flex gap-4 items-center mb-4"
      v-else-if="asPost"
    >
      <img
        :src="imagePrefix + updatedQuote.user.image"
        alt="profile"
        class="sm:w-[52px] sm:h-[52px] w-[40px] h-[40px] rounded-full"
      />
      <p class="sm:text-xl text-base text-white">{{ updatedQuote.user.name }}</p>
    </router-link>
    <div class="w-full flex flex-col gap-7 items-start mb-6">
      <p class="sm:text-xl text-base text-white" v-if="asPost">
        “{{ updatedQuote.text[locale] }}”.
        <span class="text-[#DDCCAA]">{{ updatedQuote.movie.name[locale] }}</span> ({{
          updatedQuote.movie.year
        }})
      </p>
      <div class="w-full flex flex-col gap-6 items-start">
        <img
          :src="imagePrefix + updatedQuote.image"
          alt="movie-scene"
          class="w-full rounded-[10px] sm:h-[500px]"
          :class="imageHeight"
        />
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-3" @click="getAllComments">
            <p class="sm:text-xl text-base text-white">{{ updatedQuote.commentsTotal }}</p>
            <comment-icon class="sm:w-8 sm:h-[30px] w-6 h-[23px] cursor-pointer" />
          </div>
          <div class="flex items-center gap-3">
            <p class="sm:text-xl text-base text-white">{{ likes }}</p>
            <heart-icon
              @click="likePost"
              class="sm:w-8 sm:h-[30px] w-6 h-[23px] cursor-pointer"
              :color="heartIconColor"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-full flex flex-col sm:gap-6 gap-4 sm:pt-6 pt-0 items-start border-t border-t-[#EFEFEF4D]"
    >
      <div class="w-full" v-for="comment in comments" :key="comment.id">
        <div class="w-full sm:flex hidden gap-6 items-start">
          <img
            :src="imagePrefix + comment.user.image"
            alt="profile"
            class="sm:w-[52px] sm:h-[52px] w-[40px] h-[40px] rounded-full"
          />
          <div class="w-full flex flex-col pt-[11px] pb-6 border-b border-b-[#EFEFEF4D]">
            <p class="sm:text-xl text-base font-medium text-white">{{ comment.user.name }}</p>
            <p class="sm:text-xl text-base text-white">{{ comment.text }}</p>
          </div>
        </div>
        <div
          class="w-full sm:hidden flex flex-col gap-3 items-start border-b border-b-[#EFEFEF4D] pt-4 pb-6"
        >
          <div class="w-full flex gap-4 items-center">
            <img
              :src="imagePrefix + comment.user.image"
              alt="profile"
              class="sm:w-[52px] sm:h-[52px] w-[40px] h-[40px] rounded-full"
            />
            <p class="sm:text-xl text-base font-medium text-white">{{ comment.user.name }}</p>
          </div>
          <p class="sm:text-xl text-base text-white">{{ comment.text }}</p>
        </div>
      </div>
      <Form class="w-full flex gap-6 items-center sm:mt-0 mt-4" v-slot="{ values }">
        <button @click.prevent="postComment(values)" class="bg-red-600" hidden></button>
        <img
          :src="profileImage"
          alt="profile"
          class="sm:w-[52px] sm:h-[52px] w-[40px] h-[40px] rounded-full"
        />
        <Field
          name="comment"
          type="text"
          class="w-full sm:px-7 py-3 px-5 sm:text-base text-sm text-white placeholder-[#CED4DA] placeholder:sm:text-xl placeholder:text-base bg-[#24222F] rounded-[10px] outline-none focus:bg-[#32303f] boxShadow"
          v-model="value"
          :placeholder="$t('post.write_a_comment')"
          @click="getAllComments"
        />
      </Form>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { Field, Form } from 'vee-validate'
import { useUserStore } from '@/store/userStore'
import { onMounted, ref, watch } from 'vue'
import { computed } from '@vue/reactivity'
import { useLocaleStore } from '@/store/localeStore'
import { likeQuote, commentQuote } from '@/services/api/quote/index.js'

import HeartIcon from '@/assets/icons/HeartIcon.vue'
import CommentIcon from '@/assets/icons/CommentIcon.vue'

const props = defineProps({
  quote: {
    type: Object,
    required: true
  },
  asPost: {
    type: Boolean,
    required: false,
    default: true
  }
})

const updatedQuote = ref(props.quote)
const routeName = useRoute().name

const twoComments = computed(() =>
  updatedQuote.value.comments.length > 2
    ? updatedQuote.value.comments.slice(-2)
    : updatedQuote.value.comments
)
const comments = ref(twoComments.value)

const likes = ref(updatedQuote.value.likes)
const liked = ref(updatedQuote.value.liked)

const value = ref('')

onMounted(() => {
  window.Echo.channel('likes').listen('LikeQuote', (data) => {
    if (data.userId !== user.id) {
      if (updatedQuote.value.id === data.quoteId) {
        updatedQuote.value.likes = data.likes

        likes.value = data.likes
      }
    }
  })

  window.Echo.channel('comments').listen('CommentQuote', (data) => {
    if (data.userId !== user.id) {
      if (updatedQuote.value.id === data.quoteId) {
        updatedQuote.value.comments.push(data.comment)
        updatedQuote.value.commentsTotal++
        twoComments.value = updatedQuote.value.comments.slice(-2)
      }
    }
  })
})

const padding = computed(() => (props.asPost === true ? 'sm:p-6 px-9 py-6' : ''))
const imageHeight = computed(() => (props.asPost === true ? 'h-[200px]' : 'h-[302px]'))

const locale = ref(useLocaleStore().locale)

watch(
  () => useLocaleStore().locale,
  (newValue) => {
    locale.value = newValue
  }
)

const user = useUserStore()
const imagePrefix = import.meta.env.VITE_BACK_STORAGE_URL
const profileImage = imagePrefix + user.image

function likePost() {
  liked.value = !liked.value
  likes.value = liked.value ? likes.value + 1 : likes.value - 1

  const data = {
    liked: liked.value
  }

  likeQuote(updatedQuote.value.id, data)
}

const heartIconColor = computed(() => (liked.value === true ? '#F3426C' : 'white'))

function postComment(values) {
  const data = {
    comment: values['comment'],
    quote_id: updatedQuote.value.id,
    user_id: user.id
  }

  commentQuote(updatedQuote.value.id, data).then((res) => {
    if (res.status === 200) {
      updatedQuote.value.comments.push(res.data.comment)
      updatedQuote.value.commentsTotal++
      value.value = ''
    }
  })
}

function getAllComments() {
  comments.value = updatedQuote.value.comments
}
</script>

<style scoped>
.boxShadow {
  transition: all 0.4s;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
}
.boxShadow:focus {
  box-shadow: 0px 0px 0px 4px rgba(13, 110, 253, 0.25);
}
</style>
