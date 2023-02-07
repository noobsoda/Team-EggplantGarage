import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100%;
  height: calc(100% - 140px);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  row-gap: 8px;
  column-gap: 8px;
  overflow-y: scroll;
`;

export default function ContainerHistory(props) {
  return <StyledContainer>{props.children}</StyledContainer>;
}
