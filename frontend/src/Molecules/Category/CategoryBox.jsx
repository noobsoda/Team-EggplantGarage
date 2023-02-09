import React from "react";
import styled from "styled-components";

const StyledCategoryBox = styled.button`
  width: 60px;
  height: 75px;
`;
export default function CategoryBox({ name, imgSrc, clicked }) {
  return (
    <StyledCategoryBox onClick={clicked}>
      <img src={imgSrc} alt="" width="100%" height="calc(100% - 15px)" />
      <div className="body2-bold">{name}</div>
    </StyledCategoryBox>
  );
}
