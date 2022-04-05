import React from "react";
import DatePicker from "./DatePicker";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const DateAndTimePicker = () => {
  return (
    <Wrapper>
      <DatePicker />
    </Wrapper>
  );
};

export default DateAndTimePicker;
