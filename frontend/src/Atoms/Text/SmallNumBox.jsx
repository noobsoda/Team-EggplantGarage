import React from "react";
import styled from "styled-components";

const StyledBox = styled.div`
  background-color: ${({ theme }) => theme.color.red};
  color: ${({ theme }) => theme.color.white};
`;

export default function SmallNumBox({ number }) {
  return <StyledBox>{number}</StyledBox>;
}
