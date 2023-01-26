import React from "react";
import styled from "styled-components";

const BigMenuIcon = styled.div`
  width: 40px;
  height: 40px;
  //   background: url("/image/checkbox.svg") no-repeat 0px 0px;
`;

export default function BigMenuIcon({ name, buttonClick }) {
  return (
    <BigMenuIcon className="body1-header" onClick={buttonClick}>
      {name}
    </BigMenuIcon>
  );
}
