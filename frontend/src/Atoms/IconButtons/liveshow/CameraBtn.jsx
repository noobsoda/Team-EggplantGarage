import React from "react";
import styled from "styled-components";

const StyledCameraBtn = styled.button`
  width: 40px;
  height: 40px;
  margin-bottom: 16px;
  background: url("/image/liveshow/camera-icon.svg") no-repeat 0px 0px;
  /* background-position-y: -${(props) => props.isClicked && 40}px; */
`;

export default function CameraBtn({ buttonClick, isClicked }) {
  return (
    <StyledCameraBtn
      onClick={buttonClick}
      isClicked={isClicked}
    ></StyledCameraBtn>
  );
}
