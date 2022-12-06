import { reactive } from "@vue/reactivity"

const errors = reactive({})

const isEmail = (fieldName, fieldValue) => {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return !re.test(fieldValue) ? "Please enter a valid email address" : ""
}

const isEmpty = (fieldName, fieldValue) => {
  return !fieldValue ? "" + fieldName + " is required" : ""
}

export default function formValidation() {
  const validateFirstNameField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : ""
  }
  const validateSecondNameField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : ""
  }
  const validateEmailField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isEmail(fieldName, fieldValue)
  }
  const validateAddress = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : ""
  }
  const validateCity = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue): ""
  }
  const validateState = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue): ""
  }
  const validateZip = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue): ""
  }
  return { errors, validateFirstNameField, validateSecondNameField, validateEmailField, validateAddress, validateCity, validateState, validateZip }
}
