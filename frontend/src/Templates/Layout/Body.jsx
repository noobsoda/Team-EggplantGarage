import React from "react";
import styled from "styled-components";

const StyledBody = styled.div`
  padding: 8px 40px 8px;
  width: 280px;
  height: calc(100% - 128.8px);
  // overflow-y: auto;
  overflow: hidden;
  overflow-y: auto;
`;

export default function Body(props) {
  return <StyledBody>{props.children}</StyledBody>;
}
