import React from "react";
import styled from "styled-components";

const ErrorText = styled.p`
  font-size: 14px;
  color: red;
  padding: 0;
  margin: 0;
`;

const SimpleErrorMessage = ({ showErrorMessage, errorMessage }) => {
  return <ErrorText>{showErrorMessage ? errorMessage : ""}</ErrorText>;
};

export default SimpleErrorMessage;
