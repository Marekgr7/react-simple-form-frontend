import React from "react";
import styled from "styled-components";

const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: white;
  border-radius: 8px;
  margin-top: 10px;
`;

const FormSubmitButton = ({ buttonText, disabled }) => {
  return <SubmitButton disabled={disabled}>{buttonText}</SubmitButton>;
};

export default FormSubmitButton;
