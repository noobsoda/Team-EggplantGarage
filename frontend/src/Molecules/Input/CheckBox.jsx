import React from "react";
import styled from "styled-components";
import Check from "../../Atoms/Inputs/Check";

const StyledLabel = styled.label`
  display: inline-block;
  white-space: nowrap;

  span {
    vertical-align: middle;
  }
`;

export default function CheckBox({ id, text, check, setCheck }) {
  return (
    <div>
      <Check boxId={id} setCheck={setCheck} check={check} />

      <StyledLabel htmlFor={id}>
        <span className="body1-regular">{text}</span>
      </StyledLabel>
    </div>
  );
}
