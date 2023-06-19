<template>
  <div class="relative">
    <teleport to="body">
      <signup-popup />
      <login-popup />
      <forgot-password-popup />
      <reset-password-popup />
      <email-verified-notificaiton />
    </teleport>
    <div class="bg-gradient-to-b from-[#11101A] to-[#0D0B14]">
      <transition name="main">
        <div v-show="!startMovieSlide">
          <the-header @show-sign-up="showPopup" @show-login="showPopup" />

          <div class="relative w-full h-[65vh]">
            <div
              class="h-full mx-auto pt-24 flex flex-col gap-6 items-center sm:max-w-[703px] max-w-[280px] w-full"
            >
              <h2 class="text-center text-[#DDCCAA] sm:text-6xl text-2xl font-bold w-full">
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
      </transition>
      <div>
        <landing-movie-component
          :title="$t('landingPage.have_to_leave')"
          :name="$t('landingPage.interstellar')"
          :year="2014"
          :show="showFirst"
          @click="showMovie(2)"
        >
          <img src="@/assets/images/MovieImage.png" alt="movie scene" />
        </landing-movie-component>

        <landing-movie-component
          :title="$t('landingPage.i_think')"
          :name="$t('landingPage.the_royal_tenenbaums')"
          :year="2014"
          :show="showSecond"
          transitionName="movieDown"
          @click="showMovie(3)"
        >
          <img src="@/assets/images/MovieImage2.png" alt="movie scene" />
        </landing-movie-component>

        <landing-movie-component
          :title="$t('landingPage.i_think')"
          :name="$t('landingPage.the_royal_tenenbaums')"
          :year="2001"
          :show="showThird"
        >
          <img src="@/assets/images/MovieImage3.png" alt="movie scene" />
        </landing-movie-component>
        <div class="relative">
          <landing-movie-component
            :title="$t('landingPage.have_to_leave')"
            :name="$t('landingPage.interstellar')"
            :year="2014"
            :show="true"
            v-show="!startMovieSlide"
            @click="showMovie(2)"
          >
            <img src="@/assets/images/MovieImage.png" alt="movie scene" />
          </landing-movie-component>
        </div>
      </div>
    </div>

    <footer
      class="w-full bg-gradient-to-t from-[#t181623] to-[#11101A] px-[70px] py-4"
      v-show="!startMovieSlide"
    >
      <span class="text-[#DDCCAA] font-medium text-xs"
        >© 2022 movie quotes. All rights reserved.</span
      >
    </footer>
  </div>
</template>

<script setup>
import RedButton from '@/components/buttons/RedButton.vue'
import SignupPopup from '@/components/popups/forms/SignupPopup.vue'
import LoginPopup from '@/components/popups/forms/LoginPopup.vue'
import ForgotPasswordPopup from '@/components/popups/forms/ForgotPasswordPopup.vue'
import ResetPasswordPopup from '@/components/popups/forms/ResetPasswordPopup.vue'
import TheHeader from '@/components/TheHeader.vue'
import EmailVerifiedNotificaiton from '@/components/popups/EmailVerifiedNotificaiton.vue'
import LandingMovieComponent from '@/components/LandingMovieComponent.vue'
import { ref } from 'vue'

function showPopup() {
  window.scrollTo({
    top: 0,
    left: 0
  })

  document.body.style.overflowY = 'hidden'
}

const startMovieSlide = ref(false)
const showFirst = ref(false)
const showSecond = ref(false)
const showThird = ref(false)

function showMovie(movie) {
  if (movie === 2 && startMovieSlide.value) {
    showSecond.value = true
    showFirst.value = false
  }
  if (movie === 2 && !startMovieSlide.value) {
    startMovieSlide.value = true
    showFirst.value = true
  }
  if (movie === 3) {
    showThird.value = true
    showSecond.value = false
  }
}
</script>

<style>
body {
  overflow-y: hidden;
}

.main-leave-active {
  transition: 1s all;
}

.main-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.main-leave-to {
  transform: translateY(-120px);
  opacity: 0.6;
}
</style>
