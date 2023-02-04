import React from "react";
import styled from "styled-components";

const StyledModal = styled.div`
  position: absolute;
  width: 100%;
  height: 60vh;
  left: 0px;
  top: 40vh;
  border-radius: 32px 32px 0px 0px;
  z-index: 2;
  background-color: ${({ theme }) => theme.color.darkgrey};
  position: absolute;
  overflow-y: auto;
`;

export default function Modal(props) {
  return <StyledModal>{props.children}</StyledModal>;
}
