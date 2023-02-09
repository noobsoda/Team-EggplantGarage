import React from "react";
import styled from "styled-components";

const StyledModalBody = styled.div`
  padding: 8px 24px 0;
  width: calc(100% - 48px);
  height: calc(70vh - 72px);
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  row-gap: 8px;
  border-radius: 16px;
  overflow-y: scroll;
`;

export default function ModalBody(props) {
  return <StyledModalBody>{props.children}</StyledModalBody>;
}
