import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 80px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.red};
  color: ${({ theme }) => theme.color.white};
`;

export default function SmallStrokeButton({ name, buttonClick }) {
  return (
    <StyledButton className="body1-header" onClick={buttonClick}>
      {name}
    </StyledButton>
  );
}
