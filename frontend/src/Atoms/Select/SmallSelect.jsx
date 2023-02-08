import React from "react";
import styled from "styled-components";

const StyledSmallSelect = styled.button`
  flex: 1;
  height: 32px;
  // border: 1.5px solid ${({ theme }) => theme.color.purple};
  background-color: ${({ theme }) => theme.color.purple};
  border-radius: 16px;
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
