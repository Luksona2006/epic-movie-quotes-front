<template>
  <div class="flex flex-col gap-2 items-start">
    <label :for="mutatedTitle" class="text-white text-base font-normal"
      >{{ title }}<span v-if="marked" class="text-[#DC3545]">*</span></label
    >
    <input
      :type="type"
      :name="mutatedTitle"
      :placeholder="placeholderUpdate"
      v-model="value"
      class="w-full px-3 py-2 border border-white rounded-[4px]"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  marked: {
    type: Boolean,
    required: false,
    default: false
  },
  type: {
    type: String,
    required: false,
    default: 'text'
  },
  placeholder: {
    type: String,
    required: false,
    default: ''
  }
})

const value = ref('')

const mutatedTitle = props.title.replace(' ', '_').toLowerCase()
const placeholderUpdate = ref(props.placeholder)
if (placeholderUpdate.value === '') {
  placeholderUpdate.value = props.title
}
</script>
