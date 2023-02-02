import React from "react";
import styled from "styled-components";

const StyledBigMenuBtn = styled.button`
  width: 40px;
  height: 40px;
  background: url("/image/bigmenuicon.svg") no-repeat 0px 0px;
`;

export default function BigMenuBtn({ name, buttonClick }) {
  return (
    <StyledBigMenuBtn className="body1-header" onClick={buttonClick}>
      {name}
    </StyledBigMenuBtn>
  );
}
