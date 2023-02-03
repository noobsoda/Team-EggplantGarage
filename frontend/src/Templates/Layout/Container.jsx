import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  //   width: 280px;
  display: flex;
  //   flex-wrap: wrap;
  box-sizing: border-box;
  row-gap: 8px;
  column-gap: 8px;
  overflow-x: scroll;
  //   &::-webkit-scrollbar:{}
`;

export default function Container(props) {
  return <StyledContainer>{props.children}</StyledContainer>;
}
