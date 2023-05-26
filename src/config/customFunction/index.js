function checkIsValid(values, errors, input) {
  let isEmpty = true
  Object.entries(values).forEach((arr) => (arr[1] !== '' ? (isEmpty = false) : ''))
  if (errors[input]) {
    return false
  }

  if (isEmpty || (errors[input] === undefined && values[input] === '')) {
    return ''
  }

  if (errors[input] === undefined && values[input] !== '') {
    return true
  }

  return false
}

export { checkIsValid }
