import React from "react";
import styled from "styled-components";

const StyledExitBtn = styled.button`
  width: 40px;
  height: 40px;
  background: url("/image/liveshow/exit-icon.svg") no-repeat 0px 0px;
`;

export default function ExitBtn({ buttonClick }) {
  return <StyledExitBtn onClick={buttonClick}></StyledExitBtn>;
}
