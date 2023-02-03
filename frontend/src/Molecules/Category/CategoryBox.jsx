import React from "react";
import styled from "styled-components";

const StyledCategoryBox = styled.button`
  width: 56px;
  height: 56px;
  margin-bottom: 24px;
  margin-right: 12px;
`;
// const StyledIcon = styled.div`
//   width: 40px;
//   height: 40px;
//   margin: 0 auto;
//   background: url(${(props) => props.imgSrc});
// `;
export default function CategoryBox({ name, imgSrc, clicked }) {
  return (
    <StyledCategoryBox onClick={clicked}>
      <img src={imgSrc} alt="" width="40px" height="40px" />
      <div className="body2-bold">{name}</div>
    </StyledCategoryBox>
  );
}
