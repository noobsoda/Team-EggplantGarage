import React from "react";
import styled from "styled-components";

const StyledSpan = styled.span`
  color: ${({ theme }) => theme.color.red};
`;

export default function BigButtonColor({ text }) {
  return <StyledSpan className="body2-regular">{text}</StyledSpan>;
}
