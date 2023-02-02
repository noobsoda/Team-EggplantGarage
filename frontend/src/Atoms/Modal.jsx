import React from "react";
import styled from "styled-components";

const StyledModal = styled.div`
  position: absolute;
  width: 360px;
  height: 480px;
  left: 0px;
  top: 160px;
  border-radius: 32px 32px 0px 0px;
  z-index: 2;
  background-color: ${({ theme }) => theme.color.darkgrey};
  position: absolute;
`;

export default function Modal(props) {
  return <StyledModal>{props.children}</StyledModal>;
}
