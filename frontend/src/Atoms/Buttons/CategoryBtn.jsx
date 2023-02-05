import React from "react";
import styled from "styled-components";
const StyledBox = styled.div`
  width: 88px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.red};
  color: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-bottom: 8px;
  margin-left: ${(props) => (props.center ? "8" : "0")}px;
  margin-right: ${(props) => (props.center ? "8" : "0")}px;
`;

const StyledInnerBox = styled.div`
  margin: 0 8px;
  display: flex;
  justify-content: space-between;
`;

const CloseBtn = styled.button`
  width: 16px;
  height: 16px;
  background: url("/image/close.svg") no-repeat 0px 0px;
  background-size: 16px;
`;

export default function CategoryBtn({ center, categoryName, onClose }) {
  return (
    <StyledBox className="body2-bold" center={center}>
      <StyledInnerBox>
        <span>{categoryName}</span>
        <CloseBtn onClick={() => onClose(categoryName)} />
      </StyledInnerBox>
    </StyledBox>
  );
}
