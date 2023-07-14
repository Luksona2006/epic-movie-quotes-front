<template>
  <ask-for-confirmation-popup
    :show="showConfirmationPopup"
    @confirm="confirmChanges"
    @hide-popup="closePopup"
    :description="$t('editUserDetails.are_you_sure_to_make_changes')"
  />
  <changes-result-popup
    @hide-popup="closeNotificationPopup"
    :success="detailsUpdated"
    :show="showNotification"
  />

  <the-header />
  <the-container class="grid sm:grid-cols-4 sm:mt-8 mt-5 pb-4 sm:pb-32">
    <side-bar-component class="sm:grid hidden" />
    <div class="grid sm:col-span-2">
      <!-- MAIN FORM (DESKTOP) -->
      <Form
        @submit.prevent
        class="relative w-full sm:flex hidden flex-col mt-16"
        v-slot="{ values, errors }"
      >
        <div
          class="w-full max-w-4xl sm:bg-[#11101A] bg-[#24222F] rounded-xl sm:pt-48 pt-6 pb-32 pl-12 pr-20"
        >
          <div class="max-w-lg w-full m-auto flex flex-col gap-10">
            <upload-image-component
              @upload-file="uploadFile"
              class="absolute left-1/2 -top-8 transform -translate-y-8 -translate-x-1/2"
            />
            <the-input
              :title="$t('inputNames.username')"
              name="username"
              :value="username"
              :placeholder="username"
              :edit="true"
              :disabled="true"
              @edit-data="editUsername"
            />
            <the-input
              v-show="editUsernameData"
              :title="$t('inputNames.new_username')"
              :value="newUsername"
              name="new_username"
              validation-rules="required|min:3|max:15"
              :placeholder="$t('placeholders.enter_new_username')"
              :is-valid="errors['new_username'] === undefined"
            />
            <the-input
              :title="$t('inputNames.email')"
              type="email"
              name="email"
              :value="email"
              :placeholder="email"
              :edit="user.google_id ? false : true"
              :disabled="true"
              @edit-data="editEmail"
            />
            <the-input
              v-show="editEmailData"
              :title="$t('inputNames.new_email')"
              name="new_email"
              type="email"
              :value="newEmail"
              :placeholder="$t('placeholders.enter_new_email')"
              validation-rules="required|email"
              :is-valid="errors['new_email'] === undefined"
            />
            <div class="w-full flex flex-col gap-8">
              <the-input
                :title="$t('inputNames.password')"
                name="password"
                type="password"
                placeholder="••••••••••••"
                :edit="user.google_id ? false : true"
                :disabled="true"
                @edit-data="editPassword"
              />
              <transition name="hints">
                <change-password-hints v-show="editPasswordData" :values="values" />
              </transition>
              <the-input
                v-show="editPasswordData"
                :title="$t('inputNames.new_password')"
                name="new_password"
                type="password"
                :value="newPassword"
                :placeholder="$t('placeholders.enter_new_password')"
                validation-rules="required|min:8|max:15"
                :can-show="true"
                :is-valid="errors['new_password'] === undefined"
              />
              <the-input
                v-show="editPasswordData"
                :title="$t('inputNames.confirm_password')"
                name="confirm_password"
                type="password"
                :value="newPasswordConfirmation"
                :placeholder="$t('placeholders.repeat_new_password')"
                validation-rules="required|confirmed:@new_password"
                :can-show="true"
                :is-valid="errors['confirm_password'] === undefined"
              />
            </div>
          </div>
        </div>
        <div
          class="w-full sm:flex hidden justify-end gap-6 items-center mt-16"
          v-if="editPasswordData || editUsernameData || fileIsUploaded || editEmailData"
        >
          <div>
            <transparent-button class="bg-transparent text-[#CED4DA]">{{
              $t('basic.cancel')
            }}</transparent-button>
          </div>
          <div>
            <red-button @click="userUpdate(values, errors)">{{
              $t('basic.save_changes')
            }}</red-button>
          </div>
        </div>
      </Form>
      <!-- MAIN FORM (MOBILE) -->
      <div
        v-show="!showUsernameEditPopup && !showPasswordEditPopup && !showEmailEditPopup"
        class="w-full max-w-4xl sm:bg-[#11101A] bg-[#24222F] rounded-xl sm:pt-48 pt-6 pb-32 px-9 mt-[35px] flex flex-col gap-8 sm:hidden"
      >
        <upload-image-component />
        <underline-input
          :title="$t('inputNames.username')"
          name="username"
          :value="username"
          :edit="true"
          @edit-data="showEditPopup('username')"
        />
        <underline-input
          :title="$t('inputNames.email')"
          name="email"
          :value="email"
          :edit="user.google_id ? false : true"
          @edit-data="showEditPopup('email')"
        />
        <underline-input
          :title="$t('inputNames.password')"
          name="password"
          type="password"
          value="yourPassword"
          :edit="user.google_id ? false : true"
          @edit-data="showEditPopup('password')"
        />
      </div>
      <div class="pl-9 mb-5 cursor-pointer">
        <arrow-left-icon
          v-show="showUsernameEditPopup || showPasswordEditPopup || showEmailEditPopup"
          @click="closeEditPopups"
        />
      </div>
      <!-- EDIT USERNAME -->
      <Form
        @submit.prevent
        v-show="showUsernameEditPopup"
        v-slot="{ values, errors }"
        class="w-full max-w-4xl"
      >
        <div class="w-full bg-[#24222F] pt-20 pb-[74px] px-9 rounded-xl">
          <the-input
            :title="$t('inputNames.new_username')"
            name="new_username"
            :value="newUsername"
            validation-rules="required|min:3|max:15"
            :is-valid="checkIsValid(values, errors, 'new_username')"
          />
        </div>
        <div class="w-full flex justify-between items-center px-9 mt-8">
          <div @click="closeEditPopups">
            <transparent-button>{{ $t('basic.cancel') }}</transparent-button>
          </div>
          <div>
            <red-button @click="userUpdate(values, errors, true)">{{
              $t('basic.save_changes')
            }}</red-button>
          </div>
        </div>
      </Form>
      <!-- EDIT PASSWORD -->
      <Form
        @submit.prevent
        v-show="showPasswordEditPopup"
        v-slot="{ values, errors }"
        class="w-full max-w-4xl flex flex-col gap-8"
      >
        <div class="w-full flex flex-col gap-8 bg-[#24222F] pt-20 pb-[74px] px-9 rounded-xl">
          <the-input
            :title="$t('inputNames.new_password')"
            name="new_password"
            type="password"
            :value="newPassword"
            validation-rules="required|min:8|max:15"
            :can-show="true"
            :is-valid="checkIsValid(values, errors, 'new_password')"
          />
          <the-input
            :title="$t('inputNames.confirm_password')"
            name="confirm_password"
            type="password"
            :value="newPasswordConfirmation"
            validation-rules="required|confirmed:@new_password"
            :can-show="true"
            :is-valid="checkIsValid(values, errors, 'confirm_password')"
          />
        </div>
        <div class="w-full flex justify-between items-center px-9 mt-8">
          <div @click="closeEditPopups">
            <transparent-button>{{ $t('basic.cancel') }}</transparent-button>
          </div>
          <div>
            <red-button @click="userUpdate(values, errors, true)">{{
              $t('basic.save_changes')
            }}</red-button>
          </div>
        </div>
      </Form>
      <!-- EDIT EMAIL -->
      <Form
        @submit.prevent
        v-show="showEmailEditPopup"
        v-slot="{ values, errors }"
        class="w-full max-w-4xl"
      >
        <div class="w-full bg-[#24222F] pt-20 pb-[74px] px-9 rounded-xl">
          <the-input
            :title="$t('inputNames.new_email')"
            name="new_email"
            type="email"
            :value="newEmail"
            :placeholder="$t('placeholders.enter_new_email')"
            validation-rules="required|email"
            :is-valid="checkIsValid(values, errors, 'new_email')"
          />
        </div>
        <div class="w-full flex justify-between items-center px-9 mt-8">
          <div @click="closeEditPopups">
            <transparent-button>{{ $t('basic.cancel') }}</transparent-button>
          </div>
          <div>
            <red-button @click="userUpdate(values, errors, true)">{{
              $t('basic.save_changes')
            }}</red-button>
          </div>
        </div>
      </Form>
    </div>
  </the-container>
</template>

<script setup>
import router from '@/router'
import { Form } from 'vee-validate'
import { useUserStore } from '@/store/userStore'
import { ref, watch } from 'vue'
import { updateUser } from '@/services/api/user/index.js'
import { checkIsValid } from '@/config/customFunction/index.js'

import TheContainer from '@/components/TheContainer.vue'
import AskForConfirmationPopup from '@/components/popups/AskForConfirmationPopup.vue'
import TheHeader from '@/components/TheHeader.vue'
import SideBarComponent from '@/components/SideBarComponent.vue'
import UploadImageComponent from '@/components/form/UploadImageComponent.vue'
import TheInput from '@/components/form/TheInput.vue'
import UnderlineInput from '@/components/form/UnderlineInput.vue'
import RedButton from '@/components/buttons/RedButton.vue'
import TransparentButton from '@/components/buttons/TransparentButton.vue'
import ArrowLeftIcon from '@/assets/icons/arrows/ArrowLeftIcon.vue'
import ChangesResultPopup from '@/components/popups/ChangesResultPopup.vue'
import ChangePasswordHints from '@/components/ChangePasswordHints.vue'

document.body.style.overflowY = 'auto'

const user = useUserStore()
const username = ref(user.name)
const email = ref(user.email)

watch(
  () => useUserStore().name,
  (newValue) => {
    username.value = newValue
  }
)

const fileIsUploaded = ref(false)
const editUsernameData = ref(false)
const editPasswordData = ref(false)
const editEmailData = ref(false)

function editEmail(show) {
  editEmailData.value = show
}

function editUsername(show) {
  editUsernameData.value = show
}

function editPassword(show) {
  editPasswordData.value = show
}

function uploadFile() {
  fileIsUploaded.value = true
}

const detailsUpdated = ref(false)
const showNotification = ref(false)

const showUsernameEditPopup = ref(false)
const showPasswordEditPopup = ref(false)
const showEmailEditPopup = ref(false)

const newUsername = ref('')
const newPassword = ref('')
const newPasswordConfirmation = ref('')
const newEmail = ref('')

function showEditPopup(popup) {
  if (popup === 'username') showUsernameEditPopup.value = true
  if (popup === 'password') showPasswordEditPopup.value = true
  if (popup === 'email') showEmailEditPopup.value = true
}

function closeEditPopups() {
  showUsernameEditPopup.value = false
  showPasswordEditPopup.value = false
  showEmailEditPopup.value = false
}

function closeInputs() {
  editUsernameData.value = false
  editPasswordData.value = false
  editEmailData.value = false
}

function updateDetails(data) {
  changesConfirmed.value = false
  if (
    Object.keys(data).length === 0 ||
    Object.values(data).filter((value) => value === '').length > 0
  ) {
    detailsUpdated.value = false
    showNotification.value = true
    return
  }

  updateUser(data)
    .then((res) => {
      if (res.status === 200) {
        user.setUserDetails(res)
        detailsUpdated.value = true
        showNotification.value = true

        closeEditPopups()
        closeInputs()
      }
    })
    .catch((err) => {
      console.error(err.message)
      if (err.response.status === 401) {
        user.clearUser()
        return router.push({ name: 'home' })
      }
    })
}
const updatedData = ref({})
function userUpdate(data, errors, needsConfirmation = false) {
  updatedData.value = {}
  const dataIsEmpty = ref(false)
  if (!errors['new_username'] && data['new_username'] !== undefined) {
    updatedData.value['new_username'] = data['new_username']
  }
  if (
    !errors['new_password'] &&
    !errors['confirm_password'] &&
    data['new_password'] !== undefined &&
    data['confirm_password'] !== undefined
  ) {
    updatedData.value['new_password'] = data['new_password']
    updatedData.value['confirm_password'] = data['confirm_password']
  }

  if (!errors['new_email'] && data['new_email'] !== undefined) {
    updatedData.value['new_email'] = data['new_email']
  }

  if (localStorage.getItem('uploadedImage')) {
    updatedData.value['image'] = localStorage.getItem('uploadedImage')
  }

  if (Object.keys(updatedData.value).length === 0) {
    dataIsEmpty.value = true
  }

  if (!needsConfirmation) {
    updateDetails(updatedData.value)
  }

  if (needsConfirmation) {
    askForConfirmation()
  }
}

const showConfirmationPopup = ref(false)
const changesConfirmed = ref(false)

function closePopup() {
  changesConfirmed.value = false
  showConfirmationPopup.value = false
  showNotification.value = false
}

function closeNotificationPopup() {
  showNotification.value = false
}

function confirmChanges() {
  changesConfirmed.value = true
  detailsUpdated.value = true
  setTimeout(() => {
    showUsernameEditPopup.value = false
    showPasswordEditPopup.value = false
    showEmailEditPopup.value = false
    showConfirmationPopup.value = false
    showNotification.value = true
  }, 300)
}

function askForConfirmation() {
  showConfirmationPopup.value = true
  watch(
    () => changesConfirmed.value,
    (newValue) => {
      if (newValue === true) {
        updateDetails(updatedData.value)
      }
    }
  )
}

window.addEventListener('resize', updateWindowWidth)

function updateWindowWidth() {
  if (window.innerWidth > 640) {
    showConfirmationPopup.value = false
    showUsernameEditPopup.value = false
    showPasswordEditPopup.value = false
    showEmailEditPopup.value = false
  }
}
</script>

<style scoped>
.hints-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}
.hints-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.hints-enter-active,
.hints-leave-active {
  transition: 0.5s all;
}

.hints-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.hints-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
</style>
