import React, { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  margin: 0;
  background: url("/image/checkbox.svg") no-repeat 0px 0px;

  &:checked {
    background-position-y: -16px;
  }
`;

export default function Check({ boxId, setCheck, check }) {
  function onChange(e) {
    if (e.target.checked) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }

  return <StyledInput id={boxId} type="checkbox" checked={check} onChange={onChange} />;
}
