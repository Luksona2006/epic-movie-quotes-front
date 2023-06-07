<template>
  <div class="w-full flex flex-col items-start sm:p-6 px-9 py-6 rounded-xl bg-[#11101A]">
    <div class="w-full flex gap-4 items-center mb-4">
      <img src="" alt="" class="sm:w-[52px] sm:h-[52px] w-[40px] h-[40px] rounded-full" />
      <p class="sm:text-xl text-base text-white">{{ author }}</p>
    </div>
    <div class="w-full flex flex-col gap-7 items-start mb-6">
      <p class="sm:text-xl text-base text-white">
        “{{ quote }}”. <span class="text-[#DDCCAA]">{{ movie }}</span> ({{ date }})
      </p>
      <div class="w-full flex flex-col gap-6 items-start">
        <img :src="image" alt="movie-scene" class="w-full sm:h-[500px] h-52 rounded-[10px]" />
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-3">
            <p class="sm:text-xl text-base text-white">{{ commentsSum }}</p>
            <comment-icon class="sm:w-8 sm:h-[30px] w-6 h-[23px]" />
          </div>
          <div class="flex items-center gap-3">
            <p class="sm:text-xl text-base text-white">{{ likesSum }}</p>
            <heart-icon @click="likePost" class="sm:w-8 sm:h-[30px] w-6 h-[23px]" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col gap-6 items-start border-t border-t-[#EFEFEF4D] py-6">
      <div class="w-full flex gap-6 items-start" v-for="comment in comments" :key="comment.id">
        <img alt="profile" class="sm:w-[52px] sm:h-[52px] w-[40px] h-[40px] rounded-full" />
        <div class="w-full flex flex-col pt-[11px] pb-6 border-b border-b-[#EFEFEF4D]">
          <p class="sm:text-xl text-base font-medium text-white">{{ comment.author }}</p>
          <p class="sm:text-xl text-base text-white">{{ comment.text }}</p>
        </div>
      </div>
      <Form class="w-full flex gap-6 items-center">
        <img
          :src="image"
          alt="profile"
          class="sm:w-[52px] sm:h-[52px] w-[40px] h-[40px] rounded-full"
        />
        <Field
          name="comment"
          type="text"
          class="w-full sm:px-7 py-3 px-5 sm:text-base text-sm text-white placeholder-[#CED4DA] placeholder:sm:text-xl placeholder:text-base bg-[#24222F] rounded-[10px] outline-none focus:bg-[#32303f] boxShadow"
          :placeholder="$t('post.write_a_comment')"
        />
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Field, Form } from 'vee-validate'
import { useUserStore } from '@/store/userStore'
import { ref } from 'vue'

import HeartIcon from '@/assets/icons/HeartIcon.vue'
import CommentIcon from '@/assets/icons/CommentIcon.vue'

const props = defineProps({
  author: {
    type: String,
    required: true
  },
  quote: {
    type: String,
    required: true
  },
  movie: {
    type: String,
    required: true
  },
  date: {
    type: String || Number,
    required: true
  },
  likes: {
    type: String || Number,
    required: true
  },
  comments: {
    type: Array,
    required: true
  }
})

const user = useUserStore()

const image = import.meta.env.VITE_BACK_STORAGE_URL + '' + user.image
const likesSum = ref(props.likes)
const commentsSum = props.comments.length

function likePost() {
  likesSum.value = +likesSum.value++
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
