<template>
  <div class="w-full flex flex-col gap-2 items-start">
    <div
      class="w-full relative flex gap-2 items-center rounded-[4px]"
      :class="{
        'border border-[#6C757D] py-2 pl-4': label !== ''
      }"
    >
      <label :for="name" class="min-w-fit text-base font-medium text-[#6C757D]" v-if="label !== ''"
        >{{ label }}:</label
      >

      <Field
        class="w-full pr-20 bg-transparent outline-none sm:text-xl text-base text-white rounded-[4px]"
        :class="[
          inputStyle,
          {
            'border-[#198754]': isValid === true,
            'border-[#E31221]': isValid === false,
            'border border-[#6C757D] boxShadow py-2 pl-4': label === ''
          }
        ]"
        :type="type"
        :name="mutatedName"
        :placeholder="placeholder"
        :rules="validationRules"
        v-model="inputValue"
      />
      <p
        class="absolute top-1/2 transform -translate-y-1/2 right-8 sm:text-xl text-base"
        :class="langColor"
        v-if="translatable"
      >
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
  translatable: {
    type: Boolean,
    required: false,
    default: true
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
    default: '#6C757D'
  },
  type: {
    type: String,
    required: false,
    default: 'text'
  },
  italicStyling: {
    type: Boolean,
    required: false,
    default: false
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
    ? 'placeholder:text-[#6C757D] sm:placeholder:text-2xl placeholder:text-lg placeholder:italic'
    : 'placeholder:text-white sm:placeholder:text-xl placeholder:text-lg'
)

const langColor = 'text-[' + props.langColor + ']'
const mutatedName = props.name.replace(' ', '_').toLowerCase()
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
