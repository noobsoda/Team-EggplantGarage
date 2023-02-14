import React from "react";
import styled from "styled-components";
const StyledBox = styled.div`
  flex: 0 0 auto;
  text-align: center;
  vertical-align: middle;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.lightgrey};
  color: ${({ theme }) => theme.color.darkgrey};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 4px;
  margin-bottom: 8px;
  /* margin-left: ${(props) => (props.center ? "8" : "0")}px;
  margin-right: ${(props) => (props.center ? "8" : "0")}px; */
`;

const StyledInnerBox = styled.div`
  margin: 0 4px;
  display: flex;
  justify-content: space-between;
`;

const CloseBtn = styled.button`
  margin-left: 4px;
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
        <CloseBtn onClick={() => onClose(categoryName)}/>
      </StyledInnerBox>
    </StyledBox>
  );
}
