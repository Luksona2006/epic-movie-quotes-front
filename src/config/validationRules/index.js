import { defineRule } from 'vee-validate'
import i18n from '../i18n'

defineRule('required', (value, [inputName]) => {
  if (value === '') {
    return i18n.global.t('errorMessages.required', { name: inputName })
  }

  return true
})

defineRule('email', (value) => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return i18n.global.t('errorMessages.email')
  }

  return true
})

defineRule('lowercase', (value, [inputName]) => {
  if (!/^[a-z0-9._%+-]+$/.test(value)) {
    return i18n.global.t('errorMessages.lowercase', { name: inputName })
  }

  return true
})

defineRule('minMax', (value, [min, max, inputName]) => {
  if (value.length < min) {
    return i18n.global.t('errorMessages.min', { name: inputName, n: min })
  }

  if (value.length > max) {
    return i18n.global.t('errorMessages.max', { name: inputName, n: max })
  }

  return true
})

defineRule('confirmed', (value, [target]) => {
  if (value === target) {
    return true
  }

  return i18n.global.t('errorMessages.confirmed', {
    name: i18n.global.t('inputNames.thisField'),
    match:
      i18n.global.t('inputNames.the').toLowerCase() +
      `${i18n.global.t('inputNames.the') !== '' ? ' ' : ''}` +
      i18n.global.t('inputNames.password').toLowerCase()
  })
})
