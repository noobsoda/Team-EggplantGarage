import React from "react";
import styled from "styled-components";

const StyledParagraph = styled.p`
  color: ${({ theme }) => theme.color.red};
`;

export default function RedParagraph({ text }) {
  return <StyledParagraph className="body2-regular">{text}</StyledParagraph>;
}
