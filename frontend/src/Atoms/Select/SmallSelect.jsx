import React from "react";
import styled from "styled-components";

const StyledSmallSelect = styled.button`
  flex: 1;
  height: 32px;
  // border: 1.5px solid ${({ theme }) => theme.color.graypurple};
  background-color: ${({ theme }) => theme.color.graypurple};
  border-radius: 12px;
  color: ${({ theme }) => theme.color.white};
`;

export default function SmallSelect({ name, buttonClick }) {
  return (
    <>
      <StyledSmallSelect className="body2-bold" onClick={buttonClick}>
        {name}
      </StyledSmallSelect>
    </>
  );
}
