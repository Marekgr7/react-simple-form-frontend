import React, { useCallback } from "react";
import InputWithLabel from "../../shared/components/InputWithLabel";
import {
  changeFormValue,
  eventPickerFormFields,
  setShowErrorMessage,
} from "../eventPickerSlice";
import { language } from "../../utils/language";
import messages from "../EventPicker.messages";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import FormSubmitButton from "../../shared/components/FormSubmitButton";
import {
  validateEventPickerFormField,
  isFormValid,
} from "./EventPickerFormValidators";
import DateAndTimePicker from "./DateAndTimePicker/DateAndTimePicker";

const Form = styled.form`
  border: 2px solid black;
  padding: 40px;
  border-radius: 8px;
`;

const EventPickerForm = ({ handleFormSubmit }) => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.eventPicker.form);

  const handleFormValueChange = useCallback(
    (field, value) => {
      const isFieldValid = validateEventPickerFormField(field, value);
      dispatch(changeFormValue({ field, value, isFieldValid }));
    },
    [dispatch]
  );

  const handleCheckIfShouldShowValidationMessage = useCallback(
    (field, isValid) => {
      dispatch(setShowErrorMessage({ field, isValid }));
    },
    [dispatch]
  );

  return (
    <Form onSubmit={handleFormSubmit}>
      <InputWithLabel
        value={form.firstName.value}
        onChangeHandler={handleFormValueChange}
        field={eventPickerFormFields.firstName}
        placeholder={messages[language].formFirstNamePlaceholder}
        label={messages[language].formFirstNameLabel}
        showErrorMessage={form.firstName.showErrorMessage}
        errorMessage={messages[language].formFirstNameValidationMessage}
        onBlurHandler={handleCheckIfShouldShowValidationMessage}
        isValid={form.firstName.isValid}
      />
      <InputWithLabel
        value={form.lastName.value}
        onChangeHandler={handleFormValueChange}
        field={eventPickerFormFields.lastName}
        placeholder={messages[language].formLastNamePlaceholder}
        label={messages[language].formLastNameLabel}
        showErrorMessage={form.lastName.showErrorMessage}
        errorMessage={messages[language].formLastNameValidationMessage}
        onBlurHandler={handleCheckIfShouldShowValidationMessage}
        isValid={form.lastName.isValid}
      />
      <InputWithLabel
        value={form.email.value}
        onChangeHandler={handleFormValueChange}
        field={eventPickerFormFields.email}
        placeholder={messages[language].formEmailPlaceholder}
        label={messages[language].formEmailLabel}
        showErrorMessage={form.email.showErrorMessage}
        errorMessage={messages[language].formEmailValidationMessage}
        onBlurHandler={handleCheckIfShouldShowValidationMessage}
        isValid={form.email.isValid}
      />
      <DateAndTimePicker />
      <FormSubmitButton
        disabled={!isFormValid(form)}
        buttonText={messages[language].formSubmitButtonText}
        handleFormSubmit={handleFormSubmit}
      />
    </Form>
  );
};

export default EventPickerForm;
