import { defineRule, configure } from 'vee-validate'
import { required, email, min, max, confirmed, numeric, between } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
defineRule('confirmed', confirmed)
defineRule('numeric', numeric)
defineRule('between', between)

configure({
  generateMessage: localize({
    en: {
      messages: {
        required: 'Field is required',
        email: 'Field must be valid email',
        min: 'Must be greater than {params}',
        max: 'Must must be less than {params}',
        confirmed: 'This field must match password',
        numeric: 'This field must contain only numbers',
        between: 'Enter number between {params}'
      }
    },
    ka: {
      messages: {
        required: 'ველი არის სავალდებულო',
        email: 'უნდა იყოს სწორი ელ-ფოსტა',
        min: 'უნდა შედგებოდეს მინიმუმ {params} სიმბოლოსგან',
        max: 'უნდა შედგებოდეს მაქსიმუმ {params} სიმბოლოსგან',
        confirmed: 'ეს ველი უნდა ემთხვეოდეს პაროლს',
        numeric: 'ეს ველი უნდა შეიცავდეს მხოლოდ ციფრებს',
        between: 'შეიყვანეს რიცხვი {params} შორის'
      }
    }
  })
})
