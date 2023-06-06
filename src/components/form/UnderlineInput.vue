<template>
  <div class="w-full flex flex-col gap-1 items-start">
    <label :for="name" class="text-base text-white">{{ title }}</label>
    <div class="w-full relative">
      <input
        :type="type"
        :name="name"
        :value="value"
        disabled
        class="w-full bg-transparent border-b border-b-[#CED4DA80] pb-4 text-lg text-white"
      />
      <transparent-button v-if="edit" class="absolute top-0 right-0" @click="editData">
        {{ $t('basic.edit') }}
      </transparent-button>
    </div>
  </div>
</template>

<script setup>
import TransparentButton from '@/components/buttons/TransparentButton.vue'

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'text'
  },
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: false,
    default: ''
  },
  title: {
    type: String,
    required: false,
    default: ''
  },
  edit: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emits = defineEmits(['editData'])

function editData() {
  emits('editData')
}
</script>
