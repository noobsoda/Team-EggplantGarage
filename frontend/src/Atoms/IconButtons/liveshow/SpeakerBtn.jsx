import React from "react";
import styled from "styled-components";

const StyledSpeakerBtn = styled.button`
  width: 40px;
  height: 40px;
  background: url("/image/liveshow/speaker-icon.svg") no-repeat 0px 0px;
  background-position-y: -${(props) => props.isClicked && 40}px;
`;

export default function SpeakerBtn({ buttonClick, isClicked }) {
  return (
    <StyledSpeakerBtn
      onClick={buttonClick}
      isClicked={isClicked}
    ></StyledSpeakerBtn>
  );
}
