import React from "react";
import MenuBtn from "../Atoms/IconButtons/MenuBtn";
import styled from "styled-components";
import LeftBtn from "../Atoms/IconButtons/LeftBtn";

const StyledAppBar = styled.div`
  display: flex;
  height: 56px;
`;

export default function AppBar() {
  return (
    <StyledAppBar>
      <LeftBtn />
      <img width="112" height="27" src="/image/logo.png" alt="" />
      <MenuBtn />
    </StyledAppBar>
  );
}
