import React from "react";
import styled from "styled-components";

const StyledSmallSelect = styled.button`
  width: 88px;
  height: 32px;
  border: 1.5px solid ${({ theme }) => theme.color.darkgrey};
  border-radius: 16px;
  color: ${({ theme }) => theme.color.darkgrey};
`;

export default function SmallSelect({ name, buttonClick }) {
  return (
    <StyledSmallSelect className="body2-regular" onClick={buttonClick}>
      {name}
    </StyledSmallSelect>
  );
}
