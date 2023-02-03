import React from "react";
import styled from "styled-components";

const StyledLiveStartBtn = styled.button`
  width: 40px;
  height: 40px;
  float: right;
  background: url("/image/start.svg") no-repeat 0px 0px;
`;

export default function LiveStartBtn({ buttonClick }) {
  return <StyledLiveStartBtn onClick={buttonClick}></StyledLiveStartBtn>;
}
