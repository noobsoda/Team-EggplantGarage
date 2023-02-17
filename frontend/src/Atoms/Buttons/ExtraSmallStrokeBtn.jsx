import React from "react";
import styled from "styled-components";

const StyledExtraSmallButton = styled.button`
  width: 64px;
  height: 24px;
  border-radius: 8px;
  border: 2.5px solid ${({ theme }) => theme.color.red};
  border-radius: 8px;
  color: ${({ theme }) => theme.color.red};
`;

export default function ExtraSmallButton({ name, buttonClick }) {
  return (
    <StyledExtraSmallButton className="body2-bold" onClick={buttonClick}>
      {name}
    </StyledExtraSmallButton>
  );
}
