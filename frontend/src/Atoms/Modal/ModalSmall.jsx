import React from "react";
import styled from "styled-components";

const StyledModal = styled.div`
  width: 100%;
  height: calc(40vh - 48px);
  padding: 24px 0;
  position: absolute;
  left: 0px;
  top: 60vh;
  border-radius: 32px 32px 0px 0px;
  z-index: 2;
  background-color: ${({ theme }) => theme.color.darkgrey};
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export default function ModalSmall(props) {
  return <StyledModal>{props.children}</StyledModal>;
}
