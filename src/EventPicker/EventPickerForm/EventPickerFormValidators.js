import { eventPickerFormFields } from "../eventPickerSlice";
import { isEmailValid } from "../../utils/validators";

export const validateEventPickerFormField = (field, value) => {
  switch (field) {
    case eventPickerFormFields.firstName:
      return isNameValid(value);
    case eventPickerFormFields.lastName:
      return isNameValid(value);
    case eventPickerFormFields.email:
      return isEmailValid(value);
    default:
      return false;
  }
};

const isNameValid = (name = "") => {
  return name.length > 0 && !name.includes(" ");
};

export const isFormValid = (form) => {
  return (
    form.firstName.isValid &&
    form.lastName.isValid &&
    form.email.isValid &&
    form.date.isValid
  );
};
