import React from "react";
import styled from "styled-components";

const StyledLikeBtn = styled.button`
  width: 40px;
  height: 40px;
  background: url("/image/liveshow/heart-icon.svg") no-repeat 0px 0px;
  background-position-y: -${(props) => props.isClicked && 40}px;
`;

export default function LikeBtn({ buttonClick, isClicked }) {
  return (
    <StyledLikeBtn onClick={buttonClick} isClicked={isClicked}></StyledLikeBtn>
  );
}
