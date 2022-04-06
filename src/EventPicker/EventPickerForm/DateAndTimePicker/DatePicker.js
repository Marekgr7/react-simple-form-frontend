import React from "react";
import DatePicker from "react-datepicker";
import messages from "../../EventPicker.messages";
import SimpleInputLabel from "../../../shared/components/SimpleInputLabel";
import { language } from "../../../utils/language";
import { useSelector, useDispatch } from "react-redux";
import {
  changeFormValue,
  eventPickerFormFields,
  setShowErrorMessage,
} from "../../eventPickerSlice";
import ChosenDateInfo from "./ChosenDateInfo";
import { isDateInFuture } from "../../../utils/validators";

import "react-datepicker/dist/react-datepicker.css";

const Picker = () => {
  const eventDate = useSelector((state) => {
    return state.eventPicker.form.date;
  });

  const dispatch = useDispatch();

  const handleChooseEventDate = (date) => {
    const isChosenDateInFuture = isDateInFuture(date);

    dispatch(
      changeFormValue({
        field: eventPickerFormFields.date,
        value: date.toString(),
        isFieldValid: isChosenDateInFuture,
      })
    );

    dispatch(
      setShowErrorMessage({
        field: eventPickerFormFields.date,
        isValid: isChosenDateInFuture,
      })
    );
  };

  return (
    <>
      <SimpleInputLabel labelText={messages[language].formDateLabel} />
      <DatePicker
        selected={eventDate.value ? new Date(eventDate.value) : null}
        onChange={handleChooseEventDate}
        showTimeSelect
        placeholderText={messages[language].formDatePlaceholder}
      />
      <ChosenDateInfo />
    </>
  );
};

export default Picker;
