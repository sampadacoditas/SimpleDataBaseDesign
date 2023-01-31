/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import { BaseSyntheticEvent, useMemo, useState } from 'react'
import { omit } from 'lodash'

const useFormValidation = () => {

  const specialCharRegex = /^[A-Za-z0-9 ]+$/;

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const sizeRegex = /^([0-9]|[1-9][0-9]|100)$/;

  const [values, setValues] = useState({});
  const [showError, setShowError] = useState<Record<string, string>>({});

  const handleFormChange = (event: BaseSyntheticEvent) => {
    const name = event.target.name;
    const val = event.target.value;
    setValues({
      ...values,
      [name]: val
    })

    switch (name) {
      case "username":
        if (val.length < 4) {
          setShowError({
            ...showError,
            username: "Username should be atleast 4 characters long"
          })
        }
        else if (!new RegExp(specialCharRegex).test(val)) {
          setShowError({
            ...showError,
            username: "Username should not have special characters"
          })
        }
        else {
          let newObj = omit(showError, "username");
          setShowError(newObj);
        }
        break;

      case "password":
        if (!new RegExp(passwordRegex).test(val)) {
          setShowError({
            ...showError,
            password: "Password should be atleast 8 characters long and should have atleast one number , one special character and one uppercase letter"
          })
        }
        else {
          let newObj = omit(showError, "password");
          setShowError(newObj);
        }
        break;

      case "email":
        if (!new RegExp(emailRegex).test(val)) {
          setShowError(
            {
              ...showError,
              email: "Enter correct email format"
            })
        }
        else {
          let newObj = omit(showError, "email");
          setShowError(newObj);
        }
        break;

      case "size":
        if (!new RegExp(sizeRegex).test(val)) {
          setShowError(
            {
              ...showError,
              size: "Size <= 255"
            })
        }
        else {
          let newObj = omit(showError, "size");
          setShowError(newObj);
        }
        break;

      default: {
        break;
      }
    }
  }

  useMemo(() => handleFormChange, [values, showError])

  const handleFormSubmit = (event: BaseSyntheticEvent) => {
    event?.preventDefault();
    if (Object.keys(values).length === 0) {
      setShowError({
        ...showError,
        username: "Username Required",
        password: "Password Required",
        email: "Email Required"
      })
    }
  }

  return {
    handleFormChange,
    showError,
    handleFormSubmit,
  }
}

export default useFormValidation