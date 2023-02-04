import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  row-gap: 8px;
  column-gap: 8px;
`;

export default function ContainerSearch(props) {
  return <StyledContainer>{props.children}</StyledContainer>;
}
