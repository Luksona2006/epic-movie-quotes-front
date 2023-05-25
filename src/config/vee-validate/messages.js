import { defineRule, configure } from 'vee-validate'
import { required, email, min, max, confirmed } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)

configure({
  generateMessage: localize({
    en: {
      messages: {
        required: 'Field is required',
        email: 'Field must be valid email',
        min: 'Must be greater than {params}',
        max: 'Must must be less than {params}',
        confirmed: 'This field must match password'
      }
    },
    ka: {
      messages: {
        required: 'ველი არის სავალდებულო',
        email: 'უნდა იყოს სწორი ელ-ფოსტა',
        min: 'უნდა შედგებოდეს მინიმუმ {params} სიმბოლოსგან',
        max: 'უნდა შედგებოდეს მაქსიმუმ {params} სიმბოლოსგან',
        confirmed: 'ეს ველი უნდა ემთხვეოდეს პაროლს'
      }
    }
  })
})
