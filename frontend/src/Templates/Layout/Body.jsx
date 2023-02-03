import React from "react";
import styled from "styled-components";

const StyledBody = styled.div`
  padding: 8px 40px 8px;
  width: 280px;
  height: 508px;
  border-top: solid 0.5px;
  border-top-color: ${({ theme }) => theme.color.lightgrey};
`;

export default function Body(props) {
  return <StyledBody>{props.children}</StyledBody>;
}
