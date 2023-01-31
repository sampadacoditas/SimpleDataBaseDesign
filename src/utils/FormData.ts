import { BaseSyntheticEvent } from "react"

type ILoginForm = {
  [key: string]: FormDataEntryValue
}
export const getFormData = async (event: BaseSyntheticEvent) => {
  const responseBody: ILoginForm = {}
  const formData = new FormData(event.currentTarget as HTMLFormElement)
  formData.forEach((value, property: string) => responseBody[property] = value);
  return responseBody
}