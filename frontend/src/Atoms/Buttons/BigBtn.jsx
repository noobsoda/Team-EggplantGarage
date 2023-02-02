import React from "react";
import styled from "styled-components";

const StyledBigBtn = styled.button`
  width: 280px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.red};
  color: ${({ theme }) => theme.color.white};
`;

export default function BigBtn({ name, buttonClick }) {
  return (
    <StyledBigBtn className="body1-header" onClick={buttonClick}>
      {name}
    </StyledBigBtn>
  );
}
