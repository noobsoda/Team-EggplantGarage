import React from "react";
import styled from "styled-components";

const StyledMenuBtn = styled.button`
  width: 16px;
  height: 16px;
  background: url("/image/menuicon.svg") no-repeat 0px 0px;
`;

export default function MenuButton({ buttonClick }) {
  return <StyledMenuBtn onClick={buttonClick}></StyledMenuBtn>;
}
