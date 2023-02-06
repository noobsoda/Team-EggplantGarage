import React from "react";
import styled from "styled-components";

const StyledBigMenuBtn = styled.button`
  width: 40px;
  height: 40px;
  background: url("/image/liveshow/bigmenu-icon.svg") no-repeat 0px 0px;
`;

export default function BigMenuBtn({ buttonClick }) {
  return <StyledBigMenuBtn onClick={buttonClick}></StyledBigMenuBtn>;
}
