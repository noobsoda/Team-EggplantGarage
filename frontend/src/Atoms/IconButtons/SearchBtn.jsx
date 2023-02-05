import React from "react";
import styled from "styled-components";

const StyledSearchBtn = styled.button`
  width: 24px;
  height: 24px;
  background: url("/image/search-icon.svg") no-repeat 0px 0px;
`;

export default function SearchBtn({ buttonClick }) {
  return <StyledSearchBtn onClick={buttonClick}></StyledSearchBtn>;
}
