<template>
  <div class="relative">
    <teleport to="body">
      <signup-popup />
      <login-popup />
      <expired-popup />
      <forgot-password-popup />
      <reset-password-popup />
      <email-verified-notificaiton />
    </teleport>
    <div>
      <div class="sm:sticky static top-0 bg-gradient-to-b from-[#11101A] to-[#0D0B14]">
        <the-header @show-sign-up="showPopup" @show-login="showPopup" />
        <div class="relative w-full h-[75vh]">
          <div
            class="h-full mx-auto pt-24 flex flex-col gap-6 items-center sm:max-w-[703px] max-w-[280px] w-full"
          >
            <h2 class="text-center text-[#DDCCAA] sm:text-6xl text-2xl font-bold w-full mt-8">
              {{ $t('landingPage.find_any_quote') }}
            </h2>
            <router-link :to="{ name: 'login' }"
              ><red-button @click="showPopup">{{
                $t('landingPage.get_started')
              }}</red-button></router-link
            >
          </div>
        </div>
      </div>

      <landing-movie-component
        :title="$t('landingPage.have_to_leave')"
        :name="$t('landingPage.interstellar')"
        :year="2014"
        class="sm:sticky static top-0"
      >
        <img src="@/assets/images/MovieImage.png" alt="movie-scene" />
      </landing-movie-component>

      <landing-movie-component
        :title="$t('landingPage.i_think')"
        :name="$t('landingPage.the_royal_tenenbaums')"
        :year="2014"
        class="sm:sticky static top-0"
      >
        <img src="@/assets/images/MovieImage2.png" alt="movie-scene" />
      </landing-movie-component>

      <landing-movie-component
        :title="$t('landingPage.i_think')"
        :name="$t('landingPage.the_royal_tenenbaums')"
        :year="2001"
        class="sm:sticky static top-0"
      >
        <img src="@/assets/images/MovieImage3.png" alt="movie-scene" />
      </landing-movie-component>
    </div>

    <footer class="w-full bg-gradient-to-t from-[#t181623] to-[#11101A] px-[70px] py-4">
      <span class="text-[#DDCCAA] font-medium text-xs"
        >© 2022 movie quotes. All rights reserved.</span
      >
    </footer>
  </div>
</template>

<script setup>
import router from '@/router'
import { useRoute } from 'vue-router'
import { getAuthUser } from '@/services/api/user/index.js'
import { useUserStore } from '@/store/userStore'

import RedButton from '@/components/buttons/RedButton.vue'
import SignupPopup from '@/components/popups/forms/SignupPopup.vue'
import LoginPopup from '@/components/popups/forms/LoginPopup.vue'
import ForgotPasswordPopup from '@/components/popups/forms/ForgotPasswordPopup.vue'
import ResetPasswordPopup from '@/components/popups/forms/ResetPasswordPopup.vue'
import ExpiredPopup from '@/components/popups/ExpiredPopup.vue'

import TheHeader from '@/components/TheHeader.vue'
import EmailVerifiedNotificaiton from '@/components/popups/EmailVerifiedNotificaiton.vue'
import LandingMovieComponent from '@/components/LandingMovieComponent.vue'

function showPopup() {
  window.scrollTo({
    top: 0,
    left: 0
  })

  document.body.style.overflowY = 'hidden'
}

const routeName = useRoute().name

if (routeName === 'auth-user') {
  getAuthUser().then((res) => {
    useUserStore()
      .setUserDetails(res)
      .then(() => {
        router.push({ name: 'news-feed' })
      })
  })
}
</script>
