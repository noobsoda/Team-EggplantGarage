import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100%;
  height: calc(50% - 88px);
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  row-gap: 8px;
  column-gap: 8px;
  overflow-x: scroll;
`;

export default function Container(props) {
  return <StyledContainer>{props.children}</StyledContainer>;
}
