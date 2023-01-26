import React from "react";
import styled from "styled-components";
import HomeBox from "../Molecules/Boxes/HomeBox";

const StyledTapbar = styled.div`
  width: 360px;
  height: 56px;
  display: flex;
`;
export default function Tapbar() {
  return (
    <StyledTapbar>
      <HomeBox></HomeBox>
      <HomeBox></HomeBox>
      <HomeBox></HomeBox>
      <HomeBox></HomeBox>
      <HomeBox></HomeBox>
    </StyledTapbar>
  );
}
