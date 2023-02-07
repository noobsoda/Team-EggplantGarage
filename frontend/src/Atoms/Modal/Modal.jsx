import React from "react";
import styled from "styled-components";

const StyledModal = styled.div`
  position: absolute;
  width: 360px;
  height: 80vh;
  left: 0px;
  top: 20vh;
  border-radius: 32px 32px 0px 0px;
  z-index: 2;
  background-color: ${({ theme }) => theme.color.darkgrey};
  position: absolute;
  overflow-y: auto;
`;

export default function Modal(props) {
  return <StyledModal>{props.children}</StyledModal>;
}
