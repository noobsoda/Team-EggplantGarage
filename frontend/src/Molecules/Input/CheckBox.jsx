import React from "react";
import styled from "styled-components";
import Check from "../../Atoms/Inputs/Check";

const StyledLabel = styled.label`
  display: inline-block;
  white-space: nowrap;

  span {
    vertical-align: middle;
  }
  margin: 8px -4px;
  display: flex;
  align-items: center;
  user-select: none;
`;

export default function CheckBox({ id, text, check, setCheck, textSize }) {
  return (
    <div>
      <StyledLabel htmlFor={id}>
        <Check boxId={id} setCheck={setCheck} check={check} />
        <span className={textSize}>{text}</span>
      </StyledLabel>
    </div>
  );
}
