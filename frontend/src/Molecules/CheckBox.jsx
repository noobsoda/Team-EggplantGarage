import React from "react";
import styled from "styled-components";
import Check from "../Atoms/Inputs/CheckBox";

const StyledLabel = styled.label`
  display: inline-block;
  white-space: nowrap;

  span {
    vertical-align: middle;
  }
`;

export default function CheckBox({ id, text }) {
  return (
    <div>
      <Check boxId={id} />

      <StyledLabel htmlFor={id}>
        <span className="body1-regular">{text}</span>
      </StyledLabel>
    </div>
  );
}
