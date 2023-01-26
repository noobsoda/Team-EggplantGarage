import React from "react";
import styled from "styled-components";

const StyledHomeIcon = styled.div`
  width: 24px;
  height: 24px;
  background: url("/image/tapbar/home-icon.svg") no-repeat 0px 0px;
  // &:checked {
  //   background-position-y: -24px;
  // }
`;

export default function HomeIcon({ buttonClick }) {
  return <StyledHomeIcon></StyledHomeIcon>;
}
