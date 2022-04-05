import React from "react";
import styled from "styled-components";

const ErrorText = styled.div`
  font-size: 14px;
  color: red;
`;

const SimpleErrorMessage = ({ showErrorMessage, errorMessage }) => {
  return <ErrorText>{showErrorMessage ? errorMessage : ""}</ErrorText>;
};

export default SimpleErrorMessage;
