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
      <the-header @show-sign-up="showPopup" @show-login="showPopup" />
      <div class="relative w-full min-h-[65vh]">
        <div
          class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 flex flex-col gap-6 items-center sm:max-w-[703px] max-w-[280px] w-full"
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
    <!-- MOVIES (extract to component) -->
    <div class="w-full">
      <!-- 1 -->
      <div
        class="backgroundFirst w-full sm:pl-[10%] sm:pr-20 sm:pb-[577px] sm:pt-[413px] pl-9 py-[139px]"
      >
        <div class="z-20 flex sm:gap-5 gap-2 items-top">
          <span class="sm:w-12 w-4 sm:h-1 h-[2px] bg-white sm:mt-5 mt-4"></span>
          <div class="flex flex-col gap-6">
            <h3 class="text-white sm:text-5xl text-xl font-bold sm:max-w-3xl max-w-xs">
              “{{ $t('landingPage.have_to_leave') }}“
            </h3>
            <span class="text-white sm:text-3xl text-base font-bold"
              >{{ $t('landingPage.interstellar') }}, 2014</span
            >
          </div>
        </div>
      </div>
      <!-- 2 -->
      <div
        class="backgroundSecond w-full sm:pl-[10%] sm:pr-20 sm:pb-[577px] sm:pt-[413px] pl-9 py-[139px]"
      >
        <div class="z-20 flex sm:gap-5 gap-2 items-top">
          <span class="sm:w-12 w-4 sm:h-1 h-[2px] bg-white sm:mt-5 mt-4"></span>
          <div class="flex flex-col gap-6">
            <h3 class="text-white sm:text-5xl text-xl font-bold sm:max-w-3xl max-w-xs">
              “{{ $t('landingPage.i_think') }}”
            </h3>
            <span class="text-white sm:text-3xl text-base font-bold"
              >{{ $t('landingPage.the_royal_tenenbaums') }}, 2014</span
            >
          </div>
        </div>
      </div>
      <!-- 3 -->
      <div
        class="backgroundThird w-full sm:pl-[10%] sm:pr-20 sm:pb-[577px] sm:pt-[413px] pl-9 py-[139px]"
      >
        <div class="z-20 flex sm:gap-5 gap-2 items-top">
          <span class="sm:w-12 w-4 sm:h-1 h-[2px] bg-white sm:mt-5 mt-4"></span>
          <div class="flex flex-col gap-6">
            <h3 class="text-white sm:text-5xl text-xl font-bold sm:max-w-3xl max-w-xs">
              “{{ $t('landingPage.i_think') }}”
            </h3>
            <span class="text-white sm:text-3xl text-base font-bold"
              >{{ $t('landingPage.the_royal_tenenbaums') }}, 2001</span
            >
          </div>
        </div>
      </div>

      <footer class="w-full bg-gradient-to-t from-[#t181623] to-[#11101A] px-[70px] py-4">
        <span class="text-[#DDCCAA] font-medium text-xs"
          >© 2022 movie quotes. All rights reserved.</span
        >
      </footer>
    </div>
  </div>
</template>

<script setup>
import RedButton from '@/components/buttons/RedButton.vue'
import SignupPopup from '@/components/form/SignupPopup.vue'
import LoginPopup from '@/components/form/LoginPopup.vue'
import ForgotPasswordPopup from '@/components/form/ForgotPasswordPopup.vue'
import ResetPasswordPopup from '@/components/form/ResetPasswordPopup.vue'
import TheHeader from '@/components/TheHeader.vue'
import EmailVerifiedNotificaiton from '@/components/form/EmailVerifiedNotificaiton.vue'

function showPopup() {
  window.scrollTo({
    top: 0,
    left: 0
  })

  document.body.style.overflowY = 'hidden'
}
</script>

<style>
.backgroundFirst {
  background-image: url('@/assets/images/MovieImage.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.backgroundSecond {
  background-image: url('@/assets/images/MovieImage2.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.backgroundThird {
  background-image: url('@/assets/images/MovieImage3.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
