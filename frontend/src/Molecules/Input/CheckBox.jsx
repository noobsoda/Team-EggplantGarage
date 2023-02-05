import React from "react";
import styled from "styled-components";
import Check from "../../Atoms/Inputs/Check";

const StyledLabel = styled.label`
  display: inline-block;
  white-space: nowrap;

  span {
    vertical-align: middle;
  }
  margin-left: 8px;
`;

export default function CheckBox({ id, text, check, setCheck, textSize }) {
  return (
    <div>
      <Check boxId={id} setCheck={setCheck} check={check} />

      <StyledLabel htmlFor={id}>
        <span className={textSize}>{text}</span>
      </StyledLabel>
    </div>
  );
}
