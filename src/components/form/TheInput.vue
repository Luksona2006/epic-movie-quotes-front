<template>
  <div class="flex flex-col gap-2 items-start">
    <label :for="mutatedName" class="text-white text-base font-normal"
      >{{ title }}<span v-if="marked" class="text-[#DC3545]">*</span></label
    >
    <div class="w-full flex flex-col gap-[2px]">
      <div class="relative w-full">
        <Field
          :type="inputType"
          :name="mutatedName"
          :placeholder="placeholder"
          v-model="value"
          :rules="validationRules"
          class="w-full px-3 py-2 border-2 border-[#FFFFF] rounded-[4px] outline-none focus:bg-[#CED4DA] boxShadow"
          :class="{ 'border-[#198754]': isValid === true, 'border-[#E31221]': isValid === false }"
        />
        <eye-icon
          class="absolute top-1/2 right-2 transform -translate-y-1/2 -translate-x-2"
          @isHidden="changeType"
          v-if="props.type === 'password' && isValid === ''"
        />
        <valid-icon
          class="absolute top-1/2 right-2 transform -translate-y-1/2 -translate-x-2"
          v-if="isValid === true"
        />
        <invalid-icon
          class="absolute top-1/2 right-2 transform -translate-y-1/2 -translate-x-2"
          v-if="isValid === false"
        />
      </div>
      <ErrorMessage :name="mutatedName" class="text-sm text-[#DC3545] font-normal" />
    </div>
  </div>
</template>

<script setup>
import { ErrorMessage, Field } from 'vee-validate'
import { ref } from 'vue'

import EyeIcon from '@/assets/icons/EyeIcon.vue'
import ValidIcon from '@/assets/icons/ValidIcon.vue'
import InvalidIcon from '@/assets/icons/InvalidIcon.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  name: {
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
  },
  validationRules: {
    type: String,
    required: false,
    default: ''
  },
  isValid: {
    type: String || Boolean,
    required: false,
    default: ''
  }
})

const value = ref('')
const mutatedName = props.name.replace(' ', '_').toLowerCase()

const inputType = ref(props.type)
function changeType() {
  inputType.value = inputType.value === 'password' ? 'text' : 'password'
}
</script>

<style scoped>
.boxShadow {
  transition: all 0.4s;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
}
.boxShadow:focus {
  box-shadow: 0px 0px 0px 4px rgba(13, 110, 253, 0.25);
}
</style>
