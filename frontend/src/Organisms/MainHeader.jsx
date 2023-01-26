import React from "react";
import MenuBtn from "../Atoms/IconButtons/MenuBtn";
import styled from "styled-components";
import LeftBtn from "../Atoms/IconButtons/LeftBtn";

const StyledMainHeader = styled.div`
  display: flex;
`;

export default function MainHeader() {
  return (
    <StyledMainHeader>
      <LeftBtn />
      <img width="112" height="27" src="/image/logo.png" alt="" />
      <MenuBtn />
    </StyledMainHeader>
  );
}
