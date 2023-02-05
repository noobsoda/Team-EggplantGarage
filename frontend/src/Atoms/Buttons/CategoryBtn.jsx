import React from "react";
import styled from "styled-components";
const StyledBox = styled.button`
  width: 88px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.red};
  color: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledInnerBox = styled.div`
  margin: 0 8px;
`;

export default function CategoryBtn({ categoryName, onClose }) {
  return (
    <StyledBox className="body2-bold">
      <StyledInnerBox>
        <span>{categoryName}</span>
        <button onClick={() => onClose(categoryName)}>X</button>
      </StyledInnerBox>
    </StyledBox>
  );
}
