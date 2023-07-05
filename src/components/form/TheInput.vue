<template>
  <transition name="input">
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
            v-model="inputValue"
            :rules="validationRules"
            class="w-full py-2 border-2 rounded-[4px] outline-none focus:bg-[#CED4DA] boxShadow"
            :class="{
              'border-[#198754]': isValid === true && showValidation,
              'border-[#E31221]': isValid === false && showValidation,
              'bg-[#E9ECEF] text-[#73777A]': isDisabled,
              'pl-3 pr-10': canShow || isValid !== '',
              'pl-3 pr-16': canShow && isValid !== '',
              'px-3': !canShow
            }"
            :disabled="isDisabled"
          />

          <div
            class="absolute top-1/2 right-2 transform -translate-y-1/2 -translate-x-2 flex gap-1 items-center"
          >
            <eye-icon @isHidden="changeType" v-if="canShow" />
            <check-mark-icon v-if="isValid === true && showValidation" />
            <exclamation-mark-icon v-if="isValid === false && showValidation" />
          </div>
          <button
            v-show="edit === true && !editDetail"
            @click="editData"
            class="absolute top-1/2 transform -translate-y-1/2 text-[#CED4DA] bg-transparent"
            :class="textPosition"
          >
            {{ $t('basic.edit') }}
          </button>
          <button
            v-show="edit === true && editDetail"
            @click="editData"
            class="absolute top-1/2 transform -translate-y-1/2 text-[#CED4DA] bg-transparent"
            :class="textPosition"
          >
            {{ $t('basic.cancel') }}
          </button>
        </div>
        <ErrorMessage
          v-if="showValidation"
          :name="mutatedName"
          class="text-sm text-[#DC3545] font-normal"
        />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ErrorMessage, Field } from 'vee-validate'
import { ref, watch } from 'vue'
import { computed } from '@vue/reactivity'
import { useLocaleStore } from '@/store/localeStore'

import EyeIcon from '@/assets/icons/EyeIcon.vue'
import CheckMarkIcon from '@/assets/icons/marks/CheckMarkIcon.vue'
import ExclamationMarkIcon from '@/assets/icons/marks/ExclamationMarkIcon.vue'

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
  canShow: {
    type: Boolean || String,
    required: false,
    default: false
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
  edit: {
    type: String || Boolean,
    required: false,
    default: ''
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  },
  showValidation: {
    type: Boolean,
    required: false,
    default: true
  },
  storeData: {
    type: String,
    required: false,
    default: ''
  }
})

const emits = defineEmits(['editData'])
const mutatedName = props.name.replace(' ', '_').toLowerCase()
const inputType = ref(props.type)

const inputValue = ref(props.value)

function changeType() {
  inputType.value =
    inputType.value === 'password' && props.type === 'password' ? 'text' : 'password'
}

const editDetail = ref(false)

const isDisabled = computed(() => props.disabled)

function editData() {
  editDetail.value = !editDetail.value
  if (editDetail.value === false) inputValue.value = ''
  emits('editData', editDetail.value)
}

const locale = useLocaleStore().locale
const textPosition = ref(locale === 'ka' ? '-right-10 translate-x-10' : '-right-7 translate-x-7')
watch(
  () => useLocaleStore().locale,
  (newValue) => {
    textPosition.value = newValue === 'ka' ? '-right-10 translate-x-10' : '-right-7 translate-x-7'
  }
)
</script>

<style scoped>
.boxShadow {
  transition: all 0.4s;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
}
.boxShadow:focus {
  box-shadow: 0px 0px 0px 4px rgba(13, 110, 253, 0.25);
}

.input-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}

.input-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.input-enter-active,
.input-leave-active {
  transition: 0.5s all;
}

.input-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.input-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
</style>
