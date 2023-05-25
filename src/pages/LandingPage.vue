<template>
  <div class="relative">
    <teleport to="body">
      <transition name="blur">
        <div
          @click="closePopup"
          v-show="showSignUp || showLogin"
          class="w-full h-screen backdrop-blur-[3px] bg-[#0000008A] absolute left-0 top-0 z-40"
        ></div>
      </transition>
      <transition name="signup">
        <signup-popup v-show="showSignUp" @hidePopup="closePopup('signup')" />
      </transition>
      <transition name="login">
        <login-popup v-show="showLogin" @hidePopup="closePopup('login')" />
      </transition>
    </teleport>
    <div class="bg-gradient-to-t from-[#11101A] to-black">
      <header class="w-full sm:px-[70px] sm:py-8 px-4 py-7 flex justify-between items-center">
        <h1 class="text-[#DDCCAA] text-base">MOVIE QUOTES</h1>
        <div class="flex gap-4 items-center">
          <language-switcher />
          <router-link to="signup">
            <red-button @click="showPopup('signup')">{{ $t('landingPage.signup') }} </red-button>
          </router-link>
          <router-link to="login">
            <transparent-button @click="showPopup('login')">
              {{ $t('landingPage.login') }}
            </transparent-button>
          </router-link>
        </div>
      </header>
      <div class="relative w-full min-h-[65vh]">
        <div
          class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 flex flex-col gap-6 items-center sm:max-w-[703px] max-w-[280px] w-full"
        >
          <h2 class="text-center text-[#DDCCAA] sm:text-6xl text-2xl font-bold w-full">
            {{ $t('landingPage.find_any_quote') }}
          </h2>
          <router-link to="login"
            ><red-button @click="showPopup('login')">{{
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
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import RedButton from '@/components/RedButton.vue'
import TransparentButton from '@/components/TransparentButton.vue'
import SignupPopup from '@/components/form/SignupPopup.vue'
import LoginPopup from '@/components/form/LoginPopup.vue'
import languageSwitcher from '../components/languageSwitcher.vue'

const showSignUp = ref(false)
const showLogin = ref(false)

const router = useRouter()
const route = useRoute()
if (route.name === 'signup') showSignUp.value = true
if (route.name === 'login') showLogin.value = true
if (route.name !== 'home') document.body.style.overflowY = 'hidden'
function showPopup(popup) {
  window.scrollTo({
    top: 0,
    left: 0
  })
  if (popup === 'signup') showSignUp.value = true
  if (popup === 'login') showLogin.value = true
  document.body.style.overflowY = 'hidden'
}

function closePopup(popup) {
  if (popup === 'login') showLogin.value = false
  if (popup === 'signup') showSignUp.value = false
  else {
    showSignUp.value = false
    showLogin.value = false
  }
  document.body.style.overflowY = 'auto'
  router.push({ name: 'home' })
}
</script>

<style>
body {
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0d0b14 98.75%);
}
.login-enter-active,
.login-leave-active,
.signup-enter-active,
.signup-leave-active,
.blur-enter-active,
.blur-leave-active {
  transition: 0.4s all;
}
.login-enter-from,
.login-leave-to,
.signup-enter-from,
.signup-leave-to {
  opacity: 0;
  transform: translate(-50%, -150%);
}

.login-enter-to,
.login-leave-from,
.signup-enter-to,
.signup-leave-from {
  opacity: 1;
  transform: translateY(-50%, -50%);
}

.blur-enter-from,
.blur-leave-to {
  opacity: 0;
}

.blur-enter-to,
.blur-leave-from {
  opacity: 1;
}

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
