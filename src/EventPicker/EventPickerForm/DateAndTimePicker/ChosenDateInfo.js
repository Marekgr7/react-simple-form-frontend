import React from "react";
import styled from "styled-components";
import SimpleInputLabel from "../../../shared/components/SimpleInputLabel";
import { language } from "../../../utils/language";
import SimpleErrorValidationMessage from "../../../shared/components/SimpleErrorMessage";
import { getDayAndTimeFromDate } from "../../../utils/dateUtils";
import { useSelector } from "react-redux";

import messages from "../../EventPicker.messages";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 80px;
  justify-content: space-between;
`;

const DateText = styled.p`
  font-size: 14px;
`;

const DateInfo = ({ chosenDate, isDateValid }) => {
  const formattedDate = getDayAndTimeFromDate(chosenDate);
  return (
    <DateText>
      {!isDateValid ? messages[language].chooseDate : formattedDate}
    </DateText>
  );
};

const ChosenDateInfo = () => {
  const chosenDate = useSelector((state) => state.eventPicker.form.date);

  return (
    <Wrapper>
      <SimpleErrorValidationMessage
        errorMessage={messages[language].formDateValidationMessage}
        showErrorMessage={chosenDate.showErrorMessage}
      />
      <div>
        <SimpleInputLabel labelText={messages[language].chosenDateInfoLabel} />
        <DateInfo
          chosenDate={chosenDate.value}
          isDateValid={chosenDate.isValid}
        />
      </div>
    </Wrapper>
  );
};

export default ChosenDateInfo;
