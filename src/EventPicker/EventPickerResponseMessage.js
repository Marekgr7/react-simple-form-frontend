import React from "react";
import messages from "./EventPicker.messages";
import { language } from "../utils/language";
import styled from "styled-components";

const ResponseMessage = styled.p`
  font-size: 14px;
  font-weight: 700;
`;

const EventPickerResponseMessage = ({ isError, isSuccess, isLoading }) => {
  if (isError) {
    return (
      <ResponseMessage>
        {messages[language].formSubmitErrorMessage}
      </ResponseMessage>
    );
  }

  if (isSuccess) {
    return (
      <ResponseMessage>
        {messages[language].formSubmitSuccessMessage}
      </ResponseMessage>
    );
  }

  if (isLoading) {
    return (
      <ResponseMessage>
        {messages[language].formSubmitLoadingMessage}
      </ResponseMessage>
    );
  }

  return "";
};

export default EventPickerResponseMessage;
