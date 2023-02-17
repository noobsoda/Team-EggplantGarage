import React from "react";
import styled from "styled-components";

const StyledFlipBtn = styled.button`
  width: 40px;
  height: 40px;
  background: url("/image/liveshow/flip-icon.svg") no-repeat 0px 0px;
  background-position-y: -${(props) => props.isClicked && 40}px;
`;

export default function FlipBtn({ buttonClick, isClicked }) {
  return (
    <StyledFlipBtn onClick={buttonClick} isClicked={isClicked}></StyledFlipBtn>
  );
}
