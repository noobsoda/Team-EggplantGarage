import React from "react";
import styled from "styled-components";

const MenuIcon = styled.div`
  width: 40px;
  height: 40px;
  //   background: url("/image/checkbox.svg") no-repeat 0px 0px;
`;

export default function MenuIcon({ name, buttonClick }) {
  return (
    <MenuIcon className="body1-header" onClick={buttonClick}>
      {name}
    </MenuIcon>
  );
}
