import React from "react";
import styled from "styled-components";

const StyledExtraSmallButton = styled.button`
  width: 64px;
  height: 24px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.graypurple};
  color: ${({ theme }) => theme.color.white};
`;

export default function ExtraSmallButton({ name, buttonClick }) {
  return (
    <StyledExtraSmallButton className="body2-bold" onClick={buttonClick}>
      {name}
    </StyledExtraSmallButton>
  );
}
