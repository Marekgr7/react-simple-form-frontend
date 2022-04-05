import React, { useEffect } from "react";
import { useBookEventMutation } from "../services/api";
import { language } from "../utils/language";
import styled from "styled-components";
import messages from "./EventPicker.messages";
import EventPickerForm from "./EventPickerForm/EventPickerForm";
import EventPickerResponseMessage from "./EventPickerResponseMessage";
import { useSelector, useDispatch } from "react-redux";
import { resetForm } from "./eventPickerSlice";

const Wrapper = styled.div`
  width: 100%;
  heigth: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 28px;
`;

const EventPicker = () => {
  const [addEvent, { isError, isSuccess, isLoading, reset }] =
    useBookEventMutation();
  const formFields = useSelector((store) => store.eventPicker.form);
  const dispatch = useDispatch();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    addEvent({
      participantFirstName: formFields.firstName.value,
      participantLastName: formFields.lastName.value,
      participantEmailAddress: formFields.email.value,
      eventDate: new Date(formFields.date.value).toISOString(),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetForm());
      setTimeout(reset, [5000]);
    }
  }, [isSuccess, dispatch, reset]);

  return (
    <Wrapper>
      <Title>{messages[language].eventPickerTitle}</Title>
      <EventPickerForm handleFormSubmit={handleFormSubmit} />
      <EventPickerResponseMessage
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isLoading}
      />
    </Wrapper>
  );
};

export default EventPicker;
