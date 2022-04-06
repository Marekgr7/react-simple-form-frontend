import { createSlice } from "@reduxjs/toolkit";

export const eventPickerFormFields = {
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  date: "date",
};

export const initialState = {
  form: {
    firstName: {
      value: "",
      isValid: false,
      showErrorMessage: false,
    },
    lastName: {
      value: "",
      isValid: false,
      showErrorMessage: false,
    },
    email: {
      value: "",
      isValid: false,
      showErrorMessage: false,
    },
    date: {
      value: null,
      isValid: false,
      showErrorMessage: false,
    },
  },
};

export const eventPickerSlice = createSlice({
  name: "eventPicker",
  initialState,
  reducers: {
    changeFormValue: (state, action) => {
      state.form[action.payload.field].value = action.payload.value;
      state.form[action.payload.field].isValid = action.payload.isFieldValid;

      if (
        state.form[action.payload.field].showErrorMessage &&
        action.payload.isFieldValid
      ) {
        state.form[action.payload.field].showErrorMessage = false;
      }
    },
    setShowErrorMessage: (state, action) => {
      state.form[action.payload.field]["showErrorMessage"] =
        !action.payload.isValid;
    },
    resetForm: () => initialState,
  },
});

export const { changeFormValue, setShowErrorMessage, resetForm } =
  eventPickerSlice.actions;

export default eventPickerSlice.reducer;
