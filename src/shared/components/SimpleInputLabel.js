import styled from "styled-components";

const Text = styled.label`
  font-size: 14px;
  font-weight: 700;
`;

const Label = ({ labelText }) => {
  return <Text>{labelText}</Text>;
};

export default Label;
