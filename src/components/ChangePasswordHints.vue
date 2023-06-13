<template>
  <div class="w-full flex flex-col gap-1 items-start border border-[#9C9A9A] p-6">
    <p class="text-base text-white mb-3">
      {{ $t('editUserDetails.passwords_should_contain') }}
    </p>
    <div class="flex gap-[6px] items-center">
      <div
        class="rounded-full w-1 h-1 bg-[#9C9A9A]"
        :class="{
          'bg-[#198754]': moreThan
        }"
      ></div>
      <p class="text-[#9C9A9A]" :class="{ 'text-white': moreThan }">
        {{ $t('editUserDetails.or_more_characters', { characters: 8 }) }}
      </p>
    </div>
    <div class="flex gap-[6px] items-center">
      <div
        class="rounded-full w-1 h-1 bg-[#9C9A9A]"
        :class="{ 'bg-[#198754]': !bigCharacters && lessThan }"
      ></div>
      <p class="text-[#9C9A9A]" :class="{ 'text-white': !bigCharacters && lessThan }">
        {{ $t('editUserDetails.max_lowercase_characters', { characters: 15 }) }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  values: {
    type: Object,
    required: true
  }
})

const bigCharacters = ref(/[A-Z]/g.test(props.values['new_password']))
const lessThan = ref(/\w{1,15}/g.test(props.values['new_password']))
const moreThan = ref(/\w{8,}/g.test(props.values['new_password']))
watch(
  () => props.values['new_password'],
  (newValue) => {
    bigCharacters.value = /[A-Z]/g.test(newValue)
    lessThan.value = /\w{1,15}/g.test(newValue)
    moreThan.value = /\w{8,}/g.test(newValue)
  }
)
</script>
