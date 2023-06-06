<template>
  <div class="w-full flex flex-col gap-1 items-start border border-[#9C9A9A] p-6">
    <p class="text-base text-white mb-3">
      {{ $t('editUserDetails.passwords_should_contain') }}
    </p>
    <div class="flex gap-[6px] items-center">
      <div
        class="rounded-full w-1 h-1 bg-[#9C9A9A]"
        :class="{
          'bg-[#198754]': /\w{8,}/g.test(values['new_password'])
        }"
      ></div>
      <p
        class="text-[#9C9A9A]"
        :class="{
          'text-white': /\w{8,}/g.test(values['new_password'])
        }"
      >
        {{ $t('editUserDetails.or_more_characters', { characters: 8 }) }}
      </p>
    </div>
    <div class="flex gap-[6px] items-center">
      <div
        class="rounded-full w-1 h-1 bg-[#9C9A9A]"
        :class="{
          'bg-[#198754]':
            !/[A-Z]/g.test(values['new_password']) && /\w{1,15}/g.test(values['new_password'])
        }"
      ></div>
      <p
        class="text-[#9C9A9A]"
        :class="{
          'text-white':
            !/[A-Z]/g.test(values['new_password']) && /\w{1,15}/g.test(values['new_password'])
        }"
      >
        {{ $t('editUserDetails.max_lowercase_characters', { characters: 15 }) }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  values: {
    type: Object,
    required: true
  }
})
</script>
