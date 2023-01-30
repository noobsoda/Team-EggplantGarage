import React from "react";
import styled from "styled-components";

const StyledModalBody = styled.div`
  padding: 8px 40px 8px;
  width: 280px;
  height: 416px;
`;

export default function ModalBody(props) {
  return <StyledModalBody>{props.children}</StyledModalBody>;
}
