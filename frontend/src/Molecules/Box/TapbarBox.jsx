import React from "react";
import styled from "styled-components";

const StyledTapbarBox = styled.button`
  width: 72px;
  height: 56px;
  z-index: 1;
  background-color: white;
`;
const StyledIcon = styled.div`
  width: 24px;
  height: 24px;
  margin: 0 auto;
  background: url(${(props) => props.imgSrc}) no-repeat 0px 0px;
`;
export default function TapbarBox({ name, imgSrc, clicked }) {
  return (
    <StyledTapbarBox onClick={clicked}>
      <StyledIcon imgSrc={imgSrc} />
      <div className="tapbar">{name}</div>
    </StyledTapbarBox>
  );
}
