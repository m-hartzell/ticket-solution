import styled from "styled-components";

const baseField = `
width: 100%;
border: 1px solid #d5d5d5;
border-radius: 3px;
padding: 5px 10px;
margin: 0 0 5px;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const StyledTextInput = styled.input`
  ${baseField}
`;

const UnderlineInput = styled(StyledTextInput)`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.5rem 0;
  border: 0;
  border-bottom: 2px solid #f5f5f5;
`;

const StyledTextArea = styled.textarea`
  ${baseField}
`;

const SubmitBtn = styled.button`
  ${baseField}
`;

export {
  baseField,
  Label,
  StyledTextInput,
  UnderlineInput,
  StyledTextArea,
  SubmitBtn,
};
