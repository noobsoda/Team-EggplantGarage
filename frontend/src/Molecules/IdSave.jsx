import React from "react";
import styled from "styled-components";
import CheckBox from "../Atoms/Inputs/CheckBox";

const StyledLabel = styled.label`
  display: inline-block;
  white-space: nowrap;

  span {
    vertical-align: middle;
  }
`;

export default function IdSave() {
  return (
    <div>
      <CheckBox boxId="id-save" type="checkbox" />

      <StyledLabel htmlFor="id-save">
        <span className="body2-regular">아이디 저장</span>
      </StyledLabel>
    </div>
  );
}
