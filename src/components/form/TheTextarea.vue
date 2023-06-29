<template>
  <div class="flex flex-col gap-2 items-start">
    <div
      class="w-full relative flex gap-2 items-start rounded-[4px]"
      :class="{
        'border border-[#6C757D] py-2 pl-4': label !== ''
      }"
    >
      <label :for="name" class="min-w-fit text-base font-medium text-[#6C757D]" v-if="label !== ''"
        >{{ label }}:</label
      >
      <Field :name="mutatedName" :rules="validationRules" v-slot="{ field }" v-model="inputValue">
        <textarea
          v-bind="field"
          :name="mutatedName"
          rows="3"
          class="w-full pr-20 bg-transparent outline-none sm:text-xl text-base text-white rounded-[4px]"
          :class="[
            inputStyle,
            {
              'border-[#198754]': isValid === true,
              'border-[#E31221]': isValid === false,
              'border border-[#6C757D] boxShadow py-2 pl-4': label === ''
            }
          ]"
          :placeholder="mutatedPlaceholder"
          :disabled="disabled"
        ></textarea>
      </Field>
      <p class="absolute top-3 transform right-8 sm:text-xl text-base" :class="langColor">
        {{ lang === 'ka' ? 'ქარ' : 'Eng' }}
      </p>
    </div>
    <ErrorMessage :name="mutatedName" class="text-sm text-[#DC3545] font-normal" />
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { Field, ErrorMessage } from 'vee-validate'
import { ref, watch } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
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
  },
  value: {
    type: String,
    required: false,
    default: ''
  },
  lang: {
    type: String,
    required: false,
    default: ''
  },
  langColor: {
    type: String,
    required: false,
    default: 'white'
  },
  italicStyling: {
    type: Boolean,
    required: false,
    default: true
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  },
  parentheses: {
    type: Boolean,
    required: false,
    default: false
  },
  placeholderColor: {
    type: String,
    required: false,
    default: '#6C757D'
  },
  label: {
    type: String,
    required: false,
    default: ''
  }
})

const inputValue = ref(props.value)
watch(
  () => props.value,
  (newValue) => {
    inputValue.value = newValue
  }
)

const inputStyle = computed(() =>
  props.italicStyling === true
    ? `placeholder:text-[${props.placeholderColor}] sm:placeholder:text-2xl placeholder:text-lg placeholder:italic`
    : 'placeholder:text-white sm:placeholder:text-xl placeholder:text-lg'
)

const langColor = 'text-[' + props.langColor + ']'
const mutatedName = props.name.replace(' ', '_').toLowerCase()
const mutatedPlaceholder = props.parentheses ? '“' + props.placeholder + '”' : props.placeholder
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
