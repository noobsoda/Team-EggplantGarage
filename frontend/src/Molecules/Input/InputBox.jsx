import React from "react";
import styled from "styled-components";
import BigInput from "../../Atoms/Inputs/BigInput";
import RedParagraph from "../../Atoms/Text/RedParagraph";

const StyledBox = styled.div`
  height: 48px;
`;
export default function InputBox({
  placehold,
  text,
  isCheck,
  onChange,
  type,
  value,
  disabled,
}) {
  return (
    <StyledBox>
      <BigInput
        type={type}
        placehold={placehold}
        inputValue={onChange}
        value={value}
        disabled={disabled}
      />
      {isCheck ? <></> : <RedParagraph text={text} />}
    </StyledBox>
  );
}
