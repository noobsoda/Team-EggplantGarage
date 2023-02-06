import React from "react";
import styled from "styled-components";

const StyledMicBtn = styled.button`
  width: 40px;
  height: 40px;
  background: url("/image/liveshow/mic-icon.svg") no-repeat 0px 0px;
  background-position-y: -${(props) => props.isClicked && 40}px;
`;

export default function MicBtn({ buttonClick, isClicked }) {
  return (
    <StyledMicBtn onClick={buttonClick} isClicked={isClicked}></StyledMicBtn>
  );
}
