import React from "react";
import styled from "styled-components";

const StyledMenuBtn = styled.button`
  width: 24px;
  height: 24px;
  background: url("/image/menuicon.svg") no-repeat 0px 0px;
`;

export default function MenuBtn({ buttonClick }) {
  return <StyledMenuBtn onClick={buttonClick}></StyledMenuBtn>;
}
