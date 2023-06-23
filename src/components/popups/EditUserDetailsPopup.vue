<template>
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
        validation-rules="required|min:8|max:15"
        :can-show="true"
        :is-valid="checkIsValid(values, errors, 'new_password')"
      />
      <the-input
        :title="$t('inputNames.confirm_password')"
        name="confirm_password"
        type="password"
        validation-rules="required|confirmed:@new_password"
        :can-show="true"
        :is-valid="checkIsValid(values, errors, 'confirm_password')"
      />
    </div>
    <div class="w-full flex justify-between items-center px-9 mt-8">
      <div @click="closeEditPopup('password')">
        <transparent-button>{{ $t('basic.cancel') }}</transparent-button>
      </div>
      <div>
        <red-button @click="updateUser(values, errors, true)">{{
          $t('basic.save_changes')
        }}</red-button>
      </div>
    </div>
  </Form>
</template>

<script setup></script>

<style lang="scss" scoped></style>
