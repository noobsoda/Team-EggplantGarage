import React from "react";
import styled from "styled-components";

const StyledLeftBtn = styled.button`
  width: 24px;
  height: 24px;
  background: url("/image/chevron-left.svg") no-repeat 0px 0px;
`;

export default function LeftBtn({ buttonClick }) {
  return <StyledLeftBtn onClick={buttonClick}></StyledLeftBtn>;
}
