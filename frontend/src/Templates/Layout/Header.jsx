import React from "react";
import styled from "styled-components";
import LeftBtn from "../../Atoms/IconButtons/LeftBtn";
import MenuBtn from "../../Atoms/IconButtons/MenuBtn";
import SearchInput from "../../Atoms/Inputs/SearchInput";
import { useNavigate } from "react-router-dom";

const StyledHeader = styled.div`
  width: 344px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 8px 8px 8px;
  align-items: center;
  border-bottom: solid 0.5px;
  border-bottom-color: ${({ theme }) => theme.color.lightgrey};
`;

export default function Header({ isLogo, isSearch, isName, headerName }) {
  const navigate = useNavigate();
  function menuClicked() {
    navigate("/category");
  }
  return (
    <StyledHeader>
      <LeftBtn buttonClick={() => navigate(-1)} />
      {isSearch ? <SearchInput /> : <></>}
      {isSearch ? <div></div> : <></>}
      {isLogo ? (
        <img width="112" height="27" src="/image/logo.png" alt="" />
      ) : (
        <></>
      )}

      {isLogo ? <MenuBtn buttonClick={() => menuClicked()} /> : <></>}
      {isName ? <div className="page-header">{headerName}</div> : <></>}
      {isName ? <div></div> : <></>}
    </StyledHeader>
  );
}
