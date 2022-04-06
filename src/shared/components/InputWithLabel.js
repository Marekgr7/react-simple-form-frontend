import React, { useCallback } from "react";
import styled from "styled-components";
import SimpleInputLabel from "./SimpleInputLabel";
import SimpleErrorMessage from "./SimpleErrorMessage";

const Wrapper = styled.div`
  width: 300px;
  height: 120px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  height: 50px;
  border-radius: 8px;
  margin-top: 5px;
`;

const InputWithLabel = ({
  value,
  onChangeHandler,
  errorMessage,
  field,
  label,
  placeholder,
  showErrorMessage,
  onBlurHandler,
  isValid,
  inputType,
}) => {
  const changeHandler = useCallback(
    (event) => {
      onChangeHandler(field, event.target.value);
    },
    [onChangeHandler, field]
  );

  const blurHandler = useCallback(() => {
    onBlurHandler(field, isValid);
  }, [onBlurHandler, isValid, field]);

  return (
    <Wrapper>
      <SimpleInputLabel labelText={label} />
      <Input
        value={value}
        onChange={changeHandler}
        placeholder={placeholder}
        onBlur={blurHandler}
        type={inputType || "text"}
      />
      <SimpleErrorMessage
        errorMessage={errorMessage}
        showErrorMessage={showErrorMessage}
      />
    </Wrapper>
  );
};

export default InputWithLabel;
