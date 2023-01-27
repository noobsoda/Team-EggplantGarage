import React from "react";
import styled from "styled-components";
import LeftBtn from "../Atoms/IconButtons/LeftBtn";
import MenuBtn from "../Atoms/IconButtons/MenuBtn";
import InputBox from "../Molecules/InputBox";

const StyledHeader = styled.div`
  width: 344px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 8px 8px 8px;
  align-items: center;
`;

export default function Header({ isLogo, isSearch, isName, headerName }) {
  return (
    <StyledHeader>
      <LeftBtn />
      {isSearch ? <InputBox /> : <></>}
      {isSearch ? <div></div> : <></>}
      {isLogo ? (
        <img width="112" height="27" src="/image/logo.png" alt="" />
      ) : (
        <></>
      )}
      {isLogo ? <MenuBtn></MenuBtn> : <></>}
      {isName ? <div className="page-header">{headerName}</div> : <></>}
      {isName ? <div></div> : <></>}
    </StyledHeader>
  );
}
