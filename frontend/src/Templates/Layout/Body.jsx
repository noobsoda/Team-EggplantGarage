import React from "react";
import styled from "styled-components";

const StyledBody = styled.div`
  padding: 8px 24px 8px;
  width: calc(100% - 48px);
  height: calc(100% - 128.8px);
  // overflow-y: auto;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export default function Body(props) {
  return <StyledBody>{props.children}</StyledBody>;
}
