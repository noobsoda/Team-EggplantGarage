import React from "react";
import styled from "styled-components";

const StyledMediumBtn = styled.button`
  width: 136px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.red};
  color: ${({ theme }) => theme.color.white};
`;

export default function MediumBtn({ name, buttonClick }) {
  return (
    <StyledMediumBtn className="body1-header" onClick={buttonClick}>
      {name}
    </StyledMediumBtn>
  );
}
